# ARCHITECTURE

## Stack per app

| App       | Framework                      | Styling                            | Data fetching                       | Notes                                                             |
| --------- | ------------------------------ | ---------------------------------- | ----------------------------------- | ----------------------------------------------------------------- |
| `server/` | Express 5 (ESM)                | —                                  | Mongoose 9 / MongoDB                | JWT auth via httpOnly cookie, `cors` locked to configured origins |
| `client/` | React 19 + Vite                | Tailwind v4, CSS vars              | TanStack Query, axios               | React Router 7, this is the primary product UI                    |
| `web/`    | Next.js                        | Tailwind v4, CSS vars              | —                                   | Marketing/landing page only, no app logic                         |
| `mobile/` | Expo SDK 57, React Native 0.86 | React Native styles / theme colors | custom `services/api` + query hooks | Expo Router file-based routing under `src/app/`                   |

## Backend structure (`server/`)

```
server/
├── app.js            # Express app, CORS, route mounting
├── server.js          # entrypoint
├── config/            # DB connection, env-driven config
├── models/            # Mongoose schemas
├── controllers/        # request handlers
├── routes/             # route definitions, all gated by protect() except auth
├── middleware/          # auth (JWT), rate limiting
└── utils/               # seeding, backfill scripts
```

### Data models

| Model         | Key fields                                                                                                                                      | Notes                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `User`        | username, email, passwordHash, currency, `aiInsightPlan` (basic/personal/premium)                                                               | Password hashed via bcrypt pre-save hook                                                                        |
| `Account`     | userId, name, type (bank/credit/cash/investment), balance, currency                                                                             | A financial account for transaction attribution — **not** the Phase 2 personal/business profile concept         |
| `Category`    | userId, name, type (income/expense), icon, color, isDefault, parentId, ancestors, autoCategorizationRules                                       | Hierarchical via materialized `ancestors` path; circular-reference guarded in pre-save hook                     |
| `Transaction` | userId, accountId, categoryId, amount, type, description, merchant, tags, notes, transactionDate, recurring, recurringFrequency, nextOccurrence | Amount rounded to 2 decimals via schema setter                                                                  |
| `Budget`      | userId, name, categoryIds[], amount, spent, period (weekly/monthly/quarterly), startDate, alertThreshold, isAlertSent                           | Multi-category budgets supported                                                                                |
| `Insight`     | userId, insight_type (monthly_summary/savings_tips/budget_alert), content_json, health_score, created_at                                        | Custom collection name `insights`, manual timestamps, has static helpers (`getLatestByType`, `getByUser`, etc.) |

### API surface

All routes below are mounted under `/api` and require auth (`protect` middleware) unless marked public.

**`/api/auth`**

- `POST /register` _(public)_
- `POST /login` _(public)_
- `GET /me`
- `POST /logout`

**`/api/accounts`**

- `GET /`, `POST /`
- `PUT /:id`, `DELETE /:id`

**`/api/category`**

- `GET /`, `POST /`
- `PUT /:id`, `DELETE /:id`

**`/api/transactions`**

- `GET /`, `POST /`
- `GET /:id`, `PUT /:id`, `DELETE /:id`
- `POST /bulk-delete`
- `GET /export-csv`
- `GET /trend`
- `GET /recent`

**`/api/budgets`**

- `GET /`, `POST /`
- `GET /:id`, `PUT /:id`, `DELETE /:id`

**`/api/dashboard`**

- `GET /month-summary`
- `GET /month-trends`
- `GET /category-breakdown`

**`/api/insight`**

- `GET /recent`
- `POST /generate` _(rate-limited via `aiRateLimiter`)_
- `GET /latest/:type`
- `GET /eligibility`

## Frontend structure (`client/`)

```
client/src/
├── pages/            # route-level pages (Dashboard, Transactions, Budgets, Categories, Insight, Login, Register)
├── features/          # feature-scoped logic: Accounts, AiInsights, Authentication, Budgets, Categories, Dashboard, Transactions
├── components/         # shared UI (Sidebar, TopBar, KpiCard, charts/, transactions/, ui/)
├── services/            # axios API clients (apiAuth, apiAccounts, apiTransaction, apiBudget, apiCategories, apiDashboard, apiInsights)
└── utils/                 # authToken, axios instance, formatting, icon map
```

## Mobile structure (`mobile/`)

```
mobile/src/
├── app/                # Expo Router screens: (tabs)/, sign-in, sign-up, _layout
├── components/           # Card, KpiCard, BudgetProgress, TransactionList, chart components
├── services/api/          # API client layer
├── hooks/queries/           # data-fetching hooks
├── state/                    # app shell state
├── theme/                      # colors, theme hook
└── data/mockAppData.ts          # mock data still used by some screens (see STATUS.md)
```

## Open questions for Phase 2

1. **Personal/business account model** — does switching profiles swap the entire data context (separate transactions/budgets/categories per profile), or is it a filter/tag on otherwise shared data? This determines whether it's a `profileType` field on `User` or a new `Workspace` model that `Transaction`/`Budget`/`Category`/`Account` all reference alongside `userId`.
2. **Payment provider** — Stripe is the default assumption in `Phases.md`; confirm before building webhook handlers and plan-sync logic.
3. **Mobile parity** — several mobile screens still read from `mockAppData.ts` rather than the live API; decide whether Phase 2 work should also close that gap.
