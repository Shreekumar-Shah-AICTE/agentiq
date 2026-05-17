# AgentIQ Architecture Diagrams 📊

This document contains comprehensive Mermaid diagrams visualizing the AgentIQ system architecture.

---

## 🏗️ Complete System Architecture

```mermaid
flowchart TD
    subgraph Client["🌐 Client Layer"]
        UI[Next.js Frontend<br/>React Components]
        SSE[EventSource<br/>SSE Client]
    end

    subgraph API["⚡ API Layer"]
        Route["/api/analyze<br/>SSE Endpoint"]
        Stream[ReadableStream<br/>Controller]
    end

    subgraph Services["🔧 Service Layer"]
        GitHub[GitHub Service<br/>Data Acquisition]
        Analyzer[Analyzer Service<br/>AI Analysis]
        Generator[Generator Service<br/>File Generation]
    end

    subgraph AI["🤖 AI Integration"]
        AIClient[AI Client<br/>Provider Abstraction]
        Prompts[Prompt Templates<br/>Engineering]
    end

    subgraph External["🌍 External Services"]
        GitHubAPI[GitHub REST API<br/>Repos, Trees, PRs]
        WatsonX[IBM WatsonX AI<br/>Granite 3-8B]
        Groq[Groq API<br/>Llama 3.3-70B]
    end

    UI -->|User enters URL| Route
    Route -->|Creates| Stream
    Stream -->|Progress events| SSE
    SSE -->|Updates UI| UI

    Route -->|1. Parse & Fetch| GitHub
    Route -->|2. Analyze| Analyzer
    Route -->|3. Generate| Generator

    GitHub -->|API Calls| GitHubAPI
    Analyzer -->|AI Requests| AIClient
    Generator -->|AI Requests| AIClient

    AIClient -->|Primary| WatsonX
    AIClient -->|Fallback| Groq
    AIClient -->|Uses| Prompts

    style Client fill:#0d1117,stroke:#00d4ff,color:#fff
    style API fill:#0d1117,stroke:#00d4ff,color:#fff
    style Services fill:#0d1117,stroke:#a855f7,color:#fff
    style AI fill:#0d1117,stroke:#a855f7,color:#fff
    style External fill:#1a1a2e,stroke:#16c79a,color:#fff
```

---

## 🔄 Data Flow Pipeline

```mermaid
flowchart LR
    subgraph Input
        URL[GitHub URL]
    end

    subgraph Stage1["Stage 1: Acquisition"]
        Parse[Parse URL]
        Meta[Fetch Metadata]
        Tree[Fetch File Tree]
        Files[Fetch Key Files]
        PRs[Fetch PR Comments]
    end

    subgraph Stage2["Stage 2: Analysis"]
        Structure[Structure Analysis]
        Tribal[Tribal Knowledge]
        Deps[Dependency Audit]
        Scores[Score Calculation]
    end

    subgraph Stage3["Stage 3: Generation"]
        Agents[AGENTS.md]
        Bob[Bob Mode YAML]
        Cursor[.cursorrules]
        Claude[CLAUDE.md]
        Copilot[copilot-instructions]
    end

    subgraph Output
        Result[Analysis Result]
        ZIP[ZIP Download]
    end

    URL --> Parse
    Parse --> Meta
    Meta --> Tree
    Tree --> Files
    Tree --> PRs

    Files --> Structure
    PRs --> Tribal
    Files --> Deps
    Structure --> Scores
    Tribal --> Scores
    Deps --> Scores

    Scores --> Agents
    Scores --> Bob
    Scores --> Cursor
    Scores --> Claude
    Scores --> Copilot

    Agents --> Result
    Bob --> Result
    Cursor --> Result
    Claude --> Result
    Copilot --> Result

    Result --> ZIP

    style Input fill:#0d1117,stroke:#00d4ff,color:#fff
    style Stage1 fill:#0d1117,stroke:#ffd700,color:#fff
    style Stage2 fill:#0d1117,stroke:#a855f7,color:#fff
    style Stage3 fill:#0d1117,stroke:#16c79a,color:#fff
    style Output fill:#0d1117,stroke:#00d4ff,color:#fff
```

---

## 📡 SSE Streaming Timeline

```mermaid
gantt
    title AgentIQ Analysis Pipeline Timeline
    dateFormat X
    axisFormat %Ss

    section Fetching
    Parse URL           :0, 1s
    Fetch Metadata      :1s, 2s
    
    section Scanning
    Fetch File Tree     :2s, 4s
    Fetch Key Files     :4s, 7s
    
    section Analyzing
    AI Structure Analysis :7s, 12s
    
    section Tribal
    Extract PR Knowledge  :12s, 15s
    
    section Dependencies
    Audit Dependencies    :15s, 17s
    
    section Scoring
    Calculate Scores      :17s, 18s
    
    section Generating
    Generate 6 Files      :18s, 28s
    
    section Complete
    Send Final Result     :28s, 29s
```

