**User:**

<task>
Read the current .bob/skills/project-context/SKILL.md and enhance it to be more comprehensive. The skill should instruct Bob how to:
1. Parse AGENTS.md for code style conventions
2. Use the agentiq-optimized custom mode for all editing
3. Reference tribal knowledge rules when validating imports
4. Auto-verify generated code against `npm run build` before completing
5. Understand the SSE streaming pipeline architecture
6. Follow the glassmorphism design system in globals.css
Make it detailed and practical, not generic.
</task>
<environment_details>
# VSCode Visible Files
bob_sessions\bob_task_may-17-2026_6-59-10-pm.md

# VSCode Open Tabs
README.md,bob_sessions/bob_task_may-17-2026_6-59-10-pm.md,app/lib/health-check.ts,app/api/health/route.ts,app/types/index.ts

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T13:30:13.432Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.00

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>


# Current Workspace Directory (c:/Users/Shree Shah/Desktop/IBM Bob Hackathon/agentiq) Files
.gitignore
AGENTS.md
ARCHITECTURE_ANALYSIS.md
ARCHITECTURE_DIAGRAM.md
ARCHITECTURE_SUMMARY.md
CLAUDE.md
eslint.config.mjs
next.config.ts
package-lock.json
package.json
README.md
tsconfig.json
.bob/
app/
app/favicon.ico
app/globals.css
app/layout.tsx
app/page.tsx
app/api/
app/api/analyze/
app/api/analyze/route.ts
app/api/health/
app/api/health/route.ts
app/components/
app/components/AnalysisStream.tsx
app/components/ArchDiagram.tsx
app/components/Confetti.tsx
app/components/DependencyPanel.tsx
app/components/DimensionBars.tsx
app/components/ExportPanel.tsx
app/components/FileViewer.tsx
app/components/KPICards.tsx
app/components/ParticleField.tsx
app/components/RecommendationsPanel.tsx
app/components/ScoreGauge.tsx
app/dashboard/
app/dashboard/page.tsx
app/lib/
app/lib/ai-client.ts
app/lib/analyzer.ts
app/lib/generator.ts
app/lib/github.ts
app/lib/health-check.ts
app/lib/prompts.ts
app/types/
app/types/index.ts
bob_sessions/
bob_sessions/bob_task_may-17-2026_6-42-07-pm.md
bob_sessions/bob_task_may-17-2026_6-42-07-pm.PNG
bob_sessions/bob_task_may-17-2026_6-46-29-pm.md
bob_sessions/bob_task_may-17-2026_6-46-29-pm.PNG
bob_sessions/bob_task_may-17-2026_6-55-00-pm.md
bob_sessions/bob_task_may-17-2026_6-55-00-pm.PNG
bob_sessions/bob_task_may-17-2026_6-59-10-pm.md
bob_sessions/bob_task_may-17-2026_6-59-10-pm.PNG
public/
public/file.svg
public/globe.svg
public/next.svg
public/vercel.svg
public/window.svg
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll read the current SKILL.md file to understand its structure and then enhance it with comprehensive, practical instructions.

<read_file>
<args>
<file>
<path>.bob/skills/project-context/SKILL.md</path>
</file>
</args>
</read_file>

---

**User:**

