# Vercel Deployment Guide

## Prerequisites

✅ GitHub repository with your code  
✅ Vercel account (sign up at https://vercel.com)  
✅ Supabase PostgreSQL database connection string

---

## Step 1: Get Supabase Database Connection String

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `mnwhrwleuonxhlffsazc`
3. Navigate to **Project Settings** (gear icon) → **Database**
4. Scroll to **Connection String** section
5. Select **URI** tab
6. Copy the connection string (format):
   ```
   postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
7. **Important**: Replace `[YOUR-PASSWORD]` with your actual database password

---

## Step 2: Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Configure unified Vercel deployment"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: (auto-detected from vercel.json)
   - **Output Directory**: `dist` (auto-detected)

5. **Add Environment Variables**:
   Click **"Environment Variables"** and add:

   | Name           | Value                                                                                     |
   | -------------- | ----------------------------------------------------------------------------------------- |
   | `DATABASE_URL` | Your Supabase PostgreSQL connection string                                                |
   | `JWT_SECRET`   | Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

6. Click **"Deploy"**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

---

## Step 4: Run Database Migrations

After first deployment, run Prisma migrations:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Link to your project
vercel link

# Run migrations in production
vercel env pull .env.production
cd nest_backend
npx prisma migrate deploy
```

**Alternative**: Use Prisma Studio or SQL editor in Supabase to create tables manually based on `nest_backend/prisma/schema.prisma`

---

## Step 5: Verify Deployment

1. **Check Build Logs**:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Review build logs for errors

2. **Test Frontend**:
   - Visit your deployment URL (e.g., `https://your-project.vercel.app`)
   - Verify the landing page loads

3. **Test API**:
   - Open browser console (F12)
   - Try to register/login
   - Check Network tab for API calls to `/api/*`

4. **Check Function Logs**:
   - Vercel Dashboard → Your Project → Functions
   - Click on `nest_backend/api/index.ts`
   - View logs for any errors

---

## Environment Variables Reference

### Required Variables

| Variable       | Description                  | Where to Get                           |
| -------------- | ---------------------------- | -------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string | Supabase Dashboard → Database Settings |
| `JWT_SECRET`   | Secret for JWT tokens        | Generate random string (32+ chars)     |

### Optional Variables

| Variable       | Description  | Default             |
| -------------- | ------------ | ------------------- |
| `VITE_API_URL` | API base URL | `/api` (production) |

---

## Troubleshooting

### Build Fails

**Error**: `Cannot find module '@nestjs/core'`

- **Fix**: Vercel should install nest_backend dependencies automatically via `installCommand` in vercel.json

**Error**: `Prisma Client not generated`

- **Fix**: Check that `postinstall` script runs in nest_backend/package.json

### API Returns 500 Error

**Check**:

1. Vercel Dashboard → Functions → View Logs
2. Look for database connection errors
3. Verify `DATABASE_URL` is set correctly
4. Ensure database migrations are run

### CORS Errors

**Fix**: Already configured in `vercel.json` headers section. If still occurring:

- Check browser console for specific error
- Verify API calls use relative path `/api/*`

### Database Connection Fails

**Check**:

1. Supabase database is running
2. Connection string is correct (including password)
3. Database allows connections from Vercel IPs (Supabase allows all by default)

---

## Local Development

```bash
# Frontend (root directory)
npm run dev

# Backend (separate terminal)
cd nest_backend
npm run start:dev
```

Frontend runs on: http://localhost:5173  
Backend runs on: http://localhost:3000

---

## Useful Commands

```bash
# View deployment logs
vercel logs

# Pull environment variables locally
vercel env pull

# Redeploy
vercel --prod

# Run Prisma migrations
cd nest_backend
npx prisma migrate deploy

# View database in Prisma Studio
cd nest_backend
npx prisma studio
```

---

## Next Steps After Deployment

1. ✅ Test user registration
2. ✅ Test user login
3. ✅ Verify JWT authentication
4. ✅ Test all API endpoints
5. 📝 Add initial data (programs, modules, lessons)
6. 🎨 Customize frontend branding
7. 📊 Set up monitoring/analytics

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Nest.js Docs**: https://docs.nestjs.com
- **Prisma Docs**: https://www.prisma.io/docs
- **Supabase Docs**: https://supabase.com/docs
