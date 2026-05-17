export interface RepoMeta {
  owner: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  fileCount: number;
  defaultBranch: string;
}

export interface ScoreBreakdown {
  overall: number;
  conventions: number;
  architecture: number;
  patterns: number;
  buildDeploy: number;
  documentation: number;
}

export interface BusinessImpact {
  annualReworkCost: number;
  annualSavings: number;
  weeklyHoursSavedPerDev: number;
  tokenEfficiencyGain: number;
  teamSize: number;
  hourlyRate: number;
}

export interface TribalKnowledge {
  rules: string[];
  prsAnalyzed: number;
  confidence: 'high' | 'medium' | 'low';
}

export interface GeneratedFiles {
  agentsMd: string;
  bobMode: string;
  bobSkill: string;
  cursorRules: string;
  claudeMd: string;
  copilotInstructions: string;
}

export interface DependencyInfo {
  name: string;
  version: string;
  type: 'production' | 'dev';
  risk: 'safe' | 'outdated' | 'heavy' | 'deprecated';
  note?: string; // e.g. "Consider replacing with date-fns"
}

export interface Recommendation {
  id: string;
  title: string;
  dimension: 'conventions' | 'architecture' | 'patterns' | 'buildDeploy' | 'documentation';
  impact: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  action: string; // Exact actionable instruction
}

export interface AnalysisResult {
  repoMeta: RepoMeta;
  score: ScoreBreakdown;
  impact: BusinessImpact;
  tribalKnowledge: TribalKnowledge;
  generatedFiles: GeneratedFiles;
  projectedScore: number; // Score AFTER applying generated context
  analysisTimestamp: string;
  dependencies: DependencyInfo[];
  recommendations: Recommendation[];
  architectureDiagram: string; // Mermaid markup string
}

export interface StreamEvent {
  phase: 'fetching' | 'scanning' | 'analyzing' | 'tribal' | 'dependencies' | 'scoring' | 'generating' | 'complete' | 'error';
  message: string;
  progress: number; // 0-100
  data?: AnalysisResult;
}

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number; // milliseconds
  message: string;
  timestamp: string;
  details?: {
    provider?: string; // 'watsonx' | 'groq'
    model?: string;
    rateLimit?: {
      remaining: number;
      limit: number;
      reset: string;
    };
    error?: string;
  };
}

export interface HealthCheckResponse {
  overall: 'healthy' | 'degraded' | 'down';
  services: {
    watsonx: ServiceHealth;
    github: ServiceHealth;
  };
  timestamp: string;
  version: string;
  uptime: number; // process uptime in seconds
}
