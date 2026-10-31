# Md. Sahadat Hossain — Futuristic Cyber Portfolio & Systems Architecture

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.4-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Lenis Scroll](https://img.shields.io/badge/Lenis-Inertia_Physics-00F0FF?style=for-the-badge)](https://lenis.darkroom.engineering/)

Official digital engineering portfolio of **Md. Sahadat Hossain** — AI Product Architect & Full-Stack Systems Engineer. Crafted with the high-velocity **Framer Omnira Cyber Aesthetic**, featuring interactive 3D WebGL components, an end-to-end synchronized Admin Control Terminal, custom tactical HUD cursor intelligence, and a hardened hybrid data backend.

---

## 🌐 Live Production Deployment

- 🚀 **Live Production Site:** [https://stl-sahadat.github.io/sahadathossain/](https://stl-sahadat.github.io/sahadathossain/)
- 🛰️ **Status:** `ONLINE // SECURED PROTOCOL`
- ⚡ **Timezone Engine:** `Dhaka, Bangladesh · UTC+6`

---

## 🏛️ System Architecture & Engineering Highlights

```
                                      ┌─────────────────────────────┐
                                      │   MD. SAHADAT HOSSAIN       │
                                      │   CYBER DIGITAL ECOSYSTEM   │
                                      └──────────────┬──────────────┘
                                                     │
                     ┌───────────────────────────────┴───────────────────────────────┐
                     ▼                                                               ▼
       ┌───────────────────────────┐                                   ┌───────────────────────────┐
       │   Next.js 15 App Router   │                                   │       Vite 6 SPA          │
       │   Full-Stack Server Node  │                                   │   Static High-Speed Edge  │
       └─────────────┬─────────────┘                                   └─────────────┬─────────────┘
                     │                                                               │
                     ├─► /api/auth/login  (Anti-Brute Force Rate Limiter)            ├─► Instant Edge Loading
                     ├─► /api/portfolio   (Bearer Session Protection)               ├─► GitHub Pages Optimized
                     ├─► /api/upload      (5MB Strict MIME Image Guard)              ├─► Web Crypto SHA-256 Auth
                     └─► Prisma 6 ORM     (MySQL + Resilient Disk Store)            └─► 100% Offline Resilient
```

### 1. Dual-Engine Flexibility
- **Next.js 15 Full-Stack Engine:** Dynamic server-side rendering, App Router route handlers, Prisma ORM database models, and server-side rate-limiting middleware.
- **Vite 6 High-Performance SPA Engine:** Zero-friction static export optimized for GitHub Pages and edge CDN distribution with sub-150ms First Contentful Paint.

### 2. Multi-Layer Security Architecture
- **Cryptographic Password Hashing:** Credentials are never stored or transmitted in plain text. Protected with salted SHA-256 cryptographic digests using native Web Crypto API and Node.js Crypto.
- **Anti-Brute Force Lockdown Protocol:** Integrated 3-strike progressive rate limiting. Three consecutive unauthorized attempts trigger an automated system lockdown with real-time countdown enforcement.
- **Bearer Session Token Verification:** All data-mutating endpoints (`POST /api/portfolio`, `POST /api/upload`) strictly enforce authorized administrative session tokens.
- **Data Masking on Public APIs:** Public GET endpoints automatically sanitize data models, preventing any internal authentication metadata or hashes from reaching external clients.
- **MIME & Payload Armor:** Upload pipeline enforces strict binary signature checks for images (`PNG`, `JPEG`, `WEBP`, `SVG`) and caps file size at 5MB.

### 3. Interactive UI/UX Innovations
- **Cyber Cursor Studio:** 6 precision-crafted tactical pointers with real-time HUD lock-on, including *Minimal Cyber Dot*, *Precision Reticle (+)*, *Cyber Stealth Arrow*, *Diamond Prism*, *Precision Micro Ring*, and *Tactical HUD Brackets*, plus optional default OS cursor fallback.
- **Interactive 3D Hero Cube:** Real-time 3D isometric rotation highlighting core specializations (*Mobile Apps, SaaS Platforms, AI & Agents, E-Commerce*).
- **Project Architecture & Specification Modal:** Deep technical breakdown for every deployed project, including system architecture, technical constraints, solutions, and direct launch triggers.
- **Dynamic Cyber Theme Studio:** Real-time palette switching between *Cyber Cyan* (`#00F0FF`), *Neon Gold* (`#FFD700`), *Crimson Red* (`#FF0055`), *Matrix Green* (`#00FF66`), and *Synthwave Violet* (`#A855F7`).
- **Lenis Smooth Inertia Momentum Scroll:** Natural, frictionless physics-based page scrolling.

---

## 📂 Project Directory Structure

```
├── app/                        # Next.js 15 App Router & API Handlers
│   ├── api/
│   │   ├── auth/login/         # Server-Side Auth & Rate Limiter
│   │   ├── portfolio/          # Protected Data Persistence API
│   │   └── upload/             # Protected Asset Uploader API
│   ├── layout.jsx              # Root Layout & Typography Fonts
│   └── page.jsx                # App Router Home View
├── prisma/                     # Database Schema & Migrations
│   └── schema.prisma           # MySQL Models with Prisma Client 6
├── public/                     # Static Production Assets & Uploads
│   └── assets/img/             # High-Resolution Photographs & Badges
├── src/
│   ├── components/             # Reusable Cyber HUD Components
│   │   ├── admin/              # Admin Matrix Suite (13 Dedicated Tabs)
│   │   ├── CyberCursor.jsx     # High-Precision Cyber Cursor Engine
│   │   ├── CyberFrame.jsx      # Framer Omnira Chamfered Card Shell
│   │   ├── Navbar.jsx          # Tactical Navigation Bar
│   │   ├── ProjectDetailModal.jsx # Project Architecture Highlight Modal
│   │   └── ThreeD.jsx          # 3D Tilt Cards & Hero Cube Engine
│   ├── context/
│   │   └── PortfolioDataContext.jsx # Global Reactive Data & Theme Context
│   ├── lib/
│   │   ├── assetHelper.js      # Base URL & Asset Normalization Engine
│   │   ├── dbService.js        # Hybrid Prisma MySQL + Disk Store Fallback
│   │   ├── prisma.js           # Singleton Prisma Client Instance
│   │   ├── security.js         # Salted SHA-256 Web Crypto Implementation
│   │   └── sessionService.js   # Session Token Lifecycle Manager
│   └── views/                  # Primary Portfolio Route Views
│       ├── AboutPage.jsx
│       ├── AdminPage.jsx
│       ├── ContactPage.jsx
│       ├── GalleryPage.jsx
│       ├── HomePage.jsx
│       └── WorksPage.jsx
├── vite-portfolio-api-plugin.js # Vite API Server Plugin with Security Shield
└── vite.config.js              # Vite Build Configuration
```

---

## 🛠️ Getting Started & Local Development

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **Package Manager:** `npm` (included with Node.js)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/stl-sahadat/sahadathossain.git
cd sahadathossain
npm install
```

### 3. Running the Development Server

#### Option A: Next.js 15 Full-Stack Server
```bash
npm run dev
```
*Access the application at `http://localhost:3000`.*

#### Option B: Vite 6 Fast SPA Server
```bash
npm run dev:vite
```
*Access the application at `http://localhost:5174`.*

---

## 📦 Production Builds & Deployment

### Build for Next.js Full-Stack
```bash
npm run build
npm run start
```

### Build for Vite / Static Edge (GitHub Pages)
```bash
npm run build:vite
npm run preview:vite
```

### Database Management (Optional Prisma MySQL)
```bash
# Generate Prisma Client bindings
npm run prisma:generate

# Synchronize schema with active database
npm run prisma:push
```

---

## 🔒 Security Policy & Safeguards

- **Access Protection:** Administrative areas require cryptographic credential validation.
- **Zero Ingestion of Untrusted Data:** All form inputs and API payloads are strictly validated and sanitized.
- **No Private Secrets in Version Control:** Environment variables, private API secrets, and sensitive credentials are never checked into git.

---

## 📜 Copyright & Attribution

Copyright © 2026 **Md. Sahadat Hossain**. All rights reserved.  
*Designed, engineered, and maintained by Md. Sahadat Hossain.*
