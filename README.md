# Expense Tracker 💰

Welcome to the Expense Tracker repository. To maintain code stability and ensure smooth deployments, we follow a strict branching strategy:
* The `main` branch represents our stable production environment.
* Feature implementation, bug fixes, and active coding happen on the `dev` branch.

---

## 🛠️ Git Workflow Guide

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
