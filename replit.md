# Saurav S - Portfolio Website

## Overview

This is a premium portfolio website for Saurav S, a full-stack software engineer based in Calicut, Kerala. The application is built as a modern single-page application using React.js with a Node.js/Express backend, featuring smooth animations, dark/light theme support, and a contact form with database persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React 18 with TypeScript, following a component-based architecture. The application uses:
- **React Router** (wouter) for client-side routing
- **Tailwind CSS** for utility-first styling with shadcn/ui components
- **Framer Motion** for smooth animations and transitions
- **TanStack Query** for state management and API calls
- **React Hook Form** with Zod validation for form handling
- **next-themes** for dark/light mode theming

### Backend Architecture
The backend follows a minimal Express.js REST API pattern:
- **Express.js** server with TypeScript
- **RESTful API** endpoints for contact form and health checks
- **In-memory storage** for development (can be easily replaced with database)
- **Zod schemas** for request/response validation
- **CORS and security middleware** for production readiness

### Component Structure
The frontend is organized into logical sections:
- **Navbar** - Fixed navigation with theme toggle
- **Hero Section** - Animated landing with typing effects
- **About Section** - Personal information and contact details
- **Skills Section** - Technical and soft skills with progress indicators
- **Experience Section** - Professional timeline
- **Projects Section** - Portfolio showcase with placeholder projects
- **Contact Section** - Contact form with backend integration
- **Footer** - Social links and branding

## Key Components

### Theme System
- Implements system-wide dark/light mode switching
- Uses CSS custom properties for consistent theming
- Persists user preference in localStorage
- Smooth transitions between themes

### Animation System
- Framer Motion integration for scroll-triggered animations
- Hover effects and micro-interactions
- Staggered animations for list items
- Performance-optimized animations with reduced motion support

### Form Handling
- React Hook Form for efficient form state management
- Zod schema validation on both client and server
- Real-time validation feedback
- Toast notifications for user feedback

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoint-based responsive components
- Touch-friendly interactions on mobile devices
- Optimized typography and spacing across devices

## Data Flow

### Contact Form Flow
1. User fills out contact form with name, email, and message
2. Client-side validation using Zod schema
3. Form submission via TanStack Query mutation
4. Server validates data and stores in memory storage
5. Success/error feedback via toast notifications
6. Form reset on successful submission

### Theme Management Flow
1. Theme provider wraps entire application
2. Theme state managed through React context
3. System preference detection and manual overrides
4. CSS custom properties updated dynamically
5. Preference persisted in localStorage

## External Dependencies

### Core Dependencies
- **React 18** - Frontend framework
- **Express.js** - Backend server framework
- **TypeScript** - Type safety across the stack
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Database & Validation
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Production database (via Neon serverless)
- **Zod** - Schema validation library

### UI Components
- **Radix UI** - Headless component primitives
- **shadcn/ui** - Pre-built accessible components
- **Lucide React** - Icon library

### Development Tools
- **Vite** - Frontend build tool and dev server
- **esbuild** - Backend bundling for production
- **PostCSS** - CSS processing
- **ESLint & Prettier** - Code quality and formatting

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with HMR
- tsx for backend TypeScript execution
- Concurrent development with proxy setup
- Hot reloading for both client and server code

### Production Build
- Vite builds optimized frontend bundle
- esbuild bundles server code for Node.js
- Static assets served from Express
- Environment-based configuration

### Database Setup
- Drizzle ORM with PostgreSQL dialect
- Database migrations in `/migrations` directory
- Environment variable configuration for database URL
- Fallback to in-memory storage for development

### Hosting Considerations
- Frontend can be deployed to static hosting (Vercel, Netlify)
- Backend can be deployed to Node.js hosting (Railway, Render)
- Database hosted on Neon or similar PostgreSQL service
- Environment variables for API keys and database connections

The application is designed to be easily deployable to various hosting platforms while maintaining development simplicity and production performance.