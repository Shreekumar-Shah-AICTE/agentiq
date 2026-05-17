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
