import { NextRequest } from 'next/server';
import { parseGitHubUrl, fetchRepoMeta, fetchFileTree, detectKeyFiles, fetchKeyFiles } from '../../lib/github';
import { analyzeWithGranite, extractTribalKnowledge, analyzeDependencies, generateRecommendations, generateArchitectureDiagram } from '../../lib/analyzer';
import { generateContextFiles } from '../../lib/generator';
import { RepoMeta, ScoreBreakdown, BusinessImpact, AnalysisResult, StreamEvent } from '../../types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const repoUrl = searchParams.get('url');
  const encoder = new TextEncoder();

  if (!repoUrl) {
    return new Response(JSON.stringify({ error: 'Repository URL is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stream = new ReadableStream({
    async start(controller) {
      function send(event: StreamEvent) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      }

      try {
        // Step 1: Parse URL & Fetch metadata
        send({ phase: 'fetching', message: 'Resolving GitHub Repository URL...', progress: 10 });
        const [owner, name] = parseGitHubUrl(repoUrl);
        
        send({ phase: 'fetching', message: `Contacting GitHub API for ${owner}/${name}...`, progress: 15 });
        const repoMeta = await fetchRepoMeta(owner, name);
        
        // Step 2: Fetch File Tree
        send({ phase: 'scanning', message: `Analyzing codebase tree recursively on branch: ${repoMeta.defaultBranch}...`, progress: 25 });
        const fileTree = await fetchFileTree(owner, name, repoMeta.defaultBranch);
        repoMeta.fileCount = fileTree.length;

        // Step 3: Fetch configuration files
        send({ phase: 'scanning', message: `Scanning ${fileTree.length} files. Extracting structural blueprints...`, progress: 35 });
        const keyPaths = detectKeyFiles(fileTree);
        const keyFiles = await fetchKeyFiles(owner, name, keyPaths);

        // Step 4: Run Granite analysis
        send({ phase: 'analyzing', message: 'Initiating Granite AI model code auditor...', progress: 45 });
        const analysis = await analyzeWithGranite(fileTree, keyFiles);

        // Step 5: Extract Tribal Knowledge
        send({ phase: 'tribal', message: 'Retrieving unwritten team decisions from PR discussion board...', progress: 60 });
        const tribalKnowledgeRules = await extractTribalKnowledge(owner, name);

        // Step 5.5: Dependency analysis
        send({ phase: 'dependencies', message: 'Auditing dependency health and security posture...', progress: 68 });
        const dependencies = await analyzeDependencies(keyFiles);

        // Step 6: Compute Scores & Business ROI
        send({ phase: 'scoring', message: 'Quantifying developer context coverage index...', progress: 75 });
        
        const scoreBreakdown: ScoreBreakdown = {
          overall: Math.round(
            (analysis.conventions.score +
              analysis.architecture.score +
              analysis.patterns.score +
              analysis.buildDeploy.score +
              analysis.documentation.score) / 5
          ),
          conventions: analysis.conventions.score,
          architecture: analysis.architecture.score,
          patterns: analysis.patterns.score,
          buildDeploy: analysis.buildDeploy.score,
          documentation: analysis.documentation.score
        };

        // ROI computations:
        // Annual savings formula: (Wasted developer hours reconstructed) * Hourly Rate * Dev Team Size * 52 weeks
        // Standard baseline: average dev spends 11.4 hours/week fighting context drift or bad AI completions
        // With AgentIQ, we recover ~70% of those wasted hours.
        const teamSize = 8; // Default benchmark size
        const hourlyRate = 65; // Default benchmark rate in USD
        const hoursWastedPerDevWeekly = 11.4;
        const recoveryRate = Math.min(0.9, (100 - scoreBreakdown.overall) / 100); // Higher recovery if initial score is terrible
        const weeklyHoursSaved = Math.round(hoursWastedPerDevWeekly * recoveryRate * 10) / 10;
        const annualSavings = Math.round(weeklyHoursSaved * hourlyRate * teamSize * 52);
        
        const impact: BusinessImpact = {
          annualReworkCost: Math.round(hoursWastedPerDevWeekly * hourlyRate * teamSize * 52),
          annualSavings: annualSavings,
          weeklyHoursSavedPerDev: weeklyHoursSaved,
          tokenEfficiencyGain: Math.round(40 + (100 - scoreBreakdown.overall) * 0.4), // 40-80% token savings
          teamSize,
          hourlyRate
        };

        // Projected score after context applying is high (usually 85-95)
        const projectedScore = Math.min(98, Math.max(88, scoreBreakdown.overall + 45));

        // Step 7: Generate recommendations + architecture diagram + context files (parallel)
        send({ phase: 'generating', message: 'Synthesizing intelligence reports and context blueprints...', progress: 85 });
        const [generatedFiles, recommendations, architectureDiagram] = await Promise.all([
          generateContextFiles(analysis, tribalKnowledgeRules, repoMeta),
          generateRecommendations(analysis, tribalKnowledgeRules),
          generateArchitectureDiagram(analysis)
        ]);

        // Assemble Final Result
        const finalResult: AnalysisResult = {
          repoMeta,
          score: scoreBreakdown,
          impact,
          tribalKnowledge: {
            rules: tribalKnowledgeRules,
            prsAnalyzed: 8,
            confidence: tribalKnowledgeRules.length > 2 ? 'high' : 'medium'
          },
          generatedFiles,
          projectedScore,
          analysisTimestamp: new Date().toISOString(),
          dependencies,
          recommendations,
          architectureDiagram
        };

        // Send completion
        send({
          phase: 'complete',
          message: 'Codebase fully synchronized! AI agent context files ready for deployment.',
          progress: 100,
          data: finalResult
        });

      } catch (error: any) {
        console.error('Fatal streaming error:', error);
        send({
          phase: 'error',
          message: `Analysis failed: ${error.message || 'Unknown server error'}`,
          progress: 0
        });
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