---

## 🧩 Module Dependency Graph

```mermaid
graph TD
    Route[app/api/analyze/route.ts]
    GitHub[app/lib/github.ts]
    Analyzer[app/lib/analyzer.ts]
    Generator[app/lib/generator.ts]
    AIClient[app/lib/ai-client.ts]
    Prompts[app/lib/prompts.ts]
    Types[app/types/index.ts]

    Route -->|imports| GitHub
    Route -->|imports| Analyzer
    Route -->|imports| Generator
    Route -->|imports| Types

    Analyzer -->|imports| AIClient
    Analyzer -->|imports| Prompts
    Analyzer -->|imports| GitHub
    Analyzer -->|imports| Types

    Generator -->|imports| AIClient
    Generator -->|imports| Prompts
    Generator -->|imports| Types

    GitHub -->|imports| Types

    style Route fill:#ff6b6b,stroke:#fff,color:#fff
    style GitHub fill:#4ecdc4,stroke:#fff,color:#fff
    style Analyzer fill:#45b7d1,stroke:#fff,color:#fff
    style Generator fill:#96ceb4,stroke:#fff,color:#fff
    style AIClient fill:#ffeaa7,stroke:#333,color:#333
    style Prompts fill:#dfe6e9,stroke:#333,color:#333
    style Types fill:#a29bfe,stroke:#fff,color:#fff
```

---

## 🤖 AI Provider Architecture

```mermaid
flowchart TD
    subgraph Application
        Analyzer[Analyzer Service]
        Generator[Generator Service]
    end

    subgraph AILayer["AI Abstraction Layer"]
        Chat[chat function<br/>Unified Interface]
        Provider{AI_PROVIDER<br/>env variable}
    end

    subgraph WatsonXPath["WatsonX Path"]
        WXClient[WatsonX Client<br/>IBM SDK]
        WXAuth[IAM Authenticator]
        WXModel[granite-3-8b-instruct]
    end

    subgraph GroqPath["Groq Path"]
        GroqClient[Groq Client<br/>REST API]
        GroqModel1[granite-3.1-8b-instruct]
        GroqModel2[llama-3.3-70b-versatile]
    end

    Analyzer -->|AI Request| Chat
    Generator -->|AI Request| Chat

    Chat --> Provider
    Provider -->|watsonx| WXClient
    Provider -->|groq| GroqClient

    WXClient --> WXAuth
    WXAuth --> WXModel

    GroqClient --> GroqModel1
    GroqModel1 -.->|Fallback| GroqModel2

    WXClient -.->|Auto-Fallback| GroqClient
    GroqClient -.->|Auto-Fallback| WXClient

    style Application fill:#0d1117,stroke:#00d4ff,color:#fff
    style AILayer fill:#0d1117,stroke:#a855f7,color:#fff
    style WatsonXPath fill:#1a1a2e,stroke:#16c79a,color:#fff
    style GroqPath fill:#1a1a2e,stroke:#ffd700,color:#fff
```

---

## 📊 Score Calculation Flow

```mermaid
flowchart TD
    subgraph Analysis["AI Analysis Output"]
        Conv[Conventions Score<br/>0-100]
        Arch[Architecture Score<br/>0-100]
        Patt[Patterns Score<br/>0-100]
        Build[Build/Deploy Score<br/>0-100]
        Docs[Documentation Score<br/>0-100]
    end

    subgraph Calculation
        Avg[Average<br/>5 Dimensions]
        Overall[Overall Score<br/>0-100]
    end

    subgraph Impact["Business Impact"]
        Recovery[Recovery Rate<br/>Based on Score]
        Hours[Weekly Hours Saved<br/>11.4 × Recovery]
        Annual[Annual Savings<br/>Hours × Rate × Team × 52]
        Tokens[Token Efficiency<br/>40-80%]
    end

    subgraph Projection
        Current[Current Score]
        Boost[+45 Points]
        Projected[Projected Score<br/>88-98]
    end

    Conv --> Avg
    Arch --> Avg
    Patt --> Avg
    Build --> Avg
    Docs --> Avg

    Avg --> Overall

    Overall --> Recovery
    Recovery --> Hours
    Hours --> Annual
    Overall --> Tokens

    Overall --> Current
    Current --> Boost
    Boost --> Projected

    style Analysis fill:#0d1117,stroke:#00d4ff,color:#fff
    style Calculation fill:#0d1117,stroke:#a855f7,color:#fff
    style Impact fill:#0d1117,stroke:#16c79a,color:#fff
    style Projection fill:#0d1117,stroke:#ffd700,color:#fff
```

