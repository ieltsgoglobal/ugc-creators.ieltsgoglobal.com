# Next.js Application

A modern, full-stack web application built with Next.js, optimized for AI-assisted development.

Tech Stack

* Framework: Next.js (App Router)
* Language: TypeScript
* UI: Watermelon UI + shadcn/ui
* Styling: Tailwind CSS
* Database: PostgreSQL
* Backend API: oRPC
* ORM: Prisma
* Authentication: Better Auth
* Validation: Zod
* Forms: React Hook Form
* URL State: nuqs
* Date Utilities: date-fns
* Schema Generation: Prisma Zod Generator
* Unit Testing: Vitest
* E2E Testing: Playwright

# AI Development Guidelines

* Prioritize existing Watermelon UI components, blocks, and templates.
* Use shadcn/ui as the component foundation.
* Use oRPC for application queries and mutations.
* Prefer Server Components over Client Components.
* Keep files small and focused (target under 150 lines, split only when useful).
* Prefer one export per file, except framework-required exports.
* Use descriptive, domain-specific names for variables, functions, and files.
* Reuse existing code before creating new abstractions.
* Read only relevant files and make targeted changes to minimize token usage.
* Avoid unnecessary dependencies.

# AI Agent Skills

* Pick UI Library: https://www.ui-skills.com/skills/emilkowalski/pick-ui-library
* Frontend Design: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
* Naming Convention: https://github.com/marcioaltoe/claude-craftkit/tree/main/plugins/architecture-design/skills/naming-conventions

# Command Execution Policy

* Never execute terminal or shell commands without my explicit approval.
* This applies to all commands, including npx, npm, pnpm, yarn, git, scripts, and CLI tools.
* Before executing any command, show me the exact command and briefly explain its purpose.
* Wait for my approval before running it.
* Do not assume approval for subsequent commands.
* Never automatically install, uninstall, update, or modify dependencies.
* Never execute destructive commands without explicit approval.
* Reading files through built-in file tools is allowed without approval.
* If a task requires commands, propose them first and wait.

# AI Token Efficiency Policy

* Aim to consume less than 1% of the available session token budget per task.
* Prioritize minimal token consumption without compromising correctness.
* Read only files directly relevant to the task.
* Never scan the entire repository unless necessary.
* Avoid unnecessary documentation searches and tool calls.
* Do not repeatedly read files already inspected.
* Keep reasoning and responses concise.
* Prefer targeted edits over rewriting entire files.
* Avoid unnecessary refactoring or unrelated improvements.
* Do not invoke multiple agents unless explicitly requested.
* Stop and ask before expanding the task’s scope.
* For complex tasks that cannot reasonably fit the budget, explain why before proceeding.