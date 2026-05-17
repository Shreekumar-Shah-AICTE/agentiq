# AGENTS.md — AgentIQ Codebase Context 🧠

Welcome! This file provides essential system context, unwritten rules, and styling conventions for AI coding agents (such as IBM Bob, Cursor, and Copilot) to ensure perfect code generation and completion in this repository.

## 🚀 Project Overview & Stack
- **Project Name:** AgentIQ
- **Purpose:** Enterprise-grade governance & context synchronization layer for AI coding agents.
- **Framework:** Next.js 16 (App Router)
- **Primary Lang:** TypeScript / Node.js
- **Styling:** Vanilla CSS (Zero Tailwind, strict design system tokens in \`app/globals.css\`)
- **AI Engine:** IBM Granite (watsonx.ai & Groq API client)
- **Deployment:** Vercel

## 🏗️ Architecture Blueprint
This is a standard Next.js App Router project:
- **Pages:** Located in \`app/\` (e.g., \`app/page.tsx\`, \`app/dashboard/page.tsx\`)
- **API Routes:** Located in \`app/api/\` (e.g., \`app/api/analyze/route.ts\`)
- **Shared Components:** Located in \`app/components/\`
- **Helper Libraries:** Located in \`app/lib/\`
- **Type Interfaces:** Located in \`app/types/index.ts\`

## 🎨 Visual Style Guide
- **Theme:** Strict Dark Theme default. Never use light backgrounds or primary colors.
- **Recipe:** Glassmorphic cards everywhere. Use the \`.glass\` class for cards and panels.
- **Fonts:** Inter (sans-serif) for body and headlines. JetBrains Mono (monospaced) for logs, file contents, and statistics.
- **Aesthetic:** High contrast, deep space void gradients (cyan to purple HSL hues).

## 🛠️ Commands
- **Development Server:** \`npm run dev\`
- **Production Build:** \`npm run build\`
- **Syntax Check / Lint:** \`npm run lint\`

## 📌 Coding Rules
1. **No Tailwind CSS:** Always write styled layout containers in pure vanilla CSS inside \`app/globals.css\` or inline style wrappers, referencing the CSS variables in \`:root\`.
2. **Explicit Typings:** Never use \`any\`. Import custom types from \`@/app/types\`.
3. **No hardcoded secrets:** All keys go to \`.env.local\` and are read via \`process.env\`. Ensure \`.env.local\` is NEVER committed.
4. **SSE Streams:** The repository analysis API is a streaming event endpoint. Consume it using EventSource or standard readable stream fetch on the client.
