---
trigger: always_on
---

# Project Context

Project Name: Commit or Quit
Type: Frontend-only portfolio project
Goal: Fun, Git-inspired life version control web app
Scope: No backend, no authentication, no database

---

# Strict Technical Constraints

1. DO NOT add backend.
2. DO NOT add authentication.
3. DO NOT create API routes.
4. DO NOT use external databases.
5. All persistence must use localStorage only.
6. No third-party state management libraries unless necessary.
7. Prefer custom hooks for state logic.

---

# Tech Stack Requirements

- React
- TypeScript
- TailwindCSS
- 8bitcn UI
- localStorage for persistence

---

# Architecture Rules

1. Use modular component structure.
2. All business logic must live inside custom hooks (useLifeRepo).
3. UI components must remain presentational where possible.
4. Keep folder structure clean and scalable.
5. Use typed interfaces for all data models.

---

# Data Models

Commit:

- id: string
- message: string
- branch: string
- category: string
- mood?: string
- confidence?: number
- status: "in-progress" | "success" | "failed" | "reverted"
- createdAt: number
- revertedFrom?: string

Branch:

- name: string
- createdAt: number

RepoState:

- commits: Commit[]
- branches: Branch[]
- activeBranch: string

---

# Feature Scope (MVP Only)

Must Implement:

- Boot screen
- Create commit
- Update commit status
- Revert commit
- Delete commit
- Branch switching
- Contribution graph
- Dashboard stats
- Export JSON
- Import JSON
- Reset repo

Do NOT implement:

- Real Git parsing
- Real merge conflict system
- Social features
- Cloud sync
- Payments
- User accounts

---

# Code Quality Rules

1. Keep components small and reusable.
2. Avoid duplicated logic.
3. Use utility functions for date/graph calculations.
4. No unnecessary complexity.
5. Clean readable code over clever code.
6. Strong TypeScript typing required.

---

# UX Principles

- Retro but clean.
- Playful but not chaotic.
- Minimal animations.
- Fully responsive.
- Dark-first theme.

---

# Output Expectations

When generating code:

- Provide complete working components.
- Include types.
- Include required imports.
- Keep styling consistent with Tailwind + 8bitcn.

Avoid placeholders unless explicitly requested.
Avoid backend suggestions.
Avoid overengineering.
