export const REPO_ANALYSIS_PROMPT = `You are AgentIQ, an AI codebase analyst. Analyze this repository structure and its key file contents. You must output a single JSON object with these EXACT keys and structure. Do NOT wrap it in a markdown block, do NOT write any explanation before or after the JSON. Output only valid JSON:

{
  "conventions": {
    "score": 0,
    "findings": ["finding 1", "finding 2"],
    "namingPattern": "camelCase|snake_case|PascalCase|mixed",
    "fileOrganization": "description of how files are organized"
  },
  "architecture": {
    "score": 0,
    "findings": ["finding 1", "finding 2"],
    "pattern": "MVC|layered|modular|monolithic|microservices|etc",
    "keyRelationships": ["A depends on B", "..."]
  },
  "patterns": {
    "score": 0,
    "findings": ["finding 1", "finding 2"],
    "errorHandling": "description",
    "dataAccess": "description"
  },
  "buildDeploy": {
    "score": 0,
    "findings": ["finding 1", "finding 2"],
    "buildCommand": "npm run build",
    "testCommand": "npm test",
    "framework": "Next.js|Express|Django|etc"
  },
  "documentation": {
    "score": 0,
    "findings": ["finding 1", "finding 2"],
    "hasReadme": true,
    "hasContributing": false,
    "hasAgentsMd": false
  }
}

Score Guide for each section (conventions, architecture, patterns, buildDeploy, documentation):
- 0-30: No discernible pattern or convention. Highly inconsistent. Wastes token cost and developer hours.
- 31-60: Some conventions are present but inconsistent or partially documented.
- 61-80: Strong conventions, consistent styling, mostly documented.
- 81-100: Excellent consistency, fully documented, AI-ready structure.

Your analysis must be based on the provided repository code, folder structure, and dependencies. Output only the JSON.`;

export const TRIBAL_KNOWLEDGE_PROMPT = `Analyze these code review comments from merged pull requests and issue discussions. Extract the UNWRITTEN team rules and conventions that a new developer or AI coding assistant would need to know.

Output a single JSON array of rules. Do NOT wrap it in a markdown block, do NOT write any explanation:
[
  "Rule 1: Always use date-fns instead of moment.js",
  "Rule 2: Feature flags must go through the LaunchDarkly wrapper",
  "Rule 3: Avoid using useEffect for data fetching, use React Query or Server Components"
]

Focus on: library preferences, architectural decisions, testing patterns, naming rules, forbidden patterns, deployment requirements. Output ONLY the JSON array.`;

export const AGENTS_MD_PROMPT = `You are a world-class technical writer creating an AGENTS.md file. This file is the SINGLE SOURCE OF TRUTH for any AI coding agent (Cursor, Copilot, Bob, Claude) working in this repository.

## Input Data
Repository Analysis: {analysisJson}
Tribal Knowledge: {tribalRules}
Code Samples: {codeContext}

## Requirements — Your output MUST include ALL of these sections:

### 1. Project Identity
- Repository name, description, primary language, framework
- Who maintains it and what it does (infer from code)

### 2. Tech Stack (exhaustive)
List every framework, library, and tool detected. Format as a table.

### 3. Architecture Deep Dive
- Pattern name (MVC, layered, modular, etc.)
- Module relationship descriptions
- Data flow explanation

### 4. Naming Convention Bible
For EACH entity type (variables, functions, components, files, CSS classes, constants, database fields), specify:
- The exact pattern (camelCase, PascalCase, etc.)
- 2-3 REAL examples pulled from this codebase
- An explicit "DO NOT" anti-pattern example

### 5. File Organization Rules
- Directory-by-directory guide
- Where new files of each type should go
- Import path conventions (@/ aliases, relative, etc.)

### 6. Build, Test, and Development Commands
- Exact commands (no guessing)
- Environment setup requirements

### 7. Code Patterns & Error Handling
- How errors are handled (custom classes? try-catch? error boundaries?)
- How data is fetched (REST? GraphQL? Server Components?)
- How state is managed
- Async patterns (await style, Promise chains, etc.)

### 8. Anti-Pattern Catalog
For each dimension, show a DO vs DON'T comparison with code snippets.

### 9. Tribal Knowledge (from PR history)
- List each rule with context on WHY it exists

### 10. AI Agent Quick Reference Card
A compact 10-line cheat sheet of the most critical rules.

Output the complete AGENTS.md in clean markdown. Be exhaustive and specific. NEVER use placeholder text.`;

export const BOB_MODE_PROMPT = `Create a highly detailed custom IBM Bob mode YAML file. This mode will make Bob behave as a senior developer who deeply understands this specific codebase.

## Input Data
Repository Analysis: {analysisJson}
Tribal Knowledge: {tribalRules}
Code Samples: {codeContext}

Output a valid YAML file (no markdown fences) with this structure:

slug: agentiq-optimized
name: "AgentIQ-Optimized Developer"
roleDefinition: >
  You are a principal engineer on {project_name}. You have deep knowledge of every naming convention,
  architectural boundary, and unwritten team rule. You refuse to generate code that violates project patterns.
customInstructions: |
  ## Architecture
  [Detailed architecture with module boundaries — be specific, not generic]
  
  ## Naming Rules (STRICT)
  [For each entity type: the pattern + 2 real examples from this codebase]
  
  ## File Placement Rules
  [Where new components, hooks, utils, API routes, and tests go]
  
  ## Import Conventions
  [Absolute vs relative, alias usage, barrel exports]
  
  ## Build & Development
  [Exact commands]
  
  ## Error Handling Contract
  [How to handle errors in this project specifically]
  
  ## DO NOT (Anti-Patterns)
  [List of forbidden patterns with brief explanations]
  
  ## Tribal Knowledge
  [Unwritten rules from PR history]
groups:
  - read
  - edit
  - command

Make the customInstructions section extremely detailed — at least 40 lines.`;

