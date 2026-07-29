# AGENTS.md

ExpenseAI is an AI-powered expense tracking product: a Node/Express + MongoDB API, a React (Vite) web app, a Next.js marketing site, and an Expo/React Native mobile app, all in one repo.

Read this file before making changes anywhere in the repo. Each sub-app has its own `AGENTS.md` with rules specific to that app — read the relevant one too before working inside `client/`, `server/`, `web/`, or `mobile/`.

## Repo map

| Path              | What it is                                                                               | Stack                                                     |
| ----------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `server/`         | REST API, auth, DB models, AI insight generation                                         | Node, Express 5, Mongoose, JWT                            |
| `client/`         | The actual product — dashboard, transactions, budgets, categories, accounts, AI insights | React 19, Vite, Tailwind v4, TanStack Query, React Router |
| `web/`            | Public marketing / landing page                                                          | Next.js, Tailwind v4                                      |
| `mobile/`         | Mobile app                                                                               | Expo (SDK 57), Expo Router, React Native 0.86             |
| `Design.md`       | Shared design tokens/system (colors, type, spacing) used by `client/` and `web/`         | —                                                         |
| `PRD.md`          | Product requirements: current features, target users, roadmap                            | —                                                         |
| `ARCHITECTURE.md` | Data models, API surface, folder structure across all four apps                          | —                                                         |
| `Phases.md`       | Build phases (Phase 1 done, Phase 2 in planning, Phase 3 proposed)                       | —                                                         |
| `STATUS.md`       | Snapshot of what's built vs. planned, per module                                         | —                                                         |

## Conventions that apply everywhere

- Auth is JWT-based, issued by `server/controllers/authController.js`, checked by `server/middleware/auth.middleware.js`. Every new API route must sit behind `protect` unless it's genuinely public (register/login only).
- Every Mongoose model scopes data by `userId`. Any new collection needs a `userId` field and an index on it — this repo has no multi-tenant/shared data model yet (see `Phases.md` Phase 2 for the planned personal/business account split).
- Money fields are stored as rounded 2-decimal numbers (`set: (v) => Math.round(v * 100) / 100`) — follow this pattern for any new currency field.
- `client/` and `web/` share one design-token language (CSS variables in `@theme`/`:root`, Tailwind v4 syntax like `bg-linear-to-*` not `bg-gradient-to-*`). Never hardcode colors — see `Design.md`.
- Don't confuse the existing `Account` model (`server/models/AccountSchema.js` — a user's bank/credit/cash/investment account, for transaction attribution) with the "personal vs. business" account/profile concept planned for Phase 2 (a workspace-level distinction on the `User`, not a transaction-level one). These are different concerns; name the new one accordingly (e.g. `profileType` or a separate `Workspace`/`Organization` model) to avoid collisions.

## Commands

```bash
# Backend
cd server && npm run dev        # nodemon, needs server/.env (Mongo URI, JWT secret, AI keys)
cd server && npm run seed       # seed sample data

# Web app (the product)
cd client && npm run dev        # Vite dev server, http://localhost:5173

# Marketing site
cd web && npm run dev           # Next.js dev server

# Mobile
cd mobile && npm run start      # Expo start
```

## Docs to keep in sync

When you add or change an API route, a data model, or a major feature: update `ARCHITECTURE.md` (routes/models table) and `STATUS.md` (what's now done). When you complete or re-scope a phase, update `Phases.md`. Don't let these drift — an agent reading a stale `Phases.md` will plan against features that no longer match reality.
