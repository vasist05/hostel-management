# 🏨 StayEase — Complete Hostel Management System

A full-featured, single-page hostel management web application with a React + JSX frontend and a Node.js / Express + SQLite backend. Designed for hostel owners, managers, tenants, and prospective residents — all in one codebase.

---

## 📑 Table of Contents

1. [Features Overview](#-features-overview)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Quick Start](#-quick-start)
5. [User Roles & Views](#-user-roles--views)
6. [Admin — Hostel Settings & Setup](#-admin--hostel-settings--setup)
7. [Backend API Reference](#-backend-api-reference)
8. [Frontend Build Process](#-frontend-build-process)
9. [Environment Variables](#-environment-variables)
10. [Data Persistence](#-data-persistence)
11. [Customization Guide](#-customization-guide)
12. [npm Scripts Reference](#-npm-scripts-reference)

---

## ✨ Features Overview

| Category | Features |
|----------|----------|
| **Public / Customer** | Browse available rooms, filter by floor/AC/category, read reviews, fee calculator, hostel rules, staff info |
| **New Joiner** | Room booking form, document checklist, onboarding guide, progress tracker |
| **Tenant Portal** | My room & bed details, raise maintenance tickets, view notices, mess menu, visitor pass, SOS emergency alert |
| **Manager Dashboard** | Occupancy stats, room & bed management, ticket workflow, notices board, expense tracker, visitor log, staff roster |
| **Admin Settings** | Edit all hostel branding & details, rules editor, add/delete rooms, one-click preset templates, JSON backup & import |
| **Multilingual** | English, हिंदी (Hindi), தமிழ் (Tamil) |
| **Dark / Light Mode** | Toggle with persistent preference |
| **Offline-first** | Full `localStorage` fallback when backend is offline |

---

## 🛠 Tech Stack

### Frontend
| Technology | Role |
|-----------|------|
| **React 18** (CDN, no bundler needed) | UI component framework |
| **JSX** compiled via `@babel/core` | JSX → plain JS transformation |
| **Tailwind CSS** (CDN) | Utility-first styling, dark mode |
| **Lucide Icons** (CDN) | Icon library |
| **Plus Jakarta Sans** (Google Fonts) | Primary typeface |

### Backend
| Technology | Role |
|-----------|------|
| **Node.js** | Runtime |
| **Express 5** | REST API server |
| **SQLite3** | Embedded relational database (`hostel.db`) |
| **body-parser** | JSON/URL-encoded request parsing |
| **cors** | Cross-origin request handling (respects `CORS_ORIGIN` env var) |
| **nodemon** | Hot-reload during development |

---

## 📁 Project Structure

```
hostel-app/
│
├── index.html              # Main entry point — loads React + compiled app
├── app.js                  # ⭐ Full React application (JSX source — EDIT THIS)
├── api.js                  # Frontend API client (StayEaseApi object)
├── package.json            # Root npm scripts (build, dev, start, test)
├── package-lock.json       # Locked dependency tree for reproducible installs
├── babel.config.json       # Babel preset config for JSX compilation
│
├── scripts/
│   ├── build.js            # Babel build script: app.js → app.compiled.js
│   └── dev.js              # Dev launcher: starts backend + watch mode together
│
└── backend/
    ├── server.js           # Express REST API — all route handlers
    ├── database.js         # SQLite schema + seed data + helper functions
    ├── test-api.js         # API integration test runner
    ├── .env                # Environment config (gitignored — never committed)
    ├── .env.example        # Template for environment variables
    ├── package.json        # Backend dependencies
    └── package-lock.json   # Locked backend dependency tree
```

> **Note:** `app.compiled.js` and `backend/hostel.db` are **not** committed to git — they are generated at runtime. Run `npm run build` to generate the compiled JS, and `npm run dev` to create the database on first launch.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- npm v9+

### 1. Install Dependencies

```bash
# Install root dependencies (Babel for build)
npm install

# Install backend dependencies
npm install --prefix backend
```

### 2. Configure Environment

```bash
# Windows
copy backend\.env.example backend\.env

# macOS / Linux
cp backend/.env.example backend/.env
```

Default values work out of the box:
```
PORT=5000
CORS_ORIGIN=*
DB_PATH=./hostel.db
```

### 3. Start Everything (Recommended)

```bash
npm run dev
```

This runs `scripts/dev.js` which starts the backend with **nodemon** (hot-reload) and automatically rebuilds `app.compiled.js` whenever you save `app.js`.

Or run them separately:
```bash
# Terminal 1 — backend
npm start

# Terminal 2 — rebuild frontend (one-shot)
npm run build

# Terminal 2 — rebuild frontend (watch mode)
npm run build:watch
```

The API will be live at: **`http://localhost:5000/api`**

### 4. Open the Frontend

Simply open `index.html` in your browser:
```
file:///C:/path/to/hostel-app/index.html
```

Or serve it locally:
```bash
npx -y serve . -p 3000
# Then open http://localhost:3000
```

> **Tip:** The app works fully offline — if the backend is not running, all data falls back to `localStorage` automatically with no errors.

---

## 👥 User Roles & Views

Switch roles using the **pill switcher in the top navbar**. No login required.

### 🌐 Public Customer
- Browse all rooms with photo gallery, amenity tags, price & deposit
- Filter by floor, AC/non-AC, room category (Single/Double/Triple/Dormitory)
- Read tenant reviews and star ratings
- Interactive **Fee Calculator** (monthly cost + deposit estimate)
- View hostel rules, facilities, and staff contacts

### 📋 New Joiner
- Step-by-step onboarding checklist
- Document submission tracker
- Room allocation status
- Welcome guide and hostel orientation info

### 🏠 Tenant Portal
- **My Room** — View assigned bed, roommates, and rent due date
- **Maintenance Tickets** — Raise, track, and close repair requests with optional photo
- **Notice Board** — Read hostel announcements sorted by category
- **Mess Menu** — Weekly meal schedule
- **Visitor Pass** — Log expected visitors with entry/exit times
- **SOS Emergency Alert** — One-tap emergency broadcast to warden & security desk

### 🏢 Manager Dashboard

| Tab | What it manages |
|-----|----------------|
| **Overview** | Live occupancy %, revenue, total beds, vacancy count |
| **Rooms & Beds** | Full room inventory, bed-by-bed tenant view, edit occupancy |
| **Maintenance** | Ticket queue with priority (High/Medium/Low), status workflow |
| **Notices** | Post, edit, delete hostel announcements |
| **Expenses** | Monthly expense log with category breakdown |
| **Visitor Log** | Check-in/check-out visitor registry |
| **Staff Roster** | Staff list with roles, shifts, and contact info |
| **⚙️ Hostel Settings** | Full admin control panel (see below) |

---

## ⚙️ Admin — Hostel Settings & Setup

**Access:** Manager Dashboard → **"Hostel Settings & Setup"** tab

### 🏷️ Hostel Profile Editor
Edit and instantly apply across the entire UI:
- Hostel name, tagline, full address
- Manager / Warden name, contact phone & email
- Emergency hotline, total floors, washing machine count

Click **"Save & Apply Hostel Details"** — the navbar, SOS modal, hero section, and footer all update in real time.

> **First-time setup:** The database seeds with fictional demo data (`StayEase Demo Hostel`). Update your real hostel details here — changes persist to both `localStorage` and the SQLite backend.

### 📜 Rules & Curfew Editor
- **Add** a rule by typing and pressing "Add Rule"
- **Delete** any rule with the trash icon
- Rules appear on the public-facing rules section

### 🛏️ Room & Bed Management
Click **"+ Add New Room"** to open the creation form:

| Field | Description |
|-------|-------------|
| Room Number | e.g. `301` |
| Floor | Floor number |
| Category | Single / Double / Triple / Dormitory |
| AC | Toggle |
| Price/Month | Rent in ₹ |
| Security Deposit | Deposit in ₹ |
| Total Beds | Beds auto-named `301-A`, `301-B`, etc. |
| Amenities | Comma-separated (e.g. `WiFi, Geyser, Study Desk`) |
| Photo URL | Any image URL (Unsplash recommended) |

- **Room Inventory Table** — view all rooms with per-room bed visualization
- **Delete Room** removes the room and all its beds

### 🎯 One-Click Preset Templates

| Preset | Description |
|--------|-------------|
| 🎓 **College** | University Campus Hostel — strict curfew, study quiet hours |
| 💼 **Professional** | Executive Co-Living — 24/7 keycard access, no curfew |
| 👩 **Women** | Women Residence — biometric entry, full CCTV, visitor restrictions |

### 🔄 JSON Backup & Import
- **Export:** Copies full hostel config + rooms as a JSON blob — paste into a file to save a snapshot
- **Import:** Paste previously exported JSON → **"Apply & Overwrite"** to restore instantly

---

## 🌐 Backend API Reference

Base URL: `http://localhost:5000/api`

### Health Check
```
GET  /api/health
```

### Hostel Details
```
GET  /api/hostel                  → Full hostel profile
PUT  /api/hostel                  → Update hostel details (partial update supported)
```

### Rooms & Beds
```
GET  /api/rooms                   → All rooms with attached beds
GET  /api/rooms?floor=2           → Filter by floor number
GET  /api/rooms?ac=true           → Filter by AC availability
GET  /api/rooms?category=single   → Filter by room category
GET  /api/rooms/:id               → Single room detail
POST /api/rooms                   → Create room + beds (atomic transaction)
PUT  /api/rooms/:id               → Update room details (partial update safe)
DEL  /api/rooms/:id               → Delete room and all its beds

GET  /api/rooms/:id/beds          → All beds for a specific room
POST /api/rooms/:id/beds          → Add a bed to a room
PUT  /api/beds/:id                → Update a bed — partial update safe, won't wipe tenant data
DEL  /api/beds/:id                → Delete a bed by primary key
```

### Maintenance Tickets
```
GET  /api/tickets                 → All tickets
POST /api/tickets                 → Create ticket (ID: crypto.randomUUID — collision-free)
PUT  /api/tickets/:id             → Update ticket status or priority
DEL  /api/tickets/:id             → Delete a ticket
```

### Notices
```
GET  /api/notices                 → All notices
POST /api/notices                 → Create a notice
PUT  /api/notices/:id             → Update a notice
DEL  /api/notices/:id             → Delete a notice
```

### Expenses
```
GET  /api/expenses                → All expense records
POST /api/expenses                → Log a new expense
DEL  /api/expenses/:id            → Remove an expense entry
```

### Visitors
```
GET  /api/visitors                → All visitor records
POST /api/visitors                → Check in visitor (ID: crypto.randomUUID)
PUT  /api/visitors/:id/checkout   → Record visitor exit time
```

### Bookings
```
GET  /api/bookings                → All room booking requests
POST /api/bookings                → Submit a new booking request
PUT  /api/bookings/:id            → Approve or reject a booking
```

### Reviews & Menu & Staff
```
GET  /api/reviews                 → All tenant reviews
POST /api/reviews                 → Submit a new review

GET  /api/menu                    → Weekly mess menu
PUT  /api/menu/:day               → Update a specific day's menu

GET  /api/staff                   → Staff roster
POST /api/staff                   → Add a new staff member
```

### Dashboard Statistics
```
GET  /api/stats                   → Aggregated occupancy, revenue, ticket stats
```

---

## 🔧 Frontend Build Process

The frontend uses JSX which browsers cannot run natively. `scripts/build.js` uses `@babel/core` to transpile `app.js` → `app.compiled.js`.

### One-shot build
```bash
npm run build
```

### Watch mode (auto-rebuilds on every save)
```bash
npm run build:watch
```

> ⚠️ **Always run `npm run build` after editing `app.js`** — the browser loads `app.compiled.js`, not `app.js` directly. `npm run dev` handles this automatically in the background.

### Why not use `<script type="text/babel">`?

Loading remote Babel transpilation in a `file://` context is blocked by browser CORS policies. Pre-compiling works without a dev server and keeps page load fast.

---

## 🔒 Environment Variables

File: `backend/.env` — copy from `backend/.env.example`. **Never committed to git.**

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Port the Express API listens on |
| `CORS_ORIGIN` | `*` | Allowed CORS origins — restrict to your domain in production |
| `DB_PATH` | `./hostel.db` | SQLite database path (relative to `backend/`) |

---

## 💾 Data Persistence

The app uses a **two-tier persistence** model:

```
React State ←──── localStorage ←──── Saved on every state change
     │
     └──── Backend Sync (on app load, if online)
                   │
              Express API
                   │
              SQLite (hostel.db)
                   │
              PRAGMA foreign_keys = ON  ← referential integrity enforced
```

1. **localStorage** — instant saves, works offline, survives page refresh
2. **SQLite via API** — durable server-side storage, synced on app mount
3. **Graceful fallback** — if backend is unreachable, errors are caught silently and the app continues with localStorage data

### Reset frontend data to defaults

Run in browser DevTools console:
```js
Object.keys(localStorage)
  .filter(k => k.startsWith('stayease_'))
  .forEach(k => localStorage.removeItem(k));
location.reload();
```

### Reset database to defaults

Delete `backend/hostel.db` and restart the backend — it re-seeds fresh demo data automatically on next launch.

---

## 🎨 Customization Guide

### Change Default Hostel Details

The quickest way is the **Admin Settings tab** in the UI (no code required). For code-level defaults, edit `INITIAL_HOSTEL` in `app.js`, then rebuild:

```js
const INITIAL_HOSTEL = {
  name: 'Your Hostel Name',
  tagline: 'Your tagline here',
  address: 'Your full address',
  contactPhone: '+91 XXXXX XXXXX',
  managerName: 'Warden Name',
  emergencyPhone: '+91 XXXXX XXXXX',
  totalFloors: 4,
  washingMachines: 8,
  rules: ['Rule 1', 'Rule 2']
};
```

### Add a New Preset Template

Extend `HOSTEL_TEMPLATES` in `app.js`:
```js
const HOSTEL_TEMPLATES = {
  // ...existing presets...
  MY_PRESET: {
    name: 'My Custom Hostel',
    tagline: 'Custom tagline',
    rules: ['Custom Rule 1', 'Custom Rule 2']
  }
};
```

### Change Brand Colors

Edit the Tailwind config inside `index.html`:
```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#your-primary-color',
          600: '#your-darker-shade'
        }
      }
    }
  }
}
```

### Add a New API Route

1. Add the route handler in `backend/server.js`
2. Add the client method to `StayEaseApi` in `api.js`
3. Call `StayEaseApi.yourMethod()` from React components in `app.js`
4. Run `npm run build`

---

## 📝 npm Scripts Reference

```bash
# From project root:
npm run dev          # Start backend (nodemon) + auto-rebuild frontend on app.js changes
npm run build        # Compile app.js → app.compiled.js (one-shot)
npm run build:watch  # Compile app.js → app.compiled.js (watch mode)
npm start            # Start backend in production mode (no nodemon)
npm test             # Run backend API integration tests (backend/test-api.js)
```

---

## 🗂 Key Files Quick Reference

| File | Purpose |
|------|---------|
| `app.js` | All React UI — **edit this to change the frontend** |
| `api.js` | `StayEaseApi` client — bridges frontend ↔ backend |
| `index.html` | App shell, Tailwind config, CDN script tags |
| `scripts/build.js` | Babel build script (JSX → plain JS) |
| `scripts/dev.js` | Dev runner (backend + build watcher) |
| `babel.config.json` | Babel preset configuration |
| `backend/server.js` | All REST API route handlers |
| `backend/database.js` | SQLite schema, seed data, async query helpers |
| `backend/.env.example` | Environment variable template |
| `backend/test-api.js` | Full API integration test suite |

> `app.compiled.js` and `backend/hostel.db` are generated at runtime and are **not tracked in git**.

---

*Built with ❤️ for hostel owners, managers, and residents.*
