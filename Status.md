# Product Status (Simple)

## Backend (`server/`)

### Done
- Auth (register, login, logout, me)
- Accounts CRUD
- Transactions CRUD + trend + export + bulk delete
- Categories CRUD
- Budgets CRUD
- Dashboard APIs (summary, trends, category split)
- AI insights (generate, history, eligibility, limits)
- Personal/business profile isolation across core data
- Active profile switching API

### Not started
- Billing/subscription payments

## Web app (`client/`)

### Done
- Auth pages
- Dashboard
- Transactions
- Categories
- Budgets
- AI Insights
- Account management
- Profile switch (personal/business)
- Profile-aware data loading (prevents mixed data)

### Not started
- Billing/subscription UI

## Marketing site (`web/`)

### Done
- Landing page

### Not started
- Pricing page

## Mobile app (`mobile/`)

### Done
- Basic app scaffold and screens

### Partial
- Some screens still use mock data

### Not started
- Full feature parity with web app

## Key note

Financial **Account** (bank/cash/credit) is different from personal/business **Profile**.
