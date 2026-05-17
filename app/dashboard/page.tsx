'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Cpu, RefreshCw, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import ScoreGauge from '../components/ScoreGauge';
import KPICards from '../components/KPICards';
import DimensionBars from '../components/DimensionBars';
import AnalysisStream from '../components/AnalysisStream';
import FileViewer from '../components/FileViewer';
import ExportPanel from '../components/ExportPanel';
import Confetti from '../components/Confetti';
import { AnalysisResult, StreamEvent } from '../types';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const repoUrl = searchParams.get('url') || '';
  
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);

  const startAnalysis = () => {
    if (!repoUrl) {
      setError('No repository URL was provided.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setProgress(0);
    setError(null);
    setResult(null);
    setStreamEvents([]);

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Set up EventSource SSE connection
    const sseUrl = `/api/analyze?url=${encodeURIComponent(repoUrl)}`;
    const es = new EventSource(sseUrl);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const parsed: StreamEvent = JSON.parse(event.data);
        
        // Append event to stream logs
        setStreamEvents((prev) => [...prev, parsed]);
        setProgress(parsed.progress);

        if (parsed.phase === 'complete' && parsed.data) {
          setResult(parsed.data);
          setLoading(false);
          es.close();
        } else if (parsed.phase === 'error') {
          setError(parsed.message);
          setLoading(false);
          es.close();
        }
      } catch (err) {
        console.error('Error parsing SSE event data:', err);
      }
    };

    es.onerror = (err) => {
      console.error('EventSource connection error:', err);
      setError('The server connection terminated unexpectedly. Please retry.');
      setLoading(false);
      es.close();
    };
  };

  useEffect(() => {
    startAnalysis();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [repoUrl]);

  const handleBack = () => {
    router.push('/');
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    })
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-12)' }}>
      <Confetti active={!!result && !loading && !error} />
      
      {/* NAVBAR */}
      <header className="navbar" style={{ padding: 'var(--space-3) 0', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <button 
              onClick={handleBack}
              style={{
                background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '50%', transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <ArrowLeft size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={20} color="var(--cyan)" />
              <span style={{ fontSize: 'var(--text-base)', fontWeight: 800, background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                AgentIQ Audit Dashboard
              </span>
            </div>
          </div>

          {repoUrl && (
            <div 
              className="glass mono" 
              style={{
                padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', color: 'var(--cyan)',
                border: '1px solid hsla(192, 100%, 55%, 0.25)', backgroundColor: 'hsla(192, 100%, 55%, 0.05)'
              }}
            >
              repo: {repoUrl.replace('https://github.com/', '')}
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="container" style={{ flex: 1, marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        
        {/* Loading / Scanning stream overlay */}
        {loading && (
          <div style={{ maxWidth: '640px', width: '100%', margin: 'var(--space-12) auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Sparkles size={32} color="var(--cyan)" className="animate-pulse" style={{ animation: 'pulseCyan 1.5s infinite', alignSelf: 'center', margin: '0 auto var(--space-2) auto' }} />
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'white' }}>
                Auditing Repository Quality
              </h2>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                IBM Granite is auditing conventions and extracting PR discussions...
              </p>
            </div>
            <AnalysisStream events={streamEvents} currentProgress={progress} />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass" style={{ maxWidth: '600px', width: '100%', margin: 'var(--space-12) auto', padding: 'var(--space-6)', borderLeft: '4px solid var(--danger)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--danger)' }}>
              <AlertTriangle size={24} />
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Codebase Audit Failed</h3>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{error}</p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
              <button onClick={handleBack} className="btn-secondary">Go Back</button>
              <button onClick={startAnalysis} className="btn-primary"><RefreshCw size={16} /> Try Again</button>
            </div>
          </div>
        )}

        {/* Audit Results (Main View) */}
        {result && !loading && !error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            {/* KPI Metrics Dashboard Row */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" custom={0}>
              <KPICards score={result.score} impact={result.impact} projectedScore={result.projectedScore} />
            </motion.div>

            {/* Gauge dial and Dimension progress grid */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" custom={1}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)', width: '100%' }}>
                {/* Left Circular Gauge */}
                <div className="glass" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ScoreGauge score={result.score.overall} label="Current AgentIQ Score" />
                </div>
                {/* Right Horizontal bars breakdown */}
                <div className="glass" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'white', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>
                    Quantified Effectiveness Breakdown
                  </h3>
                  <DimensionBars score={result.score} />
                </div>
              </div>
            </motion.div>

            {/* Tribal Knowledge Board */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" custom={2}>
              <div className="glass" style={{ padding: 'var(--space-5) var(--space-6)', backgroundColor: 'var(--bg-surface)', borderLeft: '3px solid var(--purple)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
                  <BookOpen size={20} color="var(--purple)" />
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'white' }}>
                    Tribal Knowledge Rules Board (PR discussions analyzed)
                  </h3>
                </div>
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)', paddingLeft: 0, listStyleType: 'none' }}>
                  {result.tribalKnowledge.rules.map((rule, index) => (
                    <li key={index} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-elevated)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', lineHeight: 1.4 }}>
                      <span style={{ color: 'var(--purple)', fontWeight: 700, marginRight: '6px' }}>#0{index + 1}</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Multi-IDE file editor tabs */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" custom={3}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'white' }}>
                    Multi-IDE Alignment Context Blueprints
                  </h3>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                    Auto-optimized for Cursor, Copilot, CLAUDE, & Bob
                  </span>
                </div>
                <FileViewer files={result.generatedFiles} repoName={result.repoMeta.name} />
              </div>
            </motion.div>

            {/* Bottom Export panel */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" custom={4}>
              <ExportPanel files={result.generatedFiles} repoName={result.repoMeta.name} onReRun={startAnalysis} />
            </motion.div>

          </div>
        )}
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <React.Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={32} color="var(--cyan)" className="animate-pulse" /></div>}>
      <DashboardContent />
    </React.Suspense>
  );
}
