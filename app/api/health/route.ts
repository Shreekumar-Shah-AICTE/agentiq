import { NextRequest, NextResponse } from 'next/server';
import { checkWatsonXHealth, checkGitHubHealth } from '../../lib/health-check';
import { HealthCheckResponse } from '../../types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Health Check API Endpoint
 * Tests connectivity and performance of critical services
 * 
 * @returns JSON response with health status of all services
 */
export async function GET(req: NextRequest) {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  try {
    // Run health checks in parallel for faster response
    const [watsonxResult, githubResult] = await Promise.allSettled([
      checkWatsonXHealth(),
      checkGitHubHealth(),
    ]);

    // Extract service health from settled promises
    const watsonxHealth = watsonxResult.status === 'fulfilled' 
      ? watsonxResult.value 
      : {
          status: 'down' as const,
          responseTime: 0,
          message: 'Health check failed to execute',
          timestamp,
          details: { 
            error: watsonxResult.reason?.message || 'Unknown error' 
          }
        };

    const githubHealth = githubResult.status === 'fulfilled'
      ? githubResult.value
      : {
          status: 'down' as const,
          responseTime: 0,
          message: 'Health check failed to execute',
          timestamp,
          details: { 
            error: githubResult.reason?.message || 'Unknown error' 
          }
        };

    // Determine overall health status
    const overallStatus = determineOverallStatus(watsonxHealth.status, githubHealth.status);

    // Build response
    const response: HealthCheckResponse = {
      overall: overallStatus,
      services: {
        watsonx: watsonxHealth,
        github: githubHealth,
      },
      timestamp,
      version: '1.0.0',
      uptime: Math.floor(process.uptime()),
    };

    // Determine HTTP status code
    const httpStatus = overallStatus === 'down' ? 503 : 200;

    // Log health check results
    console.log(`[Health Check] Overall: ${overallStatus}, WatsonX: ${watsonxHealth.status}, GitHub: ${githubHealth.status}, Duration: ${Date.now() - startTime}ms`);

    return NextResponse.json(response, { 
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });

  } catch (error: unknown) {
    // Catastrophic failure - should never happen due to Promise.allSettled
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Health Check] Catastrophic failure:', errorMessage);

    const fallbackResponse: HealthCheckResponse = {
      overall: 'down',
      services: {
        watsonx: {
          status: 'down',
          responseTime: 0,
          message: 'Health check system failure',
          timestamp,
          details: { error: errorMessage }
        },
        github: {
          status: 'down',
          responseTime: 0,
          message: 'Health check system failure',
          timestamp,
          details: { error: errorMessage }
        },
      },
      timestamp,
      version: '1.0.0',
      uptime: Math.floor(process.uptime()),
    };

    return NextResponse.json(fallbackResponse, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  }
}

/**
 * Determine overall system health based on individual service statuses
 * 
 * Rules:
 * - If any service is down, overall is down
 * - If any service is degraded (but none down), overall is degraded
 * - If all services are healthy, overall is healthy
 */
function determineOverallStatus(
  watsonxStatus: 'healthy' | 'degraded' | 'down',
  githubStatus: 'healthy' | 'degraded' | 'down'
): 'healthy' | 'degraded' | 'down' {
  // Any service down = overall down
  if (watsonxStatus === 'down' || githubStatus === 'down') {
    return 'down';
  }

  // Any service degraded = overall degraded
  if (watsonxStatus === 'degraded' || githubStatus === 'degraded') {
    return 'degraded';
  }

  // All healthy
  return 'healthy';
}

// Made with Bob
