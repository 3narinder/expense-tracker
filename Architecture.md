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

| Model         | Key fields                                                                                                                                      | Notes                                                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `User`        | username, email, passwordHash, currency, `aiInsightPlan` (basic/personal/premium)                                                               | Password hashed via bcrypt pre-save hook. `aiInsightPlan` gates premium features (e.g. multi-account creation).                                    |
| `Account`     | userId, name, type (bank/credit/cash/investment), balance, currency                                                                             | A financial account for transaction attribution — **not** the Phase 2 personal/business profile concept. `basic` users limited to 1 account.       |
| `Category`    | userId, name, type (income/expense), icon, color, isDefault, parentId, ancestors, autoCategorizationRules                                       | Hierarchical via materialized `ancestors` path; circular-reference guarded in pre-save hook                                                        |
| `Transaction` | userId, accountId, categoryId, amount, type, description, merchant, tags, notes, transactionDate, recurring, recurringFrequency, nextOccurrence | Amount rounded to 2 decimals via schema setter                                                                                                     |
| `Budget`      | userId, name, categoryIds[], amount, spent, period (weekly/monthly/quarterly), startDate, alertThreshold, isAlertSent                           | Multi-category budgets supported                                                                                                                   |
| `Insight`     | userId, insight_type (monthly_summary/savings_tips/budget_alert), content_json, health_score, created_at                                        | Custom collection name `insights`, manual timestamps, has static helpers (`getLatestByType`, `getByUser`, etc.)                                    |

### API surface

All routes below are mounted under `/api` and require auth (`protect` middleware) unless marked public.

**`/api/auth`**

- `POST /register` _(public)_ — creates user + default "Personal Wallet" account in a transaction
- `POST /login` _(public)_
- `GET /me`
- `POST /logout`

**`/api/accounts`**

- `GET /`, `POST /` — `POST` enforces plan gate: `basic` users blocked if they already have ≥1 account (`403 PREMIUM_REQUIRED`)
- `PUT /:id`, `DELETE /:id`

**`/api/category`**

- `GET /`, `POST /`
- `PUT /:id`, `DELETE /:id`

**`/api/transactions`**

- `GET /` — accepts `?type`, `?categoryId`, `?accountId`, `?startDate`, `?endDate`, `?search`, `?sort`, `?recurring`, `?page`, `?limit`
- `POST /`
- `GET /:id`, `PUT /:id`, `DELETE /:id`
- `POST /bulk-delete`
- `GET /export-csv`
- `GET /trend` — accepts same filters including `?recurring`
- `GET /recent` — accepts `?accountId`

**`/api/budgets`**

- `GET /`, `POST /`
- `GET /:id`, `PUT /:id`, `DELETE /:id`

**`/api/dashboard`**

- `GET /month-summary` — accepts `?accountId` to scope to one account
- `GET /month-trends` — accepts `?accountId`
- `GET /category-breakdown` — accepts `?accountId`

**`/api/insight`**

- `GET /recent`
- `POST /generate` _(rate-limited via `aiRateLimiter`)_
- `GET /latest/:type`
- `GET /eligibility`

## Frontend structure (`client/`)

```
client/src/
├── pages/            # route-level pages (Dashboard, Transactions, Budgets, Categories, Insight, Login, Register)
├── features/          # feature-scoped logic:
│   ├── Accounts/       # useAccounts (query) + useAccountActions (mutations: create/update/delete)
│   ├── AiInsights/
│   ├── Authentication/
│   ├── Budgets/
│   ├── Categories/
│   ├── Dashboard/      # useDashboardData(accountId) — scoped per selected account
│   └── Transactions/   # useTransactions + useTransactionTrend (both accept recurring filter)
├── components/         # shared UI (Sidebar, TopBar, KpiCard, charts/, transactions/, ui/)
│   └── transactions/
│       └── TransactionFilters.jsx  # includes recurring toggle button
├── services/            # axios API clients (apiAuth, apiAccounts, apiTransaction, apiBudget, apiCategories, apiDashboard, apiInsights)
└── utils/                 # authToken, axios instance, formatting, icon map
```

### Key frontend patterns

**Account-scoped dashboard**: `Dashboard.jsx` maintains `selectedAccountId` in state. The `AccountTabs` component renders one tab per account plus an "All Accounts" default. Selecting a tab passes `accountId` to `useDashboardData`, which re-fetches all four dashboard queries with account-scoped cache keys.

**Premium gate in UI**: The `isPremium` flag (`user.aiInsightPlan === 'premium' || 'personal'`) controls whether the "Add Account" button in `AccountTabs` is interactive or shown as a locked/disabled state.

**Recurring filter**: A toggle button in `TransactionFilters` sets `?recurring=true` in the URL. `useTransactions` and `useTransactionTrend` both read and forward this param to the API.

## Mobile structure (`mobile/`)

```
mobile/src/
├── app/                # Expo Router screens: (tabs)/, sign-in, sign-up, _layout
├── components/           # Card, KpiCard, BudgetProgress, TransactionList, chart components
├── services/api/          # API client layer
├── hooks/queries/           # data-fetching hooks
├── state/                    # app shell state
├── theme/                      # colors, theme hook
└── data/mockAppData.ts          # mock data still used by some screens (see Status.md)
```

## Open questions for Phase 2

1. **Personal/business account model** — does switching profiles swap the entire data context (separate transactions/budgets/categories per profile), or is it a filter/tag on otherwise shared data? This determines whether it's a `profileType` field on `User` or a new `Workspace` model that `Transaction`/`Budget`/`Category`/`Account` all reference alongside `userId`.
2. **Payment provider** — Stripe is the default assumption in `Phases.md`; confirm before building webhook handlers and plan-sync logic.
3. **Mobile parity** — several mobile screens still read from `mockAppData.ts` rather than the live API; decide whether Phase 2 work should also close that gap.
