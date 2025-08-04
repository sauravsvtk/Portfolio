# 🎯 Saurav S - Portfolio Website

A modern, production-ready portfolio website built with React, TypeScript, and deployed on Vercel with serverless architecture.

## 🚀 Live Demo
- **Website**: [Deploy to see live URL]
- **API Health**: [Your domain]/api/health

## ✨ Features

- **⚡ Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **🎨 Premium Design**: Glassmorphism effects with smooth animations
- **🌓 Dark/Light Theme**: Animated theme toggle with system preference detection
- **📱 Fully Responsive**: Mobile-first design optimized for all devices
- **🚀 Serverless Architecture**: Vercel serverless functions for API
- **📝 Contact Form**: Real-time validation with backend integration
- **🎭 Advanced Animations**: Framer Motion for professional transitions
- **⚡ Performance Optimized**: Image optimization, lazy loading, skeleton loaders
- **🔒 Production Ready**: Error boundaries, comprehensive error handling
- **📚 Comprehensive Documentation**: Detailed tech stack and deployment guides

## 🏗️ Project Structure

```
portfolio/
├── api/                          # Vercel Serverless Functions
│   ├── contact.ts               # Contact form handler
│   └── health.ts                # Health check endpoint
├── client/                      # React Frontend Application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ui/             # Reusable UI components
│   │   │   │   ├── loading-skeleton.tsx
│   │   │   │   ├── error-boundary.tsx
│   │   │   │   └── animated-theme-toggle.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── skills-section.tsx
│   │   │   ├── experience-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   ├── contact-section.tsx
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── use-image-optimization.tsx
│   │   │   ├── use-mobile.tsx
│   │   │   ├── use-theme.tsx
│   │   │   └── use-toast.ts
│   │   ├── lib/                # Utilities and configuration
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── pages/              # Page components
│   │   │   ├── home.tsx
│   │   │   └── not-found.tsx
│   │   ├── App.tsx             # Main application component
│   │   ├── main.tsx            # Application entry point
│   │   └── index.css           # Global styles and themes
│   ├── public/                 # Static assets
│   ├── package.json
│   └── dist/                   # Build output (generated)
├── attached_assets/            # Personal assets (profile photo)
├── docs/                       # Comprehensive documentation
│   ├── PROJECT_DOCUMENTATION.md
│   ├── TECH_STACK.md
│   ├── DEPLOYMENT_GUIDE.md
│   └── VERCEL_DEPLOYMENT.md
├── vercel.json                 # Vercel deployment configuration
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
└── replit.md                   # Project context and preferences
```

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Professional animation library

### **UI Components**
- **Radix UI** - Headless, accessible component primitives
- **shadcn/ui** - Beautiful components built on Radix UI
- **Lucide React** - Comprehensive icon library

### **State Management**
- **TanStack Query** - Server state management with caching
- **React Hook Form** - Performant forms with minimal re-renders
- **Zod** - TypeScript-first schema validation

### **Backend (Serverless)**
- **Vercel Functions** - Serverless API endpoints
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe backend development

### **Deployment & Hosting**
- **Vercel** - Serverless deployment platform
- **Vercel Edge Network** - Global CDN
- **Automatic HTTPS** - SSL/TLS certificates

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Local Development
```bash
# Clone the repository
git clone https://github.com/sauravs/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
cd client && npm run dev

# Open http://localhost:5173 in your browser
```

### API Development
```bash
# Install Vercel CLI for local serverless function testing
npm i -g vercel

# Test serverless functions locally
vercel dev

# Test API endpoints
curl http://localhost:3000/api/health
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

#### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sauravs/portfolio)

#### Option 2: Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# - Project name: saurav-portfolio
# - Framework: Other
# - Build command: cd client && npm ci && npm run build
# - Output directory: client/dist
```

### Environment Variables
```bash
# Set in Vercel dashboard
VITE_API_URL=https://your-domain.vercel.app
```

## 🔧 Development

### Available Scripts
```bash
# Frontend development
cd client && npm run dev          # Start dev server
cd client && npm run build        # Build for production
cd client && npm run preview      # Preview production build

# Type checking and linting
cd client && npm run type-check   # TypeScript checking
cd client && npm run lint         # ESLint checking
```

### Project Configuration
- **Vite Config**: `client/vite.config.ts`
- **Tailwind Config**: `tailwind.config.ts`
- **TypeScript Config**: `tsconfig.json`
- **Vercel Config**: `vercel.json`

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Complete project overview and architecture
- **[TECH_STACK.md](TECH_STACK.md)** - Detailed tech stack analysis and rationale
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Vercel-specific deployment guide

## 🎯 API Endpoints

### Health Check
- **GET** `/api/health`
- Returns API status and system information

### Contact Form
- **POST** `/api/contact`
- Accepts: `{ name: string, email: string, message: string }`
- Returns: Success/error response with validation

## 📊 Performance

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s ✅
- **FID (First Input Delay)**: < 100ms ✅
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅

### Optimizations
- Image optimization with WebP support
- Lazy loading for below-fold content
- Code splitting and tree shaking
- Efficient animations with GPU acceleration
- Comprehensive loading states

## 🔒 Security Features

- Input validation with Zod schemas
- CORS configuration for API endpoints
- XSS prevention measures
- Security headers implementation
- Error boundary protection

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Developer**: Saurav S
- **Location**: Calicut, Kerala, India
- **Portfolio**: [Your deployed URL]
- **Contact**: Use the contact form on the website

---

**Built with ❤️ using modern web technologies**