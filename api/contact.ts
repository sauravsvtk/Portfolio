import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

/**
 * Contact Form Serverless Function for Vercel
 * 
 * Handles contact form submissions with validation and storage
 * Compatible with Vercel's serverless function format
 * 
 * Endpoint: POST /api/contact
 * Body: { name: string, email: string, message: string }
 */

// Contact form validation schema using Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .trim(),
});

// In-memory storage for contact submissions
// Note: In production, this would reset on each function invocation
// Consider using a database like Neon, PlanetScale, or Vercel KV for persistence
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

let contactSubmissions: ContactSubmission[] = [];

/**
 * Generate unique ID for contact submissions
 */
function generateId(): string {
  return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * CORS headers for cross-origin requests
 */
function setCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
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

  // Only allow POST requests for contact form submissions
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST to submit contact form.',
      allowedMethods: ['POST']
    });
  }

  try {
    // Validate request body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: 'Request body is required',
        details: 'Please provide name, email, and message fields'
      });
    }

    // Parse and validate the contact form data
    const validationResult = contactSchema.safeParse(req.body);

    if (!validationResult.success) {
      // Return detailed validation errors
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: fieldErrors,
        message: 'Please check the form fields and try again'
      });
    }

    const { name, email, message } = validationResult.data;

    // Create contact submission record
    const submission: ContactSubmission = {
      id: generateId(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] as string || req.headers['x-real-ip'] as string || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    };

    // Store the submission (in-memory for this example)
    contactSubmissions.push(submission);

    // Log successful submission (helpful for monitoring)
    console.log(`New contact submission from ${email} at ${submission.timestamp}`);

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: submission.id,
        timestamp: submission.timestamp,
        name: submission.name
      }
    });

  } catch (error) {
    // Handle unexpected errors
    console.error('Contact form submission error:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Something went wrong while processing your message. Please try again later.'
    });
  }
}

/**
 * Export type definitions for the frontend
 */
export type ContactRequest = z.infer<typeof contactSchema>;
export type ContactResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    timestamp: string;
    name: string;
  };
  error?: string;
  details?: any;
};