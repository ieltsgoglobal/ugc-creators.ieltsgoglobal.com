# Next.js Application

A modern, full-stack web application built with Next.js, optimized for AI-assisted development.

Tech Stack

* Framework: Next.js (App Router)
* Language: TypeScript
* UI: Watermelon UI only
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

AI Development Guidelines

* Use Watermelon UI exclusively for all user-facing interfaces.
* Always search Watermelon UI for an existing component, block, or template before implementing UI.
* Prefer complete Watermelon UI templates over assembling individual components.
* Reuse original Watermelon UI layouts, animations, typography, spacing, and styling.
* Never recreate an existing Watermelon UI component from scratch.
* Do not use shadcn/ui directly to design interfaces. Its underlying dependencies are permitted when required by Watermelon UI.
* Do not introduce other UI libraries without explicit approval.
* Avoid custom CSS and unnecessary UI components.
* Maintain visual consistency with the existing Watermelon UI Landing 01 design.
* If no suitable Watermelon UI component exists, show available alternatives and ask before implementing a custom solution.
* Use oRPC for application queries and mutations.
* Prefer Server Components over Client Components.
* Keep files small and focused (target under 150 lines, split only when useful).
* Prefer one export per file, except framework-required exports.
* Use descriptive, domain-specific names for variables, functions, and files.
* Reuse existing code before creating new abstractions.
* Read only relevant files and make targeted changes to minimize token usage.
* Avoid unnecessary dependencies.

# AI Agent Skills

* [Watermelon component guide](WATERMELON.md) for choosing the right component and reusing its styles.
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
