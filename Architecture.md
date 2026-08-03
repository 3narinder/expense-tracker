# Architecture (Simple Overview)

## Apps in this repo

- `server/` — Node + Express API with MongoDB
- `client/` — main web app (React + Vite)
- `web/` — marketing site (Next.js)
- `mobile/` — mobile app (Expo / React Native)

## Core data model

- **User**
  - Auth identity, plan, preferred currency
  - Stores active profile: `personal` or `business`
- **Account**
  - Financial accounts (bank, cash, credit, investment)
  - Scoped by user + profile
- **Transaction**
  - Income/expense records
  - Scoped by user + profile
- **Category**
  - Default categories + user custom categories
  - Custom categories are scoped by user + profile
- **Budget**
  - Budget limits and usage
  - Scoped by user + profile
- **Insight**
  - AI-generated insight history
  - Scoped by user + profile

## Important separation rule

Personal and business data are isolated by profile scope.

When user switches profile:
- transactions change
- budgets change
- categories change
- dashboard metrics change
- insights change

This avoids data mixing and user confusion.

## API groups

All routes are under `/api`.

- `/auth` — register, login, me, logout, set active profile
- `/accounts` — account CRUD
- `/transactions` — transaction CRUD, trend, export, recent
- `/category` — category CRUD
- `/budgets` — budget CRUD
- `/dashboard` — summary, trends, category breakdown
- `/insight` — generate insight, history, eligibility

## Security model

- JWT auth
- Protected routes require authenticated user
- Queries are always scoped to the authenticated user
- Profile scope (`personal`/`business`) is resolved per request

## Current architecture direction

- Keep profile-scoped isolation stable
- Add billing/subscriptions next
- Later (optional): move from profile tagging to full workspace model if multi-user collaboration is needed