---

## 🔄 Error Handling & Fallback Strategy

```mermaid
flowchart TD
    Start[API Request]
    
    subgraph GitHub["GitHub API Layer"]
        GHCall[GitHub API Call]
        GHError{Error?}
        GHFallback[Try 'master' branch]
        GHDefault[Use defaults]
    end

    subgraph AI["AI Provider Layer"]
        AICall[AI API Call]
        AIError{Error?}
        AISwitch[Switch Provider<br/>WatsonX ↔ Groq]
        AIFallback[Use Template]
    end

    subgraph Stream["Stream Layer"]
        StreamError{Error?}
        ErrorEvent[Send Error Event]
        CloseStream[Close Stream]
    end

    Start --> GHCall
    GHCall --> GHError
    GHError -->|Yes| GHFallback
    GHFallback -->|Still fails| GHDefault
    GHError -->|No| AICall

    AICall --> AIError
    AIError -->|Yes| AISwitch
    AISwitch -->|Both fail| AIFallback
    AIError -->|No| StreamError

    StreamError -->|Yes| ErrorEvent
    ErrorEvent --> CloseStream
    StreamError -->|No| Success[Complete]

    style GitHub fill:#0d1117,stroke:#00d4ff,color:#fff
    style AI fill:#0d1117,stroke:#a855f7,color:#fff
    style Stream fill:#0d1117,stroke:#ff6b6b,color:#fff
```

---

## 🎯 Context File Generation Parallel Processing

```mermaid
flowchart TD
    Start[Start Generation Phase]
    
    subgraph Parallel["Promise.all - Parallel Execution"]
        direction TB
        T1[Task 1:<br/>Generate AGENTS.md]
        T2[Task 2:<br/>Generate Bob Mode]
        T3[Task 3:<br/>Generate .cursorrules]
        T4[Task 4:<br/>Generate CLAUDE.md]
        T5[Task 5:<br/>Generate Copilot]
        T6[Task 6:<br/>Bob Skill Static]
    end

    subgraph AIRequests["AI API Calls"]
        AI1[WatsonX/Groq<br/>Request 1]
        AI2[WatsonX/Groq<br/>Request 2]
        AI3[WatsonX/Groq<br/>Request 3]
        AI4[WatsonX/Groq<br/>Request 4]
        AI5[WatsonX/Groq<br/>Request 5]
    end

    Complete[All Files Generated]
    Assemble[Assemble Result]

    Start --> Parallel

    T1 --> AI1
    T2 --> AI2
    T3 --> AI3
    T4 --> AI4
    T5 --> AI5

    AI1 --> Complete
    AI2 --> Complete
    AI3 --> Complete
    AI4 --> Complete
    AI5 --> Complete
    T6 --> Complete

    Complete --> Assemble

    style Parallel fill:#0d1117,stroke:#16c79a,color:#fff
    style AIRequests fill:#0d1117,stroke:#a855f7,color:#fff
```

---

## 🗂️ File Organization Structure

```mermaid
graph TD
    Root[agentiq/]
    
    subgraph App["app/"]
        Pages[page.tsx<br/>layout.tsx<br/>globals.css]
        API[api/]
        Components[components/]
        Lib[lib/]
        Types[types/]
        Dashboard[dashboard/]
    end

    subgraph APIRoutes["api/"]
        Analyze[analyze/route.ts]
    end

    subgraph LibModules["lib/"]
        GitHub[github.ts]
        Analyzer[analyzer.ts]
        Generator[generator.ts]
        AIClient[ai-client.ts]
        Prompts[prompts.ts]
    end

    subgraph ComponentFiles["components/"]
        Stream[AnalysisStream.tsx]
        Score[ScoreGauge.tsx]
        KPI[KPICards.tsx]
        Deps[DependencyPanel.tsx]
        Recs[RecommendationsPanel.tsx]
        Files[FileViewer.tsx]
        Export[ExportPanel.tsx]
        Arch[ArchDiagram.tsx]
    end

    Root --> App
    App --> API
    App --> Components
    App --> Lib
    App --> Types
    App --> Dashboard

    API --> APIRoutes
    Lib --> LibModules
    Components --> ComponentFiles

    style Root fill:#0d1117,stroke:#00d4ff,color:#fff
    style App fill:#0d1117,stroke:#a855f7,color:#fff
    style APIRoutes fill:#1a1a2e,stroke:#16c79a,color:#fff
    style LibModules fill:#1a1a2e,stroke:#ffd700,color:#fff
    style ComponentFiles fill:#1a1a2e,stroke:#ff6b6b,color:#fff
```

