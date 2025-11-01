# راهنمای استقرار (Deployment)

## استقرار در Vercel (توصیه شده برای Frontend)

### 1. آماده‌سازی

```bash
cd frontend
yarn build
```

### 2. نصب Vercel CLI

```bash
npm i -g vercel
```

### 3. Deploy

```bash
vercel --prod
```

### 4. تنظیم متغیرهای محیطی

در Vercel Dashboard > Settings > Environment Variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## استقرار در Netlify

### 1. Build Settings

- Build command: `cd frontend && yarn build`
- Publish directory: `frontend/dist`

### 2. Environment Variables

در Netlify Dashboard > Site settings > Environment variables همان متغیرها را اضافه کنید.

## استقرار در سرور VPS

### 1. نصب Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Yarn
npm install -g yarn

# Install Nginx
sudo apt install -y nginx

# Install PM2
npm install -g pm2
```

### 2. Clone Repository

```bash
git clone your-repository-url
cd persian-marketplace
yarn install
```

### 3. Build Frontend

```bash
cd frontend
yarn build
```

### 4. تنظیم Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/persian-marketplace/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 5. SSL با Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## بهینه‌سازی Performance

### 1. Enable Compression

در Nginx config:

```nginx
gzip on;
gzip_comp_level 5;
gzip_min_length 256;
gzip_proxied any;
gzip_vary on;
```

### 2. Browser Caching

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Image Optimization

استفاده از Supabase Image Transformation:

```javascript
const imageUrl = `${supabaseUrl}/storage/v1/render/image/public/products/${path}?width=400&quality=80`
```

## Monitoring

### 1. Sentry برای Error Tracking

```bash
yarn add @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

### 2. Google Analytics

```html
<!-- در index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## Backup Strategy

### 1. Database Backup (Supabase)

Supabase به صورت خودکار backup می‌گیرد، اما می‌توانید manual backup نیز بگیرید:

```bash
pg_dump -h db.your-project.supabase.co -U postgres -d postgres > backup.sql
```

### 2. Code Backup

```bash
git push origin main
```

## Security Checklist

- ✅ HTTPS فعال شده
- ✅ Environment variables در محیط production تنظیم شده
- ✅ Row Level Security در Supabase فعال است
- ✅ Rate limiting برای API
- ✅ Input validation
- ✅ XSS protection
- ✅ CSRF protection

## Update Strategy

### 1. Zero Downtime Deployment

```bash
# Pull latest code
git pull origin main

# Build new version
cd frontend
yarn build

# Nginx automatically serves new files
```

### 2. Database Migrations

برای تغییرات schema:

```sql
-- در Supabase SQL Editor
ALTER TABLE products ADD COLUMN new_field TEXT;
```

## مانیتورینگ

### Health Check Endpoint

```javascript
// برای monitoring
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})
```

### Uptime Monitoring

استفاده از سرویس‌هایی مثل:
- UptimeRobot
- Pingdom
- StatusCake

## Cost Optimization

### Supabase

- استفاده از CDN برای فایل‌های استاتیک
- Optimize queries
- Index مناسب
- Connection pooling

### Vercel

- Optimize bundle size
- Tree shaking
- Code splitting
- Image optimization

## مشکلات رایج در Production

### 1. خطای 404 در Refresh

Solution: تنظیم rewrites در Vercel یا Nginx

### 2. Environment Variables نادرست

Solution: بررسی و تنظیم مجدد در dashboard

### 3. Performance Issues

Solution:
- Enable Gzip
- Optimize images
- Use CDN
- Code splitting

## پشتیبانی و نگهداری

### Weekly Tasks
- بررسی logs
- بررسی performance metrics
- بررسی error tracking

### Monthly Tasks
- بررسی security updates
- بررسی dependency updates
- backup verification

## مقیاس‌پذیری (Scalability)

### Horizontal Scaling

استفاده از Load Balancer برای توزیع ترافیک:

```nginx
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}
```

### Database Scaling

- Read replicas در Supabase
- Connection pooling
- Caching با Redis

## نتیجه‌گیری

با این راهنما، پروژه شما آماده استقرار در production است. برای سوالات بیشتر، به [SETUP.md](SETUP.md) مراجعه کنید.

