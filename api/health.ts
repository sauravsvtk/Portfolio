import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Health Check Serverless Function for Vercel
 * 
 * Provides API health status and basic system information
 * Used for monitoring, uptime checks, and deployment verification
 * 
 * Endpoint: GET /api/health
 * Response: { status: "ok", timestamp: ISO string, uptime: number, version: string }
 */

/**
 * CORS headers for cross-origin requests
 */
function setCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

/**
 * Get system information for health check
 */
function getSystemInfo() {
  return {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    region: process.env.VERCEL_REGION || 'unknown'
  };
}

/**
 * Main serverless function handler
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for all requests
  setCorsHeaders(res);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests for health checks
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      error: 'Method not allowed. Use GET for health check.',
      allowedMethods: ['GET']
    });
  }

  try {
    const timestamp = new Date().toISOString();
    const systemInfo = getSystemInfo();

    // Basic health check response
    const healthData = {
      status: 'ok',
      timestamp,
      uptime: Math.round(systemInfo.uptime),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      region: systemInfo.region,
      api: {
        endpoints: [
          'GET /api/health',
          'POST /api/contact'
        ],
        documentation: 'https://github.com/sauravs/portfolio#api-documentation'
      }
    };

    // Add detailed system info in development
    if (process.env.NODE_ENV === 'development') {
      (healthData as any).system = {
        nodeVersion: systemInfo.nodeVersion,
        platform: systemInfo.platform,
        architecture: systemInfo.arch,
        timezone: systemInfo.timezone,
        memory: {
          used: Math.round(systemInfo.memoryUsage.heapUsed / 1024 / 1024),
          total: Math.round(systemInfo.memoryUsage.heapTotal / 1024 / 1024),
          external: Math.round(systemInfo.memoryUsage.external / 1024 / 1024)
        }
      };
    }

    // Set cache headers for health endpoint
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
    
    return res.status(200).json(healthData);

  } catch (error) {
    // Handle unexpected errors in health check
    console.error('Health check error:', error);

    return res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      message: 'Internal server error during health check'
    });
  }
}

/**
 * Export type definitions for the frontend
 */
export type HealthResponse = {
  status: 'ok' | 'error';
  timestamp: string;
  uptime?: number;
  version?: string;
  environment?: string;
  region?: string;
  api?: {
    endpoints: string[];
    documentation: string;
  };
  error?: string;
  message?: string;
};