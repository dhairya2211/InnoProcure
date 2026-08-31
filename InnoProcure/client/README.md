# InnoProcure — Government to Startup Innovation Procurement & Piloting Platform

[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3-38bdf8.svg)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7.18-red.svg)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/Compliance-GFR_2017_Rule_194-emerald.svg)](https://doe.gov.in/)

**InnoProcure** is a structured government-to-startup procurement and piloting platform designed for the Indian public sector innovation ecosystem.

It bridges the gap between public sector demand and startup technical innovation:
> **Government Problem Statement** → **Procurement Challenge** → **Startup Proposal** → **Evaluator Rubric Scoring** → **Shortlist** → **Tripartite Pilot Agreement** → **Milestone Verification** → **Payment Release Status** → **Final Go/No-Go Scale-Up Decision** → **Public Transparency View**

---

## 🚀 Quick Start — How to Run Locally

### Prerequisites
Make sure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

```bash
node -v
npm -v
```

### 1. Clone the Repository & Navigate to Directory
```bash
git clone <repository-url>
cd InnoProcure
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Local Development Server
```bash
npm run dev
```

After running the command, Vite will launch the application locally (typically at `http://localhost:5173` or `http://localhost:5174`). Open the URL in your web browser.

### 4. Build for Production
To build the production bundle:
```bash
npm run build
```

To preview the built production bundle locally:
```bash
npm run preview
```

---

## 🎭 How to Demo the Complete Procurement Flow

InnoProcure features a **Hackathon Demo Header Banner** at the top of the screen that allows instant role switching without logging out:

### Available Roles & Test Accounts

| Role | Demo User | Department / Organization | Key Workflow Capabilities |
|---|---|---|---|
| 🏛️ **Government Officer** | Rajesh V. Sharma | Ministry of Housing & Urban Affairs (MoHUA) | Create challenges (3-step wizard + AI target structurer), review proposals, execute final Go/No-Go scale-up orders. |
| 📊 **Technical Evaluator** | Dr. Ananya Sen | Department of Water Resources / IIT Delhi | Score proposals against 5-criterion rubric (100 pts), sign conflict-of-interest, shortlist startup, verify milestone evidence. |
| 🏢 **Startup Founder** | Vikramaditya Kulkarni | AquaSensing Tech Pvt Ltd (DPIIT-89241) | Manage profile, discover challenges, submit technical proposals, upload milestone evidence documents. |
| ⚙️ **System Admin** | Suresh Ramanathan | National Informatics Centre (NIC) | Provision user accounts, assign roles, monitor national challenge registries, and view global system audit logs. |
| 🌐 **Public Transparency Portal** | *Unauthenticated Public* | Public Read-Only View | View challenge goals, outcome targets, milestone verification progress, and scale-up decisions (protecting startup IP). |

### 🔄 End-to-End Demo Step-by-Step Walkthrough

1. **Login Page**: Open `http://localhost:5173/`. Click any of the 4 demo account cards to log in instantly.
2. **Government Officer**: Click `+ Create Challenge` → Fill out the 3-step wizard (try the **✨ AI Auto-Structure Target** button).
3. **Startup Founder**: Switch role to **Startup** → Click **Browse Challenges** → Select a challenge and click **Submit Proposal**.
4. **Technical Evaluator**: Switch role to **Evaluator** → Click **Score Proposals** → Evaluate using the 5-criterion rubric (100 pts), tick the **Conflict of Interest Sign-off**, and submit.
5. **Shortlist & Contract**: Click **Shortlist Startup** → Select the winning candidate → Click **Shortlist & Initiate Pilot** to view the auto-generated **Tripartite Pilot Agreement**.
6. **Milestone Audit & Payment**: Click **Verify Milestones** → Inspect submitted evidence → Click **Mark VERIFIED** → Click **Release Milestone Payment**.
7. **Government Final Order**: Switch back to **Govt Officer** → Open **Final Decision** → Review promised vs achieved metrics → Select **APPROVE & SCALE-UP**.
8. **Public Transparency Portal**: Click **🌐 Public View** in the top header banner to view the public-facing audit view of the challenge.

---

## 🛠️ Technology Stack

- **Core**: React 19, JavaScript (JSX), Vite 8
- **Routing**: React Router DOM v7
- **Styling**: Vanilla CSS, Tailwind CSS v4, Google Fonts (*Plus Jakarta Sans* & *Inter*)
- **State Management**: Centralized React Context (`AppContext.jsx`) with `localStorage` persistence and event audit loggers
- **Service Abstraction**: Modular service layer in `src/services/` for seamless future backend API integration

---

## 📂 Project Architecture

```text
InnoProcure/
├── public/                     # Static assets & icons
├── src/
│   ├── components/
│   │   ├── DemoHeaderBanner.jsx # Instant role-switcher banner for hackathon presentations
│   │   ├── Navbar.jsx           # Portal header with notification alerts & public view toggle
│   │   ├── StatusBadge.jsx      # Public sector procurement status badges
│   │   ├── Logo.jsx             # Official platform emblem logo
│   │   ├── DashboardLayout.jsx  # Responsive layout container with sidebars
│   │   ├── PilotAgreementModal.jsx # Formal pilot contract document modal
│   │   └── sidebars/            # Role-specific sidebar navigation menus
│   ├── context/
│   │   └── AppContext.jsx       # Central state store with localStorage persistence
│   ├── data/
│   │   └── mockData.js          # Realistic seed data (MoHUA, BWSSB, BMC, Indian Startups)
│   ├── services/                # Modular API service abstraction layer
│   │   ├── challengeService.js
│   │   ├── applicationService.js
│   │   ├── pilotService.js
│   │   ├── userService.js
│   │   └── activityService.js
│   ├── pages/
│   │   ├── auth/                # Login & demo account selector
│   │   ├── government/          # Officer dashboard, creation wizard, details, final decision
│   │   ├── evaluator/           # Evaluator dashboard, rubric scoring, shortlist, milestone audit
│   │   ├── startup/             # Startup dashboard, challenge discovery, proposal submission, profile, milestones
│   │   ├── admin/               # User provisioning, challenge registry, analytics, settings
│   │   └── public/              # Public transparency portal
│   ├── App.jsx                  # Root App wrapped in AppProvider
│   ├── main.jsx                 # Entry point
│   ├── index.css                # Global styles & Tailwind CSS v4 import
│   └── routes/
│       └── AppRoutes.jsx        # React Router routes
├── help.md                      # Detailed Backend Integration Guide & REST API Specifications
├── package.json
├── vite.config.js
└── README.md
```

---

## 📘 Backend Integration Handoff (`help.md`)

For backend developers who will build real REST APIs or database models:
Check the included [help.md](help.md) file. It contains:
- Complete entity schemas and ER diagrams
- REST API endpoint contracts with JSON request/response examples
- Status enum definitions
- Auth & role authorization rules
- Step-by-step instructions to replace mock services in `src/services/`
- PostgreSQL relational database schema SQL scripts

---

## 📜 Compliance & Guidelines

Designed in alignment with:
- **General Financial Rules (GFR 2017) Rule 194**: Special provisions for small-batch innovation piloting and post-pilot direct scale-up procurement.
- **DPIIT Startup Recognition Standards**: Integration for verified startup identification numbers.

---

## 📄 License

This project is licensed under the MIT License — created for the InnoProcure Hackathon.