export const CURSORRULES_PROMPT = `Create a '.cursorrules' configuration file for AI agents in Cursor. The file should contain concrete, actionable guidelines on how to write code, design files, and run commands in this codebase.

## Input Data
Repository Analysis: {analysisJson}
Tribal Knowledge: {tribalRules}
Code Samples: {codeContext}

Ensure the rules are highly technical, specific to Cursor's agent features (like tab completion, chat context, and command execution), and specify:
- Tech Stack details
- Strict casing rules for all variables, files, components, and databases with concrete code examples from this repository
- Folder-by-folder layout maps
- Build, lint, and test scripts
- Anti-patterns catalog (DO vs DON'T comparisons with code snippets)
- Cursor agent specific tips (e.g. 'Use exact type imports', 'Prioritize server components over clients')

Output the flat text containing markdown rules directly. Do not wrap in code blocks.`;

export const CLAUDE_MD_PROMPT = `Create a 'CLAUDE.md' configuration file. CLAUDE.md is used by AI assistants like Claude Engineer to quickly learn build, test, and style commands for a repository.

## Input Data
Repository Analysis: {analysisJson}
Tribal Knowledge: {tribalRules}
Code Samples: {codeContext}

Output the CLAUDE.md content in direct, concise markdown format. Ensure it contains:
1. Build, test, and run commands as the VERY FIRST section (including linting, formatting, testing, and production builds)
2. Precise codebase guidelines (naming casings, imports, component patterns, error handling, state) with concrete codebase examples
3. Anti-patterns catalog (explicit DO vs DON'T code blocks)

Keep it terse, dense, and command-focused. Do not wrap in code blocks.`;

export const COPILOT_INSTRUCTIONS_PROMPT = `Create a '.github/copilot-instructions.md' instruction file for Github Copilot. This file influences Copilot's suggestions and inline completions across the entire repository.

## Input Data
Repository Analysis: {analysisJson}
Tribal Knowledge: {tribalRules}
Code Samples: {codeContext}

Output the markdown contents directly. Make it clear and structured. Specify the tech stack, library choices, architecture, naming constraints with concrete codebase examples, and unwritten team rules.
Provide explicit examples of standard imports, error handling blocks, and unit test structures. Avoid conversational text.`;

export const DEPENDENCY_ANALYSIS_PROMPT = `You are a senior software security auditor. Analyze this package.json (or requirements.txt / Cargo.toml) dependency list.

For EACH dependency, output a JSON array with this structure:
[
  {
    "name": "react",
    "version": "18.2.0",
    "type": "production",
    "risk": "safe",
    "note": ""
  },
  {
    "name": "moment",
    "version": "2.29.4",
    "type": "production",
    "risk": "heavy",
    "note": "Legacy library. Replace with date-fns or dayjs for 70% smaller bundle."
  }
]

Risk levels:
- "safe" — Actively maintained, no known issues
- "outdated" — Major version behind or maintenance slowing
- "heavy" — Unnecessarily large bundle impact, lighter alternatives exist  
- "deprecated" — Officially deprecated or abandoned

Be specific and technical in notes. Output ONLY the JSON array.`;

export const RECOMMENDATIONS_PROMPT = `You are a principal software engineer conducting a code quality audit. Based on this analysis, generate a prioritized list of actionable recommendations.

Input Analysis:
{analysisJson}

Input Tribal Knowledge:
{tribalRules}

Output a JSON array of recommendations sorted by impact (critical first):
[
  {
    "id": "rec-1",
    "title": "Add ESLint configuration with project-specific rules",
    "dimension": "conventions",
    "impact": "critical",
    "description": "No linting configuration detected. This means AI agents have zero guidance on code style, leading to inconsistent completions that require manual correction.",
    "action": "Create .eslintrc.json with rules for import ordering, naming conventions, and React hooks. Add lint script to package.json."
  }
]

Generate 6-10 recommendations. Each must be:
- Specific to THIS codebase (not generic advice)
- Actionable with a clear next step
- Tied to a specific dimension
Output ONLY the JSON array.`;

export const ARCHITECTURE_DIAGRAM_PROMPT = `Based on this codebase analysis, generate a Mermaid.js flowchart diagram showing the architecture.

Input Analysis:
{analysisJson}

Output ONLY a valid Mermaid diagram string (flowchart TD format). Show:
- Key modules/directories as nodes
- Dependencies between them as arrows
- Group related modules in subgraphs
- Use descriptive labels

Example format:
flowchart TD
  subgraph Frontend
    A[pages/] --> B[components/]
    B --> C[hooks/]
  end
  subgraph Backend
    D[api/routes/] --> E[services/]
    E --> F[database/]
  end
  A --> D

Keep it clean — max 15-20 nodes. Output ONLY the mermaid code, no markdown fences.`;
