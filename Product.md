# PRD — ExpenseAI

## Vision

ExpenseAI turns raw transactions into a clear picture of a person's finances — budgets that track themselves, categories they control, and AI-generated summaries that surface what actually matters each month.

## Target users

Individuals who want a lightweight, fast expense tracker with AI-assisted insight — not a full accounting suite. Phase 2 extends this toward small business/personal-finance separation for users who manage both.

## Product surface

- **`client/`** — the web app itself: auth, dashboard (with per-account tabs), transactions, budgets, categories, accounts, AI insights.
- **`mobile/`** — companion mobile app (Expo) mirroring core dashboard/transaction/budget views.
- **`web/`** — public marketing/landing site.
- **`server/`** — shared API and data layer behind all of the above.

---

## Phase 1 — Core expense tracking ✅ Done

This is the feature set already implemented in this repo.

**Auth**

- Email/username + password registration and login, JWT (cookie-based) sessions, `GET /me`, logout.
- On registration, a default "Personal Wallet" account is automatically created for the user.

**Accounts** (financial accounts, not user profiles — see naming note below)

- Users can create named accounts of type bank / credit / cash / investment, each with its own balance and currency, and attach transactions to a specific account.
- **Account creation is plan-gated**: `basic` plan users are limited to 1 account (their default Personal Wallet). `personal` and `premium` plan users can create unlimited accounts.

**Transactions**

- Income/expense entries with amount, category, account, merchant, tags, notes, date.
- Recurring transactions (daily/weekly/monthly/yearly) with a `nextOccurrence` field.
- Bulk delete, CSV export, trend and "recent" views.
- Filtering: type (income/expense), category, account, date range, text search, sort, **recurring toggle**.

**Categories**

- Income/expense categories, hierarchical (parent/child via materialized `ancestors` path), default system categories plus user-created ones.
- Auto-categorization by merchant keyword.

**Budgets**

- Per-category (or multi-category) budgets on a weekly/monthly/quarterly period, with an alert threshold and spent tracking.

**Dashboard**

- Month summary, month-over-month trends, category breakdown.
- **Account switcher tabs**: switch between "All Accounts" and any individual account; all KPI cards, charts, and recent transactions re-scope to the selected account.
- **Add Account** button in the tab bar (premium users only; locked for basic).

**AI Insights**

- Generated insights (monthly summary, savings tips, budget alerts) with a health score, rate-limited generation, plan-gated eligibility (`basic` / `personal` / `premium` on the user).

**Marketing site (`web/`)**

- Landing page: hero, feature sections (AI, budgets, transactions, analytics), testimonials, FAQ, final CTA — built on the shared design system in `Design.md`.

**Mobile (`mobile/`)**

- Dashboard, transaction list, budget progress, category breakdown chart, monthly trend chart, sign-in/sign-up — currently wired against mock data (`mobile/src/data/mockAppData.ts`), not yet fully connected to the live API in every screen.

---

## Phase 2 — Payments + personal/business accounts (next)

**1. Payment integration**

- Add paid subscription tiers (the `User.aiInsightPlan` field — `basic`/`personal`/`premium` — already anticipates this; there's no billing behind it yet). The Phase 1 account-creation gate (`PREMIUM_REQUIRED`) is the first live enforcement of this field.
- Payment provider integration (e.g. Stripe): checkout, subscription lifecycle (upgrade/downgrade/cancel), invoices, webhook handling for payment events.
- Plan-gated features should key off the same `aiInsightPlan`-style field rather than inventing a second flag.
- Add a Pricing page to the marketing site.

**2. Personal vs. business accounts (user-level, not the existing `Account` model)**

- This is a **workspace/profile-type** concept — e.g. "I use ExpenseAI for my personal spending and separately for my small business" — distinct from the existing `Account` model (which represents a bank/credit/cash account for transaction attribution).
- Needs its own concept, e.g. a `profileType` on `User` (`personal` / `business`) or a separate `Workspace`/`Organization` model if a business profile should support more than one member later.
- Decide before building: does a user switch between two fully separate transaction/budget/category spaces, or is it a tag on shared data? This changes the data model significantly — see `Architecture.md` open question.

## Phase 3 — Not yet decided

See `Phases.md` for a proposed set of options (analytics/reporting, bank sync, receipt OCR, shared/family budgeting, etc.) to choose from once Phase 2 ships.
