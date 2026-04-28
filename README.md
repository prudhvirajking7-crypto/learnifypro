# TechProwexa — Full-Stack E-Learning Platform

A production-grade Udemy-like e-learning platform built with Next.js 14, PostgreSQL, Stripe, and Razorpay.

🌐 **Live:** [techprowexa.com](https://techprowexa.com)

---

## Features

- **Authentication** — Google OAuth, Email/Password login, Email OTP verification on signup
- **Course Catalog** — Browse, search, filter by category, level, price; course detail pages with curriculum accordion
- **Video Player** — Custom controls, progress tracking, auto-marks lecture complete at 90%
- **Dual Payments** — Razorpay (UPI / Indian cards) + Stripe (international cards)
- **Dashboard** — Enrolled courses, progress tracking, order history
- **Role System** — Student, Instructor, Admin roles with middleware-protected routes
- **Responsive UI** — Tailwind CSS with custom animations, works on all devices

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS |
| Backend | Next.js API Routes (Node.js) |
| Database | PostgreSQL (Neon) + Prisma ORM |
| Auth | NextAuth.js v4 — Google OAuth + Credentials |
| Email | Nodemailer (SMTP) |
| Payments | Stripe Checkout + Razorpay Orders API |
| Deployment | cPanel Shared Hosting (standalone Node.js) |

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/prudhvirajking7/techprowexa.git
cd techprowexa
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

Required variables:

```env
DATABASE_URL=postgresql://user:pass@host/dbname
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate: openssl rand -base64 32>

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=exploretech@techprowexa.com
SMTP_PASS=your-hostinger-email-password
SMTP_FROM=TechProwexa <exploretech@techprowexa.com>
CAREERS_EMAIL=exploretech@techprowexa.com

STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
```

### 3. Set Up Database

```bash
npx prisma db push
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Default Seeded Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@techprowexa.com | Admin@123 |
| Instructor | john.smith@techprowexa.com | Instructor@123 |

> **Change these immediately after first login in production!**

---

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Push Prisma schema to DB
npm run db:seed      # Seed sample data
npm run db:studio    # Open Prisma Studio (DB GUI)
```

---

## Project Structure

```
├── app/
│   ├── (auth)/          # Login, Register, Verify OTP pages
│   ├── api/             # API routes (auth, courses, cart, payment)
│   ├── cart/            # Shopping cart page
│   ├── checkout/        # Checkout success page
│   ├── courses/         # Course catalog & detail pages
│   │   └── [slug]/learn # Video player / learning page
│   └── dashboard/       # Student dashboard
├── components/
│   ├── courses/         # CourseCard, CourseFilters, EnrollButton, VideoPlayer
│   └── layout/          # Navbar, Footer
├── lib/                 # Prisma, Auth, Stripe, Razorpay, Email utilities
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Sample data seeder
└── middleware.ts         # Route protection
```

---

## Deployment (cPanel)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full step-by-step cPanel deployment guide.

Key steps:
1. `npm run build` generates `.next/standalone/`
2. Upload standalone folder to cPanel
3. Set all environment variables in cPanel Node.js App
4. Set startup file to `server.js`
5. Configure `.htaccess` to proxy requests to Node.js

---

## Payment Testing

**Stripe test card:**
```
Card: 4242 4242 4242 4242
Expiry: Any future date | CVC: Any 3 digits
```

**Razorpay test:**
Use test mode keys from dashboard.razorpay.com with any test UPI/card credentials.

---

## License

MIT — feel free to use this project as a template for your own e-learning platform.
