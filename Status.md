## Status

Snapshot of what's actually built vs. planned, based on a scan of the codebase. Update this whenever a feature moves from planned → in progress → done, so it doesn't drift like `Phases.md` did before this update.

## Backend (`server/`)

| Module                                                                              | Status                   |
| ----------------------------------------------------------------------------------- | ------------------------ |
| Auth (register/login/me/logout, JWT cookie)                                         | ✅ Done                  |
| Accounts (bank/credit/cash/investment) — CRUD                                       | ✅ Done                  |
| **Account creation premium gate** (basic plan limited to 1 account)                 | ✅ Done                  |
| **Dashboard endpoints accept `?accountId=`** (scope KPIs/trends/breakdown per acct) | ✅ Done                  |
| **`GET /transactions/recent` accepts `?accountId=`**                                | ✅ Done                  |
| **`GET /transactions/trend` accepts `recurring` filter**                            | ✅ Done                  |
| Categories (hierarchical, auto-categorization by merchant)                          | ✅ Done                  |
| Transactions (CRUD, recurring, bulk delete, CSV export, trends)                     | ✅ Done                  |
| Transaction `recurring` filter on `GET /transactions`                               | ✅ Done                  |
| Budgets (multi-category, period, alert threshold)                                   | ✅ Done                  |
| Dashboard (month summary/trends/category breakdown)                                 | ✅ Done                  |
| AI Insights (generation, rate limiting, plan eligibility)                           | ✅ Done                  |
| Personal/business profile separation (profile-scoped data + active-profile switch)  | ✅ Done                  |
| Payment/subscription billing                                                        | ⬜ Not started — Phase 2 |

## Web app (`client/`)

| Area                                                                             | Status                   |
| -------------------------------------------------------------------------------- | ------------------------ |
| Auth pages (Login, Register)                                                     | ✅ Done                  |
| Dashboard                                                                        | ✅ Done                  |
| **Dashboard — account switcher tabs** (one tab per account + "All Accounts")     | ✅ Done                  |
| **Dashboard — per-account KPIs, trends, category breakdown, recent txns**        | ✅ Done                  |
| **Dashboard — Add Account modal** (premium-only; locked/disabled for basic plan) | ✅ Done                  |
| Transactions                                                                     | ✅ Done                  |
| **Transactions — Recurring filter toggle**                                       | ✅ Done                  |
| Budgets                                                                          | ✅ Done                  |
| Categories                                                                       | ✅ Done                  |
| Accounts feature (read)                                                          | ✅ Done                  |
| **Accounts feature** (create / update / delete mutations + `useAccountActions`)  | ✅ Done                  |
| AI Insights                                                                      | ✅ Done                  |
| Personal/business profile switcher (TopBar + profile-scoped query caches)        | ✅ Done                  |
| Dark mode (ThemeToggle)                                                          | ✅ Present               |
| Billing/subscription UI                                                          | ⬜ Not started — Phase 2 |

## Marketing site (`web/`)

| Area                                                                                                  | Status                                                              |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Landing page (Hero, Features, AI/Budget/Transaction/Analytics sections, Testimonials, FAQ, Final CTA) | ✅ Done                                                             |
| Shared design docs (`web/docs/DESIGN.md`, `web/docs/CHANGELOG.md`)                                    | ✅ Present — kept as the web-specific extension of root `Design.md` |
| Pricing page                                                                                          | ⬜ Not started — Phase 2                                            |

## Mobile (`mobile/`)

| Area                                                                                      | Status                                                              |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Screens: dashboard, transactions, budget progress, category/trend charts, sign-in/sign-up | ✅ Scaffolded                                                       |
| Live API wiring                                                                           | ⚠️ Partial — some screens still read from `src/data/mockAppData.ts` |
| Feature parity with `client/` (categories, accounts management)                           | ⬜ Not started                                                      |

## Known naming note

The existing `Account` model remains the financial-account entity (bank/credit/cash/investment). Personal/business separation is implemented via `profileType` scope, not by replacing financial accounts.