---

## 🔐 Configuration & Environment Flow

```mermaid
flowchart LR
    subgraph Env[".env.local"]
        GH[GITHUB_TOKEN]
        WX1[WATSONX_AI_APIKEY]
        WX2[WATSONX_AI_SERVICE_URL]
        WX3[WATSONX_AI_PROJECT_ID]
        GQ[GROQ_API_KEY]
        PROV[AI_PROVIDER]
    end

    subgraph Runtime["Runtime Configuration"]
        GitHubClient[GitHub Client]
        WatsonXClient[WatsonX Client]
        GroqClient[Groq Client]
        Provider[Provider Selection]
    end

    subgraph Services["Service Layer"]
        GitHubSvc[GitHub Service]
        AnalyzerSvc[Analyzer Service]
        GeneratorSvc[Generator Service]
    end

    GH --> GitHubClient
    WX1 --> WatsonXClient
    WX2 --> WatsonXClient
    WX3 --> WatsonXClient
    GQ --> GroqClient
    PROV --> Provider

    GitHubClient --> GitHubSvc
    WatsonXClient --> Provider
    GroqClient --> Provider
    Provider --> AnalyzerSvc
    Provider --> GeneratorSvc

    style Env fill:#0d1117,stroke:#ffd700,color:#fff
    style Runtime fill:#0d1117,stroke:#a855f7,color:#fff
    style Services fill:#0d1117,stroke:#16c79a,color:#fff
```

---

## 📈 Performance Optimization Points

```mermaid
flowchart TD
    subgraph Current["Current Optimizations"]
        P1[✅ Parallel File Generation<br/>Promise.all]
        P2[✅ Content Truncation<br/>200 lines max]
        P3[✅ File Limits<br/>15 key files]
        P4[✅ GitHub Caching<br/>1 hour revalidate]
        P5[✅ Dependency Limit<br/>25 max]
    end

    subgraph Bottlenecks["Performance Bottlenecks"]
        B1[🔴 AI Generation<br/>10-15 seconds]
        B2[🟡 GitHub Tree Fetch<br/>1-2 seconds]
        B3[🟡 PR Extraction<br/>3-5 seconds]
    end

    subgraph Proposed["Proposed Improvements"]
        I1[💡 Redis Caching<br/>Save 70-90% AI calls]
        I2[💡 Request Queue<br/>Prevent rate limits]
        I3[💡 Incremental Analysis<br/>Diff-based updates]
        I4[💡 Streaming Generation<br/>Progressive results]
    end

    Current --> Bottlenecks
    Bottlenecks --> Proposed

    style Current fill:#0d1117,stroke:#16c79a,color:#fff
    style Bottlenecks fill:#0d1117,stroke:#ff6b6b,color:#fff
    style Proposed fill:#0d1117,stroke:#00d4ff,color:#fff
```

---

## 🎨 Component Interaction Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as Frontend UI
    participant SSE as EventSource
    participant API as /api/analyze
    participant GitHub as GitHub Service
    participant AI as AI Client
    participant Gen as Generator

    User->>UI: Enter GitHub URL
    UI->>SSE: Create EventSource
    SSE->>API: GET /api/analyze?url=...
    
    API->>GitHub: Parse & Fetch Metadata
    GitHub-->>API: Repo metadata
    API->>SSE: Event: fetching (15%)
    SSE->>UI: Update progress bar
    
    API->>GitHub: Fetch file tree
    GitHub-->>API: File list
    API->>SSE: Event: scanning (25%)
    SSE->>UI: Update progress bar
    
    API->>GitHub: Fetch key files
    GitHub-->>API: File contents
    API->>SSE: Event: scanning (35%)
    
    API->>AI: Analyze structure
    AI-->>API: Analysis scores
    API->>SSE: Event: analyzing (45%)
    
    API->>GitHub: Fetch PR comments
    GitHub-->>API: Comments
    API->>AI: Extract tribal knowledge
    AI-->>API: Rules
    API->>SSE: Event: tribal (60%)
    
    API->>Gen: Generate 6 files
    Gen->>AI: Parallel AI requests
    AI-->>Gen: Generated content
    Gen-->>API: All files
    API->>SSE: Event: generating (85%)
    
    API->>SSE: Event: complete (100%)
    SSE->>UI: Display results
    UI->>User: Show dashboard
    User->>UI: Download ZIP
```

---

**Generated by:** Bob (Plan Mode)  
**Diagram Count:** 12 comprehensive visualizations  
**Coverage:** Complete system architecture, data flows, and interactions