import { WatsonXAI } from '@ibm-cloud/watsonx-ai';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';

type AIProvider = 'watsonx' | 'groq';

function getProvider(): AIProvider {
  return (process.env.AI_PROVIDER as AIProvider) || 'watsonx';
}

let watsonxClient: WatsonXAI | null = null;

function getWatsonxClient(): WatsonXAI {
  if (!watsonxClient) {
    if (!process.env.WATSONX_AI_APIKEY || !process.env.WATSONX_AI_SERVICE_URL) {
      throw new Error('watsonx credentials missing in environment.');
    }
    watsonxClient = WatsonXAI.newInstance({
      version: '2024-05-31',
      authenticator: new IamAuthenticator({
        apikey: process.env.WATSONX_AI_APIKEY,
      }),
      serviceUrl: process.env.WATSONX_AI_SERVICE_URL,
    });
  }
  return watsonxClient;
}

// === WATSONX PROVIDER ===
async function chatWatsonx(systemPrompt: string, userMessage: string): Promise<string> {
  const wxai = getWatsonxClient();
  const response = await wxai.textChat({
    modelId: 'ibm/granite-3-8b-instruct',
    projectId: process.env.WATSONX_AI_PROJECT_ID!,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    maxTokens: 4096,
    temperature: 0.3,
  });
  
  if (!response.result.choices || response.result.choices.length === 0) {
    throw new Error('watsonx returned empty response choices.');
  }
  
  return response.result.choices[0].message?.content || '';
}

// === GROQ PROVIDER (OpenAI-compatible) ===
async function chatGroq(systemPrompt: string, userMessage: string): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('Groq API Key missing in environment.');
  }

  // Let's call Groq. We check if granite-3.1-8b-instruct is available, otherwise use a fallback.
  // Actually, we'll try granite-3.1-8b-instruct, and fallback if that fails.
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'granite-3.1-8b-instruct', 
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Groq API error:', errorText);
    
    // Attempt fallback to llama3-8b if granite is not available on this API key or endpoint
    const fallbackResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', 
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }),
    });
    
    if (!fallbackResponse.ok) {
      throw new Error(`Groq query failed: ${errorText}`);
    }
    
    const fallbackData = await fallbackResponse.json();
    return fallbackData.choices[0].message.content || '';
  }

  const data = await response.json();
  return data.choices[0].message.content || '';
}

// === UNIFIED INTERFACE ===
export async function chat(systemPrompt: string, userMessage: string): Promise<string> {
  const provider = getProvider();
  try {
    if (provider === 'watsonx') {
      console.log('Using watsonx AI Provider...');
      return await chatWatsonx(systemPrompt, userMessage);
    } else {
      console.log('Using Groq AI Provider...');
      return await chatGroq(systemPrompt, userMessage);
    }
  } catch (error) {
    console.warn(`${provider} failed. Attempting auto-fallback...`, error);
    try {
      if (provider === 'watsonx') {
        return await chatGroq(systemPrompt, userMessage);
      } else {
        return await chatWatsonx(systemPrompt, userMessage);
      }
    } catch (fallbackError) {
      console.error('Fallback also failed. Returning mock/error structure.', fallbackError);
      throw new Error(`AI processing failed on both primary and fallback providers.`);
    }
  }
}
