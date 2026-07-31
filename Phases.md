# ExpenseAI Development Phases

> This file previously described Phase 1 as "Multi-Account Support" as if not yet built. A codebase scan shows accounts, transactions, categories, budgets, dashboard, and AI insights are already implemented (see `Status.md`). This version replaces that with what's actually true, plus the plan going forward.

## Phase 1 — Core expense tracking ✅ Done

The foundation already built and running across `server/`, `client/`, `web/`, and `mobile/`:

- Auth (register/login/logout, JWT cookie sessions)
- Financial accounts (bank, credit, cash, investment) with balance and currency
- Transactions (income/expense, recurring, bulk delete, CSV export, trend views)
- Transaction filtering: type, category, account, date range, search, sort, recurring
- Categories (hierarchical, auto-categorization by merchant keyword)
- Budgets (multi-category, weekly/monthly/quarterly periods, alert thresholds)
- Dashboard (month summary, trends, category breakdown)
- AI-generated insights (monthly summary, savings tips, budget alerts) with plan-gated eligibility
- Marketing landing page (`web/`)
- Mobile app scaffold with core screens (`mobile/`)

Full detail: `Product.md` (Phase 1 section), `Architecture.md` (models/API), `Status.md` (per-module status).

---

## Phase 1.5 — Premium accounts & per-account dashboard ✅ Done (2026-07-31)

These features shipped on the `dev` branch as a focused iteration on top of Phase 1:

### Multi-account support for premium users

- **Account creation is now plan-gated** — `basic` plan users are limited to their one default "Personal Wallet" created on registration. Attempting to create a second account returns `403 PREMIUM_REQUIRED`. `personal` and `premium` plan users can create unlimited accounts.
- **Add Account modal** on the Dashboard: name, type (bank / cash / credit / investment), opening balance, and currency. Accessible only when the user is on a non-basic plan; shown as a locked/disabled button otherwise.
- **`useAccountActions` hook** — new React Query mutations for create, update, and delete accounts with toast feedback, exposed from `client/src/features/Accounts/useAccounts.js`.
- Full CRUD API functions (`createAccount`, `updateAccount`, `deleteAccount`) added to `client/src/services/apiAccounts.js`.

### Per-account dashboard tabs

- **Account switcher tab bar** at the top of the Dashboard — one pill tab per financial account (showing name + live balance), plus an "All Accounts" default tab.
- Switching tabs re-scopes all dashboard data: KPI cards (balance, income, expenses, savings rate), monthly trend chart, category breakdown chart, and recent transactions all reflect only the selected account.
- Backend: all three dashboard endpoints (`/api/dashboard/month-summary`, `/month-trends`, `/category-breakdown`) and `/api/transactions/recent` now accept an optional `?accountId=` query param to scope aggregations.
- Frontend: `useDashboardData(accountId)` and all `apiDashboard` functions forward the param; query cache keys are scoped per account so switching tabs never shows stale data from a different account.

### Recurring transaction filter

- **"Recurring" toggle button** in the Transactions filter bar — highlights in primary color when active, includes an inline × to clear. Syncs to/from the URL (`?recurring=true`).
- `useTransactions` and `useTransactionTrend` both accept and forward the `recurring` param.
- Backend `getTransactionTrend` now respects `?recurring=` (the main transactions list already did).

---

## Phase 2 — Payments & personal/business accounts (next)

### 1. Payment integration

**Objective**: Monetize via paid plans. The `User.aiInsightPlan` field (`basic`/`personal`/`premium`) already anticipates tiering — this phase adds real billing behind it. The Phase 1.5 account-creation gate (`PREMIUM_REQUIRED`) is the first live enforcement of this field.

**Likely scope**:

- Payment provider integration (Stripe is the common default — confirm before building)
- Subscription lifecycle: create, upgrade/downgrade, cancel, prorated billing
- Payment method management, invoice history
- Webhook handling for payment events
- Plan-gated feature checks reusing the existing `aiInsightPlan`-style pattern
- Pricing page on the marketing site (`web/`)

**New data needed**: subscription record, payment method record, invoice record, and a plans table/config — see `Architecture.md` for how these should relate to the existing `User` model.

### 2. Personal / business accounts (per user)

**Objective**: Let a user separate their personal finances from a small business, as its own workspace-level concept.

**Important — do not confuse with the existing `Account` model.** `server/models/AccountSchema.js` already represents financial accounts (bank/credit/cash/investment) used to attribute transactions. This feature is a different, higher-level concept: which "profile" (personal vs. business) a user is currently operating in.

**Open design decision (resolve before building — see `Architecture.md`)**:

- **Option A — tag on shared data**: add a `profileType` field to transactions/budgets/categories, filter by it. Simple, but doesn't scale to true separation (e.g. can't easily support a business having multiple team members later).
- **Option B — separate workspace model**: a `Workspace` (or `Profile`) document that `Transaction`/`Budget`/`Category`/`Account` all reference, in addition to `userId`. More flexible, more migration work.

**Likely scope once decided**:

- Profile creation/switching UI (personal/business selector)
- Scoping all existing queries (transactions, budgets, categories, accounts, dashboard, insights) to the active profile
- Migration path for existing users' data into a default "personal" profile

**Priority**: High  
**Estimated effort**: Medium (payments), Medium–High (profile separation, depending on Option A vs B)

---

## Phase 3 — Not yet decided

No commitment yet on what comes after Phase 2. Reasonable directions to consider, roughly in order of how naturally they follow from Phase 1 + 2:

1. **Advanced analytics & reporting** — custom date-range reports, budget-vs-actual, income vs. expense breakdown, PDF/CSV export, scheduled email reports, net worth over time. Natural next step since the data model (transactions/budgets/categories) already supports richer aggregation than the current dashboard exposes.
2. **Bank sync** (e.g. via Plaid) — auto-import transactions instead of manual entry. High value, but adds real compliance/security surface area; probably sequenced after payments are stable.
3. **Receipt scanning / OCR** — photo-to-transaction, reduces manual entry friction, pairs well with the mobile app.
4. **Shared/family budgeting** — natural extension of the Phase 2 workspace concept if Option B (separate workspace model) is chosen; a "business" workspace with multiple members isn't far from a "family" workspace.
5. **Predictive spending / goal-based savings** — leans on the existing AI insight infrastructure (`Insight` model, health score) rather than requiring new infrastructure.
6. **Mobile parity** — closing the gap noted in `Status.md` (some mobile screens still on mock data) so the mobile app has full feature parity with `client/`.
7. **Third-party API / integrations** — lowest priority until the core product and monetization are proven.

Pick and scope this phase once Phase 2 ships and usage data (or user feedback) points to which of the above matters most.

---

## Notes for AI agents

- Update this file when a phase's scope changes or a phase completes — an out-of-date `Phases.md` was the reason this rewrite was needed.
- Cross-check `Status.md` before assuming something isn't built yet.
- Follow `Design.md` for any new UI; follow the model/route conventions in `Architecture.md` for any new backend feature.
- Resolve the Phase 2 profile-model design decision (Option A vs B) explicitly before writing migration code — this affects every existing collection.
