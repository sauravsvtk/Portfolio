import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

/**
 * Register API Routes
 * 
 * Configures all API endpoints for the portfolio application:
 * - Contact form submission with validation
 * - Health check endpoint for monitoring
 * 
 * Uses Zod for request validation and proper error handling
 * All contact messages are stored using the storage interface
 * 
 * @param app - Express application instance
 * @returns HTTP server instance
 */
export async function registerRoutes(app: Express): Promise<Server> {
  
  /**
   * POST /api/contact
   * Handles contact form submissions with validation and storage
   */
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body using Zod schema
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save the contact message to storage
      const contact = await storage.createContact(validatedData);
      
      // In a real application, you might also send an email notification here
      // For now, we'll just return success response
      res.json({ 
        success: true, 
        message: "Contact message received successfully",
        id: contact.id 
      });
    } catch (error) {
      // Handle validation errors from Zod
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid input data", 
          errors: error.errors 
        });
      } else {
        // Handle unexpected server errors
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  /**
   * GET /api/health
   * Simple health check endpoint for monitoring application status
   */
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Create and return HTTP server instance
  const httpServer = createServer(app);
  return httpServer;
}
