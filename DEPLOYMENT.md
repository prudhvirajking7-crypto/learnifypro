# TechProwexa — Deployment Guide

## Prerequisites
- cPanel hosting with **Node.js** support (LiteSpeed or Apache + mod_proxy)
- **PostgreSQL** database (create one in cPanel → PostgreSQL Databases)
- **Git** access (SSH terminal or Git Version Control in cPanel)

---

## Step 1: Set Up PostgreSQL Database in cPanel

1. Log in to **cPanel** → **PostgreSQL Databases**
2. Create a new database: `yourusername_learnify`
3. Create a database user with a strong password
4. Add the user to the database with **All Privileges**
5. Note your connection string:
   ```
   postgresql://yourusername_dbuser:password@localhost:5432/yourusername_learnify
   ```

---

## Step 2: Upload Code to cPanel

### Option A: Via GitHub (Recommended)
```bash
# In cPanel Terminal (SSH):
cd public_html   # or your desired directory
git clone https://github.com/yourusername/learnifypro.git .
```

### Option B: Via File Manager
1. Run `npm run build` locally
2. Zip the project folder (include `.next/`, `node_modules/`, `public/`, `server.js`, `package.json`)
3. Upload and extract via **cPanel → File Manager**

---

## Step 3: Set Environment Variables

In **cPanel → Node.js App** (or via SSH creating a `.env` file):

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<generate: openssl rand -base64 32>
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-email-password
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=your-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
```

---

## Step 4: Install Dependencies & Build

```bash
# In cPanel Terminal (SSH):
npm install --production=false
npm run build
```

---

## Step 5: Run Database Migrations

```bash
npx prisma migrate deploy
# OR if no migration files yet:
npx prisma db push

# Seed sample data:
npm run db:seed
```

---

## Step 6: Configure Node.js App in cPanel

1. Go to **cPanel → Node.js App**
2. Click **Create Application**
3. Set:
   - **Node.js version**: 18.x or 20.x
   - **Application mode**: Production
   - **Application root**: `/home/yourusername/public_html` (or your folder)
   - **Application URL**: `yourdomain.com`
   - **Application startup file**: `server.js`
4. Click **Create** then **Run NPM Install**
5. Click **Start App**

---

## Step 7: Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable **Google+ API** and **OAuth2 API**
3. Create **OAuth 2.0 Client ID** (Web application)
4. Add Authorized Redirect URIs:
   - `https://yourdomain.com/api/auth/callback/google`
5. Copy **Client ID** and **Client Secret** to your `.env`

---

## Step 8: Configure Stripe Webhooks

1. In [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://yourdomain.com/api/payment/webhook`
3. Select event: `checkout.session.completed`
4. Copy **Webhook Secret** to `STRIPE_WEBHOOK_SECRET`

---

## Step 9: Configure Razorpay

1. In [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings → API Keys**
3. Generate Live Keys
4. Copy **Key ID** and **Key Secret** to your `.env`

---

## Updating the App

```bash
# SSH into server:
cd /path/to/app
git pull origin main
npm install
npm run build
npx prisma migrate deploy
# Restart via cPanel → Node.js App → Restart
```

---

## Default Login Credentials (after seeding)

| Role       | Email                              | Password         |
|------------|------------------------------------|------------------|
| Admin      | admin@learnifypro.com              | Admin@123        |
| Instructor | john.smith@learnifypro.com         | Instructor@123   |

> **Change these passwords immediately after first login!**

---

## Tech Stack

| Layer        | Technology                    |
|--------------|-------------------------------|
| Frontend     | Next.js 14, React, Tailwind CSS |
| Backend      | Next.js API Routes            |
| Database     | PostgreSQL + Prisma ORM       |
| Auth         | NextAuth.js (Google + Email)  |
| Email        | Nodemailer (SMTP)             |
| Payments     | Stripe + Razorpay             |
| Deployment   | cPanel + Node.js              |