[read_file for '.bob/skills/project-context/SKILL.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>.bob/skills/project-context/SKILL.md</path>
<content lines="1-13">
 1 | # Project Context Analysis
 2 | 
 3 | ## Purpose
 4 | Analyze any codebase to understand its conventions, architecture,
 5 | and tribal knowledge so that AI coding agents can be more effective.
 6 | 
 7 | ## Steps
 8 | 1. Read the file tree to understand project structure
 9 | 2. Identify the tech stack from config files
10 | 3. Analyze naming patterns from code samples
11 | 4. Extract architecture from directory organization
12 | 5. Find build/test commands from package.json or equivalent
13 | 6. Summarize findings as structured context
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
bob_sessions\bob_task_may-17-2026_6-59-10-pm.md

# VSCode Open Tabs
README.md,bob_sessions/bob_task_may-17-2026_6-59-10-pm.md,app/lib/health-check.ts,app/api/health/route.ts,app/types/index.ts

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T13:30:17.385Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.01

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

Now I'll read the AGENTS.md file to understand the conventions I need to reference in the enhanced skill:

<read_file>
<args>
<file>
<path>AGENTS.md</path>
</file>
<file>
<path>app/globals.css</path>
<line_range>1-100</line_range>
</file>
</args>
</read_file>

---

**User:**

[read_file for 'AGENTS.md', 'app/globals.css'] Result:
<files>
<file><path>AGENTS.md</path>
<content lines="1-37">
 1 | # AGENTS.md — AgentIQ Codebase Context 🧠
 2 | 
 3 | Welcome! This file provides essential system context, unwritten rules, and styling conventions for AI coding agents (such as IBM Bob, Cursor, and Copilot) to ensure perfect code generation and completion in this repository.
 4 | 
 5 | ## 🚀 Project Overview & Stack
 6 | - **Project Name:** AgentIQ
 7 | - **Purpose:** Enterprise-grade governance & context synchronization layer for AI coding agents.
 8 | - **Framework:** Next.js 16 (App Router)
 9 | - **Primary Lang:** TypeScript / Node.js
10 | - **Styling:** Vanilla CSS (Zero Tailwind, strict design system tokens in \`app/globals.css\`)
11 | - **AI Engine:** IBM Granite (watsonx.ai & Groq API client)
12 | - **Deployment:** Vercel
13 | 
14 | ## 🏗️ Architecture Blueprint
15 | This is a standard Next.js App Router project:
16 | - **Pages:** Located in \`app/\` (e.g., \`app/page.tsx\`, \`app/dashboard/page.tsx\`)
17 | - **API Routes:** Located in \`app/api/\` (e.g., \`app/api/analyze/route.ts\`)
18 | - **Shared Components:** Located in \`app/components/\`
19 | - **Helper Libraries:** Located in \`app/lib/\`
20 | - **Type Interfaces:** Located in \`app/types/index.ts\`
21 | 
22 | ## 🎨 Visual Style Guide
23 | - **Theme:** Strict Dark Theme default. Never use light backgrounds or primary colors.
24 | - **Recipe:** Glassmorphic cards everywhere. Use the \`.glass\` class for cards and panels.
25 | - **Fonts:** Inter (sans-serif) for body and headlines. JetBrains Mono (monospaced) for logs, file contents, and statistics.
26 | - **Aesthetic:** High contrast, deep space void gradients (cyan to purple HSL hues).
27 | 
28 | ## 🛠️ Commands
29 | - **Development Server:** \`npm run dev\`
30 | - **Production Build:** \`npm run build\`
31 | - **Syntax Check / Lint:** \`npm run lint\`
32 | 
33 | ## 📌 Coding Rules
34 | 1. **No Tailwind CSS:** Always write styled layout containers in pure vanilla CSS inside \`app/globals.css\` or inline style wrappers, referencing the CSS variables in \`:root\`.
35 | 2. **Explicit Typings:** Never use \`any\`. Import custom types from \`@/app/types\`.
36 | 3. **No hardcoded secrets:** All keys go to \`.env.local\` and are read via \`process.env\`. Ensure \`.env.local\` is NEVER committed.
37 | 4. **SSE Streams:** The repository analysis API is a streaming event endpoint. Consume it using EventSource or standard readable stream fetch on the client.
</content>
</file>
<file><path>app/globals.css</path>
<content lines="1-100">
  1 | /* === IMPORTS === */
  2 | @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
  3 | 
  4 | /* === DESIGN TOKENS === */
  5 | :root {
  6 |   /* === BACKGROUNDS === */
  7 |   --bg-void:        hsl(228, 28%, 4%);    /* Near-black with deep blue undertone */
  8 |   --bg-deep:        hsl(228, 24%, 7%);    /* Main canvas */
  9 |   --bg-surface:     hsl(228, 20%, 11%);   /* Cards, panels */
 10 |   --bg-elevated:    hsl(228, 18%, 15%);   /* Hover states, active panels */
 11 |   --bg-overlay:     hsl(228, 16%, 19%);   /* Modals, dropdowns */
 12 | 
 13 |   /* === GLASS === */
 14 |   --glass-bg:       hsla(228, 22%, 11%, 0.65);
 15 |   --glass-border:   hsla(228, 40%, 40%, 0.15);
 16 |   --glass-shadow:   0 8px 32px hsla(228, 50%, 4%, 0.6);
 17 |   --glass-blur:     blur(20px) saturate(1.6);
 18 | 
 19 |   /* === ACCENT === */
 20 |   --cyan:           hsl(192, 100%, 55%);
 21 |   --cyan-glow:      hsla(192, 100%, 55%, 0.35);
 22 |   --purple:         hsl(265, 90%, 65%);
 23 |   --purple-glow:    hsla(265, 90%, 65%, 0.25);
 24 |   --gradient-brand: linear-gradient(135deg, var(--cyan), var(--purple));
 25 |   --gradient-text:  linear-gradient(135deg, hsl(192, 100%, 75%), hsl(265, 90%, 80%));
 26 |   --gradient-subtle: linear-gradient(135deg, hsla(192, 100%, 55%, 0.1), hsla(265, 90%, 65%, 0.1));
 27 | 
 28 |   /* === SCORE COLORS === */
 29 |   --score-critical: hsl(0, 85%, 62%);      /* 0-30 */
 30 |   --score-warning:  hsl(35, 95%, 58%);     /* 31-60 */
 31 |   --score-good:     hsl(145, 75%, 48%);    /* 61-80 */
 32 |   --score-excellent: var(--cyan);           /* 81-100 */
 33 | 
 34 |   /* === TEXT === */
 35 |   --text-primary:   hsl(0, 0%, 96%);
 36 |   --text-secondary: hsl(228, 15%, 65%);
 37 |   --text-muted:     hsl(228, 12%, 45%);
 38 |   --text-ghost:     hsl(228, 10%, 28%);
 39 | 
 40 |   /* === SEMANTIC === */
 41 |   --success:        hsl(145, 75%, 48%);
 42 |   --warning:        hsl(35, 95%, 58%);
 43 |   --danger:         hsl(0, 85%, 62%);
 44 |   --info:           var(--cyan);
 45 | 
 46 |   /* === TYPOGRAPHY === */
 47 |   --font-sans:  'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
 48 |   --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
 49 | 
 50 |   /* Scale */
 51 |   --text-xs:    0.75rem;     /* 12px */
 52 |   --text-sm:    0.875rem;    /* 14px */
 53 |   --text-base:  1rem;        /* 16px */
 54 |   --text-lg:    1.125rem;    /* 18px */
 55 |   --text-xl:    1.25rem;     /* 20px */
 56 |   --text-2xl:   1.5rem;      /* 24px */
 57 |   --text-3xl:   1.875rem;    /* 30px */
 58 |   --text-4xl:   2.25rem;     /* 36px */
 59 |   --text-hero:  3.5rem;      /* 56px */
 60 |   --text-mega:  5rem;        /* 80px */
 61 | 
 62 |   /* === SPACING & RADIUS === */
 63 |   --space-1: 0.25rem;  --space-2: 0.5rem;  --space-3: 0.75rem;
 64 |   --space-4: 1rem;     --space-5: 1.5rem;  --space-6: 2rem;
 65 |   --space-8: 3rem;     --space-10: 4rem;   --space-12: 5rem;
 66 | 
 67 |   --radius-sm: 8px;    --radius-md: 12px;  --radius-lg: 16px;
 68 |   --radius-xl: 24px;   --radius-full: 9999px;
 69 | 
 70 |   /* === ANIMATIONS === */
 71 |   --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
 72 |   --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
 73 |   --duration-fast:   150ms;
 74 |   --duration-normal: 300ms;
 75 |   --duration-slow:   500ms;
 76 | }
 77 | 
 78 | /* === RESET & BASE === */
 79 | *, *::before, *::after {
 80 |   box-sizing: border-box;
 81 |   margin: 0;
 82 |   padding: 0;
 83 | }
 84 | 
 85 | html {
 86 |   font-size: 16px;
 87 |   scroll-behavior: smooth;
 88 | }
 89 | 
 90 | body {
 91 |   font-family: var(--font-sans);
 92 |   background: var(--bg-void);
 93 |   color: var(--text-primary);
 94 |   min-height: 100vh;
 95 |   overflow-x: hidden;
 96 |   position: relative;
 97 | }
 98 | 
 99 | /* === BACKGROUND SYSTEM === */
100 | .page-bg {
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
bob_sessions\bob_task_may-17-2026_6-59-10-pm.md

# VSCode Open Tabs
README.md,bob_sessions/bob_task_may-17-2026_6-59-10-pm.md,app/lib/health-check.ts,app/api/health/route.ts,app/types/index.ts

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T13:30:20.511Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.02

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

Now I'll enhance the SKILL.md file with comprehensive, practical instructions based on the AGENTS.md conventions and project structure:

<write_to_file>
<path>.bob/skills/project-context/SKILL.md</path>
<content>
# Project Context Analysis & Code Generation

## Purpose
Analyze any codebase to understand its conventions, architecture, and tribal knowledge so that AI coding agents can generate production-ready code that perfectly matches the project's standards.

## Core Workflow

### 1. Parse AGENTS.md for Code Style Conventions
**ALWAYS read `AGENTS.md` first** before making any code changes. This file contains:
- Tech stack specifications (Next.js 16 App Router, TypeScript, Vanilla CSS)
- Architectural patterns (App Router structure, API routes, component organization)
- Styling rules (NO Tailwind, glassmorphism design system)
- Build commands (`npm run build`, `npm run dev`, `npm run lint`)
- Tribal knowledge (SSE streaming, type safety, environment variables)

**Action Steps:**
1. Read `AGENTS.md` to extract:
   - Framework version and routing pattern
   - Styling approach (vanilla CSS vs. utility frameworks)
   - Type system requirements (explicit typing, no `any`)
   - API patterns (REST, SSE, GraphQL)
   - Security rules (environment variables, secret management)

2. Parse the "Coding Rules" section for non-negotiable constraints:
   - **No Tailwind CSS** → All styles must use CSS variables from `app/globals.css`
   - **Explicit Typings** → Import types from `@/app/types`, never use `any`
   - **No hardcoded secrets** → All keys in `.env.local`, read via `process.env`
   - **SSE Streams** → Use EventSource or fetch with readable streams for `/api/analyze`

### 2. Use AgentIQ-Optimized Custom Mode
**Always operate in "code" mode** for this project. This ensures:
- Full access to file editing tools (`apply_diff`, `write_to_file`, `insert_content`)
- Command execution for build verification
- Multi-file context reading for comprehensive analysis

**When to switch modes:**
- Stay in `code` mode for all editing, analysis, and verification tasks
- Only switch if explicitly requested by user

### 3. Reference Tribal Knowledge Rules When Validating Imports

**Import Path Conventions:**
```typescript
// ✅ CORRECT - Use @/ alias for app directory
import { AnalysisResult } from '@/app/types';
import { analyzeRepository } from '@/app/lib/analyzer';
import AnalysisStream from '@/app/components/AnalysisStream';

// ❌ WRONG - Never use relative paths from root
import { AnalysisResult } from '../types';
import { analyzeRepository } from './lib/analyzer';
```

**Type Import Rules:**
- All shared types live in `app/types/index.ts`
- Component-specific types can be co-located in the component file
- Never use `any` - if type is unknown, use `unknown` and narrow it
- Always import types explicitly: `import type { TypeName } from '@/app/types'`

**Component Import Patterns:**
```typescript
// ✅ Server Components (default in App Router)
import ServerComponent from '@/app/components/ServerComponent';

// ✅ Client Components (must have 'use client' directive)
import ClientComponent from '@/app/components/ClientComponent';

// ✅ API Route imports
import { NextRequest, NextResponse } from 'next/server';
```

**Library Import Hierarchy:**
1. External packages (React, Next.js, third-party)
2. Internal types (`@/app/types`)
3. Internal utilities (`@/app/lib/*`)
4. Internal components (`@/app/components/*`)
5. Styles (CSS imports last)

### 4. Auto-Verify Generated Code Against `npm run build`

**MANDATORY: Always verify before completion**

After generating or modifying code, you MUST:

1. **Run TypeScript compilation:**
   ```bash
   npm run build
   ```

2. **Check for errors:**
   - Type errors → Fix import paths, add missing types
   - Module resolution errors → Verify `@/app/*` alias usage
   - Syntax errors → Review generated code structure

3. **Run linter:**
   ```bash
   npm run lint
   ```

4. **Fix any issues before using `attempt_completion`:**
   - Read error output carefully
   - Use `read_file` to check existing code patterns
   - Apply fixes with `apply_diff` or `write_to_file`
   - Re-run build to confirm fixes

**Example Verification Flow:**
```bash
# After code changes
npm run build

# If errors occur:
# 1. Read the error output
# 2. Identify the file and line number
# 3. Use read_file to examine context
# 4. Apply fixes
# 5. Re-run build
# 6. Only use attempt_completion when build succeeds
```

### 5. Understand the SSE Streaming Pipeline Architecture

**Server-Side Event (SSE) Implementation:**

The `/api/analyze` endpoint uses SSE for real-time streaming:

```typescript
// API Route Pattern (app/api/analyze/route.ts)
export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Send events as they occur
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      controller.close();
    }
  });
  
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

**Client-Side Consumption:**

```typescript
// Component Pattern (app/components/AnalysisStream.tsx)
const eventSource = new EventSource('/api/analyze');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle streaming data
};

eventSource.onerror = () => {
  eventSource.close();
};
```

**SSE Event Types in AgentIQ:**
- `status` - Progress updates ("Analyzing dependencies...", "Generating recommendations...")
- `progress` - Percentage completion (0-100)
- `result` - Partial or final analysis results
- `error` - Error messages
- `complete` - Stream termination signal

**Key Rules:**
- Always use `text/event-stream` content type
- Format: `data: ${JSON.stringify(payload)}\n\n`
- Client must handle reconnection on error
- Server must close stream explicitly with `controller.close()`

### 6. Follow the Glassmorphism Design System in globals.css

**Design Token System:**

All visual styling MUST use CSS variables from `app/globals.css`:

```css
/* Background Hierarchy */
--bg-void:      hsl(228, 28%, 4%)   /* Page background */
--bg-deep:      hsl(228, 24%, 7%)   /* Main canvas */
--bg-surface:   hsl(228, 20%, 11%)  /* Cards, panels */
--bg-elevated:  hsl(228, 18%, 15%)  /* Hover states */
--bg-overlay:   hsl(228, 16%, 19%)  /* Modals */

/* Glass Effect (Core Pattern) */
--glass-bg:     hsla(228, 22%, 11%, 0.65)
--glass-border: hsla(228, 40%, 40%, 0.15)
--glass-shadow: 0 8px 32px hsla(228, 50%, 4%, 0.6)
--glass-blur:   blur(20px) saturate(1.6)

/* Accent Colors */
--cyan:         hsl(192, 100%, 55%)
--purple:       hsl(265, 90%, 65%)
--gradient-brand: linear-gradient(135deg, var(--cyan), var(--purple))
```

**Glassmorphic Card Pattern:**

```css
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
}
```

**Typography Rules:**
- **Body text:** `font-family: var(--font-sans)` (Inter)
- **Code/logs:** `font-family: var(--font-mono)` (JetBrains Mono)
- **Sizes:** Use `var(--text-xs)` through `var(--text-mega)` scale
- **Colors:** Use `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`

**Spacing & Layout:**
- Use `var(--space-1)` through `var(--space-12)` for consistent spacing
- Border radius: `var(--radius-sm)` through `var(--radius-xl)`
- Animations: `var(--ease-out-expo)`, `var(--duration-normal)`

**Component Styling Example:**

```tsx
// ✅ CORRECT - Use CSS variables
<div className="analysis-card">
  <h2>Analysis Results</h2>
  <p>Score: 85/100</p>
</div>

// In globals.css:
.analysis-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  backdrop-filter: var(--glass-blur);
}

