# ExpenseAI 💰

ExpenseAI is an AI-powered expense tracker: track transactions, set budgets, organize spending by category, and get AI-generated insights on your finances. This repo is a monorepo containing the backend API, the web app, the marketing site, and the mobile app.

## Structure

| Folder    | What it is                                                                             |
| --------- | -------------------------------------------------------------------------------------- |
| `server/` | Express + MongoDB API (auth, transactions, budgets, categories, accounts, AI insights) |
| `client/` | The web app (React + Vite) — this is the product                                       |
| `web/`    | Public marketing/landing page (Next.js)                                                |
| `mobile/` | Mobile app (Expo / React Native)                                                       |

See `PRD.md` for what's built and planned, `ARCHITECTURE.md` for stack/data-model/API detail, `Phases.md` for the roadmap, and `Design.md` for the shared design system.

## Quick start

```bash
# Backend
cd server && npm install
cp .env.example .env   # fill in Mongo URI, JWT secret, AI provider keys
npm run dev

# Web app
cd client && npm install && npm run dev

# Marketing site
cd web && npm install && npm run dev

# Mobile
cd mobile && npm install && npm start
```

---

## 🛠️ Git Workflow Guide

To maintain code stability and ensure smooth deployments, we follow a strict branching strategy:

- The `main` branch represents our stable production environment.
- Feature implementation, bug fixes, and active coding happen on the `dev` branch.

Follow these procedures for making changes and pushing code safely.

### 1. Daily Development Workflow

Always run feature implementations, bug fixes, and styling updates on the `dev` branch.

```bash
# Switch to the development branch
git checkout dev

# ... Make your code changes / additions here ...

# Stage all modified and new files
git add .

# Commit changes with a clear, descriptive message
git commit -m "feat: add savings tips ledger styling"

# Push the updates to the remote development branch
git push origin dev
```
