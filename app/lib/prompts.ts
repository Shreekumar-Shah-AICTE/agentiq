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

export const AGENTS_MD_PROMPT = `You are a technical context generator. Create the contents for an 'AGENTS.md' documentation file.
AGENTS.md is a specialized file designed to onboard AI coding agents like Cursor, Github Copilot, and IBM Bob to this repository.

Input Analysis JSON:
{analysisJson}

Input Tribal Knowledge:
{tribalRules}

Output the AGENTS.md content in clean markdown format. Do not wrap in a general code block, write the markdown directly. Address these sections in depth:
- Project Overview & Tech Stack
- Architectural Design & Key Relationships
- Specific Naming Conventions & File Organization Rules (with concrete examples)
- Build, Test, and Dev Commands
- Code Patterns & Best Practices (Error Handling, Data Access, Async flows)
- Anti-Patterns (What NOT to do in this codebase)
- Tribal Knowledge (Unwritten rules discovered from review history)
Provide a detailed, professional, and exhaustive file.`;

export const BOB_MODE_PROMPT = `You are a system administrator. Create a custom YAML mode file for IBM Bob IDE.
Slug: agentiq-optimized
Name: "AgentIQ-Optimized Developer"

Input Analysis JSON:
{analysisJson}

Input Tribal Knowledge:
{tribalRules}

Output a clean, valid YAML file. Do not wrap in markdown code blocks. Follow this exact format:
slug: agentiq-optimized
name: "AgentIQ-Optimized Developer"
roleDefinition: >
  You are a senior developer on the project. You specialize in following naming patterns and unwritten rules.
customInstructions: |
  ## Core Architecture
  [Detailed description based on patterns]
  
  ## Code Styling Rules
  [Details]

  ## Required Commands
  - Build: [build_command]
  - Test: [test_command]

  ## Unwritten Tribal Rules
  [Rules list]

  ## Anti-Patterns
  [Anti-patterns list]
groups:
  - read
  - edit
  - command`;

export const CURSORRULES_PROMPT = `Create a '.cursorrules' configuration file for AI agents in Cursor.
The file should contain concrete, actionable guidelines on how to write code, design files, and run commands in this codebase.

Input Analysis JSON:
{analysisJson}

Input Tribal Knowledge:
{tribalRules}

Output the flat text containing markdown rules. Do not wrap in code blocks. Ensure the rules are highly technical and specify:
- Tech Stack details
- Naming conventions for variables, files, and classes
- Folder-by-folder guidelines
- Linting, build, and test requirements
- Team preferences and unwritten rules`;

export const CLAUDE_MD_PROMPT = `Create a 'CLAUDE.md' configuration file. CLAUDE.md is used by AI assistants (like Claude Engineer or Anthropic's CLAUDE.md spec) to quickly learn build, test, and style commands for a repository.

Input Analysis JSON:
{analysisJson}

Input Tribal Knowledge:
{tribalRules}

Output the CLAUDE.md content in direct markdown format. Ensure it contains:
1. Build, test, and run commands (explicitly list how to run linting, formatting, testing, and production builds)
2. Precise code style guidelines (indents, brackets, typing, imports, component patterns, error handling)
Make it concise, precise, and easily readable.`;

export const COPILOT_INSTRUCTIONS_PROMPT = `Create a '.github/copilot-instructions.md' instruction file for Github Copilot.
This file influences Copilot's suggestions across the entire repository.

Input Analysis JSON:
{analysisJson}

Input Tribal Knowledge:
{tribalRules}

Output the markdown contents directly. Make it clear and structured. Specify the tech stack, library choices, architecture, naming constraints, and unwritten team rules.`;
