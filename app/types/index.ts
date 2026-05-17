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

export interface AnalysisResult {
  repoMeta: RepoMeta;
  score: ScoreBreakdown;
  impact: BusinessImpact;
  tribalKnowledge: TribalKnowledge;
  generatedFiles: GeneratedFiles;
  projectedScore: number; // Score AFTER applying generated context
  analysisTimestamp: string;
}

export interface StreamEvent {
  phase: 'fetching' | 'scanning' | 'analyzing' | 'tribal' | 'scoring' | 'generating' | 'complete' | 'error';
  message: string;
  progress: number; // 0-100
  data?: AnalysisResult;
}
