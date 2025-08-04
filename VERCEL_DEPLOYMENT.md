# 🚀 Vercel Deployment Setup

## Project Structure (Updated for Serverless)

```
portfolio/
├── api/                          # Vercel Serverless Functions
│   ├── contact.ts               # POST /api/contact
│   └── health.ts                # GET /api/health
├── client/                      # Frontend React App
│   ├── src/
│   ├── package.json
│   └── dist/ (build output)
├── vercel.json                  # Vercel Configuration
├── package.json                 # Root package.json
└── README.md
```

## 🔧 Serverless Functions Created

### `/api/contact.ts`
- **Method**: POST
- **Purpose**: Handle contact form submissions
- **Validation**: Zod schema validation
- **Storage**: In-memory (consider upgrading to Vercel KV or database)
- **CORS**: Enabled for cross-origin requests

### `/api/health.ts`
- **Method**: GET
- **Purpose**: Health check and API status
- **Response**: System information and uptime
- **Caching**: 60-second cache headers

## 📋 Deployment Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from Project Root
```bash
vercel
```

### 4. Configure Project Settings
When prompted:
- **Project name**: `saurav-portfolio`
- **Framework**: `Other`
- **Root directory**: `./` (project root)
- **Build command**: `cd client && npm ci && npm run build`
- **Output directory**: `client/dist`

### 5. Set Environment Variables
In Vercel dashboard or via CLI:
```bash
vercel env add VITE_API_URL production
# Enter: https://your-domain.vercel.app
```

## 🔧 Configuration Files

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/client/dist/$1" }
  ],
  "functions": {
    "api/contact.ts": { "maxDuration": 10 },
    "api/health.ts": { "maxDuration": 5 }
  }
}
```

## 🌐 API Endpoints (After Deployment)

### Health Check
```bash
curl https://your-domain.vercel.app/api/health
```

### Contact Form
```bash
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello!"}'
```

## 🔄 Frontend Integration

The frontend will automatically detect Vercel environment and use relative API URLs:

```typescript
// In production: /api/contact
// In development: http://localhost:5000/api/contact
```

## 🚀 Production Considerations

### Database Upgrade (Recommended)
Replace in-memory storage with:
- **Vercel KV**: For simple key-value storage
- **Neon**: Serverless PostgreSQL
- **PlanetScale**: Serverless MySQL
- **Supabase**: Open-source Firebase alternative

### Example with Vercel KV:
```typescript
import { kv } from '@vercel/kv';

// In api/contact.ts
await kv.lpush('contact_submissions', submission);
```

### Security Enhancements
- Rate limiting with Vercel Edge Config
- Input sanitization for XSS prevention
- CAPTCHA integration for spam protection

## 🎯 Performance Optimizations

### Function Optimization
- **Cold start reduction**: Keep functions lightweight
- **Memory allocation**: Optimize based on usage
- **Caching**: Use appropriate cache headers

### Frontend Optimizations
- **Static generation**: Pre-build static assets
- **Image optimization**: Use Vercel's Image Optimization
- **CDN caching**: Leverage Vercel's global CDN

## 📊 Monitoring

### Built-in Vercel Analytics
- Function execution times
- Error rates and logs
- Performance metrics

### Custom Monitoring
```typescript
// Add to functions for custom analytics
console.log('Contact form submitted:', {
  timestamp: new Date().toISOString(),
  success: true
});
```

## 🔧 Troubleshooting

### Common Issues

#### Function Timeout
- Increase `maxDuration` in vercel.json
- Optimize function code for performance

#### CORS Errors
- Verify CORS headers in function responses
- Check domain configuration

#### Build Failures
```bash
# Clear cache and rebuild
vercel --force

# Check build logs
vercel logs
```

### Development vs Production
```typescript
// Environment detection
const isDev = process.env.NODE_ENV === 'development';
const isVercel = process.env.VERCEL === '1';
```

## 🎯 Next Steps After Deployment

1. **Test all functionality** on production URL
2. **Set up custom domain** (optional)
3. **Configure monitoring** and alerts
4. **Upgrade to persistent storage** for contact forms
5. **Add rate limiting** for production security
6. **Set up CI/CD** with GitHub integration

Your portfolio is now ready for Vercel deployment with serverless architecture!