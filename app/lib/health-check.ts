import { WatsonXAI } from '@ibm-cloud/watsonx-ai';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';
import { ServiceHealth } from '../types';

const TIMEOUT_MS = 5000; // 5 second timeout for each check
const DEGRADED_THRESHOLD_MS = 2000; // Response times over 2s are considered degraded

/**
 * Generic timeout wrapper for async operations
 */
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(errorMessage)), timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

/**
 * Test WatsonX AI connection with a minimal prompt
 * Falls back to Groq if configured as primary provider
 */
export async function checkWatsonXHealth(): Promise<ServiceHealth> {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  
  try {
    const provider = (process.env.AI_PROVIDER as string) || 'watsonx';
    
    // Test based on configured provider
    if (provider === 'watsonx') {
      return await checkWatsonXDirect(startTime, timestamp);
    } else {
      return await checkGroqDirect(startTime, timestamp);
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      message: 'AI service unavailable',
      timestamp,
      details: { error: errorMessage }
    };
  }
}

/**
 * Direct WatsonX API health check
 */
async function checkWatsonXDirect(startTime: number, timestamp: string): Promise<ServiceHealth> {
  // Validate credentials
  if (!process.env.WATSONX_AI_APIKEY || !process.env.WATSONX_AI_SERVICE_URL) {
    return {
      status: 'down',
      responseTime: 0,
      message: 'WatsonX credentials not configured',
      timestamp,
      details: { 
        error: 'Missing WATSONX_AI_APIKEY or WATSONX_AI_SERVICE_URL',
        provider: 'watsonx'
      }
    };
  }

  if (!process.env.WATSONX_AI_PROJECT_ID) {
    return {
      status: 'down',
      responseTime: 0,
      message: 'WatsonX project ID not configured',
      timestamp,
      details: { 
        error: 'Missing WATSONX_AI_PROJECT_ID',
        provider: 'watsonx'
      }
    };
  }

  try {
    const healthCheckPromise = (async () => {
      const client = WatsonXAI.newInstance({
        version: '2024-05-31',
        authenticator: new IamAuthenticator({
          apikey: process.env.WATSONX_AI_APIKEY!,
        }),
        serviceUrl: process.env.WATSONX_AI_SERVICE_URL!,
      });

      const response = await client.textChat({
        modelId: 'ibm/granite-3-8b-instruct',
        projectId: process.env.WATSONX_AI_PROJECT_ID!,
        messages: [
          { role: 'user', content: 'ping' },
        ],
        maxTokens: 10,
        temperature: 0,
      });

      if (!response.result.choices || response.result.choices.length === 0) {
        throw new Error('WatsonX returned empty response');
      }

      return response;
    })();

    await withTimeout(healthCheckPromise, TIMEOUT_MS, 'Health check timeout');
    
    const responseTime = Date.now() - startTime;
    const status = responseTime > DEGRADED_THRESHOLD_MS ? 'degraded' : 'healthy';
    
    return {
      status,
      responseTime,
      message: status === 'healthy' ? 'WatsonX AI operational' : 'WatsonX AI responding slowly',
      timestamp,
      details: {
        provider: 'watsonx',
        model: 'ibm/granite-3-8b-instruct'
      }
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      message: 'WatsonX AI health check failed',
      timestamp,
      details: {
        provider: 'watsonx',
        error: errorMessage
      }
    };
  }
}

/**
 * Direct Groq API health check
 */
async function checkGroqDirect(startTime: number, timestamp: string): Promise<ServiceHealth> {
  if (!process.env.GROQ_API_KEY) {
    return {
      status: 'down',
      responseTime: 0,
      message: 'Groq API key not configured',
      timestamp,
      details: { 
        error: 'Missing GROQ_API_KEY',
        provider: 'groq'
      }
    };
  }

  try {
    const healthCheckPromise = fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'granite-3.1-8b-instruct',
        messages: [
          { role: 'user', content: 'ping' },
        ],
        temperature: 0,
        max_tokens: 10,
      }),
    });

    const response = await withTimeout(healthCheckPromise, TIMEOUT_MS, 'Health check timeout');
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('Groq returned empty response');
    }

    const responseTime = Date.now() - startTime;
    const status = responseTime > DEGRADED_THRESHOLD_MS ? 'degraded' : 'healthy';
    
    return {
      status,
      responseTime,
      message: status === 'healthy' ? 'Groq AI operational' : 'Groq AI responding slowly',
      timestamp,
      details: {
        provider: 'groq',
        model: 'granite-3.1-8b-instruct'
      }
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      message: 'Groq AI health check failed',
      timestamp,
      details: {
        provider: 'groq',
        error: errorMessage
      }
    };
  }
}

/**
 * Test GitHub API connection by fetching rate limit status
 */
export async function checkGitHubHealth(): Promise<ServiceHealth> {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'AgentIQ-Health-Check'
    };
    
    // Add auth token if available
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== 'optional_for_public_repos') {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const healthCheckPromise = fetch('https://api.github.com/rate_limit', {
      headers,
    });

    const response = await withTimeout(healthCheckPromise, TIMEOUT_MS, 'Health check timeout');
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const responseTime = Date.now() - startTime;
    
    // Extract rate limit info
    const coreRateLimit = data.resources?.core || data.rate;
    const remaining = coreRateLimit?.remaining || 0;
    const limit = coreRateLimit?.limit || 60;
    const resetTimestamp = coreRateLimit?.reset ? new Date(coreRateLimit.reset * 1000).toISOString() : '';
    
    // Determine status based on response time and rate limit
    let status: 'healthy' | 'degraded' | 'down' = 'healthy';
    let message = 'GitHub API operational';
    
    if (responseTime > DEGRADED_THRESHOLD_MS) {
      status = 'degraded';
      message = 'GitHub API responding slowly';
    }
    
    if (remaining < limit * 0.1) {
      status = 'degraded';
      message = 'GitHub API rate limit nearly exhausted';
    }
    
    return {
      status,
      responseTime,
      message,
      timestamp,
      details: {
        rateLimit: {
          remaining,
          limit,
          reset: resetTimestamp
        }
      }
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      message: 'GitHub API health check failed',
      timestamp,
      details: {
        error: errorMessage
      }
    };
  }
}