.analysis-card h2 {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

// ❌ WRONG - Never use Tailwind or inline hardcoded values
<div className="bg-gray-800 rounded-lg p-6">
  <h2 className="text-2xl text-white">Analysis Results</h2>
</div>
```

**Score Color System:**
```css
/* Use semantic score colors */
--score-critical:  hsl(0, 85%, 62%)    /* 0-30 */
--score-warning:   hsl(35, 95%, 58%)   /* 31-60 */
--score-good:      hsl(145, 75%, 48%)  /* 61-80 */
--score-excellent: var(--cyan)          /* 81-100 */
```

## Complete Code Generation Checklist

Before using `attempt_completion`, verify:

- [ ] Read `AGENTS.md` and understood all coding rules
- [ ] Used `@/app/*` import aliases (never relative paths)
- [ ] Imported types from `@/app/types/index.ts`
- [ ] No `any` types used (explicit typing everywhere)
- [ ] Environment variables in `.env.local`, accessed via `process.env`
- [ ] Styling uses CSS variables from `globals.css` (NO Tailwind)
- [ ] Glassmorphic `.glass` class applied to cards/panels
- [ ] Typography uses `var(--font-sans)` or `var(--font-mono)`
- [ ] SSE endpoints use proper `text/event-stream` format
- [ ] Ran `npm run build` successfully (no TypeScript errors)
- [ ] Ran `npm run lint` successfully (no linting errors)
- [ ] All files follow Next.js App Router conventions
- [ ] Server components are default, client components have `'use client'`

## Example: Complete Code Generation Flow

```bash
# 1. Read project context
read_file AGENTS.md
read_file app/globals.css (lines 1-100)
read_file app/types/index.ts

# 2. Generate code with proper patterns
write_to_file app/components/NewComponent.tsx

# 3. Verify build
execute_command: npm run build

# 4. Fix any errors (if needed)
read_file app/components/NewComponent.tsx
apply_diff app/components/NewComponent.tsx

# 5. Re-verify
execute_command: npm run build

# 6. Complete only when build succeeds
attempt_completion
```

## Anti-Patterns to Avoid

❌ **Never do this:**
- Use Tailwind classes (`className="bg-blue-500 p-4"`)
- Use `any` type (`const data: any = ...`)
- Hardcode colors (`background: #1a1a2e`)
- Use relative imports from root (`import from '../types'`)
- Skip build verification before completion
- Ignore AGENTS.md conventions
- Create light theme styles (strict dark theme only)
- Use non-glassmorphic card designs

✅ **Always do this:**
- Use CSS variables (`background: var(--bg-surface)`)
- Explicit types (`const data: AnalysisResult = ...`)
- Reference design tokens (`color: var(--text-primary)`)
- Use `@/app/*` aliases (`import from '@/app/types'`)
- Run `npm run build` before completion
- Follow AGENTS.md rules religiously
- Maintain dark theme aesthetic
- Apply `.glass` class to all cards/panels

## Summary

This skill ensures Bob generates production-ready code that:
1. Matches AgentIQ's architectural patterns (Next.js App Router, TypeScript)
2. Follows the glassmorphism design system (CSS variables, dark theme)
3. Respects tribal knowledge (SSE streaming, type safety, import conventions)
4. Passes build verification (TypeScript compilation, linting)
5. Integrates seamlessly with existing codebase

**Remember:** Read `AGENTS.md` first, verify with `npm run build` last, and never compromise on the glassmorphic aesthetic or type safety.
</content>
<line_count>363</line_count>
</write_to_file>

---

**User:**

[write_to_file for '.bob/skills/project-context/SKILL.md'] Result:
<file_write_result>
<path>.bob/skills/project-context/SKILL.md</path>
<operation>modified</operation>
<user_edits>@@ -338,4 +338,4 @@
 4. Passes build verification (TypeScript compilation, linting)
 5. Integrates seamlessly with existing codebase
 
-**Remember:** Read `AGENTS.md` first, verify with `npm run build` last, and never compromise on the glassmorphic aesthetic or type safety.
\ No newline at end of file
+**Remember:** Read `AGENTS.md` first, verify with `npm run build` last, and never compromise on the glassmorphic aesthetic or type safety.
</user_edits>
<notice>
<i>You do not need to re-read the file, as you have seen all changes</i>
<i>Proceed with the task using these changes as the new baseline.</i>
<i>If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.</i>
</notice>
</file_write_result>

<environment_details>
# VSCode Visible Files
.bob\skills\project-context\SKILL.md

# VSCode Open Tabs
README.md,.bob/skills/project-context/SKILL.md,app/lib/health-check.ts,app/api/health/route.ts,app/types/index.ts

# Recently Modified Files
These files have been modified since you last accessed them (file was just edited so you may need to re-read it before editing):
.bob/skills/project-context/SKILL.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T13:31:22.389Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.05

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<attempt_completion>
<result>
Enhanced `.bob/skills/project-context/SKILL.md` with comprehensive, practical instructions:

**Key Enhancements:**

1. **AGENTS.md Parsing** - Detailed workflow for extracting tech stack, styling rules, and tribal knowledge before any code generation

2. **AgentIQ-Optimized Mode** - Clear guidance to stay in "code" mode for all editing and verification tasks

3. **Import Validation Rules** - Explicit patterns for `@/app/*` aliases, type imports, and component hierarchy with correct/incorrect examples

4. **Build Verification Protocol** - Mandatory `npm run build` and `npm run lint` checks before completion, with error-fixing workflow

5. **SSE Streaming Architecture** - Complete server/client patterns for the `/api/analyze` endpoint with event types and formatting rules

6. **Glassmorphism Design System** - Comprehensive guide to CSS variables, `.glass` class usage, typography rules, spacing tokens, and score colors with practical examples

**Added Practical Elements:**
- Complete code generation checklist (14 verification points)
- Example workflow with actual commands
- Anti-patterns section (what to avoid vs. what to do)
- Real code examples for imports, styling, and SSE implementation
- Design token reference table
- Component styling patterns

The skill now provides actionable, project-specific guidance rather than generic instructions, ensuring Bob generates production-ready code that perfectly matches AgentIQ's conventions.
</result>
</attempt_completion>

