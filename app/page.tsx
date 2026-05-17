'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Cpu, ShieldAlert, Award, FileSpreadsheet, Bot, Globe } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const pillarsRef = useRef(null);
  const pillarsInView = useInView(pillarsRef, { once: true });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
    })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!repoUrl.trim()) {
      setError('Please provide a repository URL.');
      return;
    }

    if (!repoUrl.toLowerCase().includes('github.com')) {
      setError('Only public GitHub repositories are supported at this time.');
      return;
    }

    setSubmitting(true);
    router.push(`/dashboard?url=${encodeURIComponent(repoUrl.trim())}`);
  };

  const headline = "How Effective Is AI On Your Codebase?".split(" ");

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* NAVBAR */}
      <header className="navbar" style={{ padding: 'var(--space-4) 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={24} color="var(--cyan)" />
            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 800, letterSpacing: '-0.02em', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              AgentIQ
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <a 
              href="https://github.com/Shreekumar-Shah-AICTE/agentiq" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
            <button 
              onClick={() => router.push('/dashboard?url=https://github.com/Shreekumar-Shah-AICTE/agentiq')}
              className="btn-secondary"
              style={{ padding: '6px 14px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)' }}
            >
              Try Demo
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'var(--space-12) 0 var(--space-8) 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--space-6)', position: 'relative' }}>
          
          {/* Floating stat card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass animate-float"
            style={{
              padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600,
              color: 'var(--cyan)', backgroundColor: 'hsla(192, 100%, 55%, 0.08)', border: '1px solid hsla(192, 100%, 55%, 0.25)',
              display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 0 20px hsla(192,100%,55%,0.08)'
            }}
          >
            <ShieldAlert size={14} />
            AI agent leakage: 11.4 developer hours wasted weekly per engineer
          </motion.div>

          {/* Headline titles */}
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <motion.h1 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
              initial="hidden" animate="visible"
              className="hero-headline" 
              style={{
                fontSize: 'var(--text-hero)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1,
                background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}
            >
              {headline.map((word, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', fontWeight: 400, maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}
            >
              Audit your repository context, extract unwritten tribal knowledge, and heal your AI coding agent's readiness score.
            </motion.p>
          </div>

          {/* Repo Input Form Wrapper */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
            style={{ width: '100%', maxWidth: '640px', marginTop: 'var(--space-3)' }}
          >
            <form onSubmit={handleSubmit}>
              <div 
                className="glass"
                style={{
                  display: 'flex', alignItems: 'center', padding: '6px', borderRadius: 'var(--radius-md)',
                  border: '1px solid hsla(192, 100%, 55%, 0.2)', backgroundColor: 'var(--glass-bg)',
                  boxShadow: 'var(--glass-shadow)', position: 'relative'
                }}
              >
                <div style={{ paddingLeft: 'var(--space-3)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Paste public GitHub URL (e.g. https://github.com/owner/repo)..."
                  value={repoUrl}
                  onChange={(e) => { setRepoUrl(e.target.value); setError(''); }}
                  disabled={submitting}
                  style={{
                    background: 'transparent', border: 'none', color: 'white', fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)', flex: 1, padding: '12px var(--space-3)', outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                  style={{
                    padding: '12px 24px', borderRadius: 'var(--radius-sm)', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Analyzing...' : 'Audit Codebase'}
                </button>
              </div>
            </form>
            {error && (
              <p style={{ color: 'var(--danger)', fontSize: 'var(--text-xs)', marginTop: '8px', textAlign: 'left', paddingLeft: 'var(--space-4)', fontWeight: 600 }}>
                {error}
              </p>
            )}
          </motion.div>

          {/* Underneath Statistics Crisis Block */}
          <div 
            ref={statsRef}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)', width: '100%', maxWidth: '800px', marginTop: 'var(--space-6)' }}
          >
            <motion.div custom={0} variants={cardVariants} initial="hidden" animate={statsInView ? "visible" : "hidden"} className="glass" style={{ padding: 'var(--space-4) var(--space-5)', textAlign: 'left', borderLeft: '2px solid var(--danger)' }}>
              <h3 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'white', fontFamily: 'var(--font-mono)' }}>1.7×</h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                More technical issues introduced by AI coding without repository context synchronization.
              </p>
            </motion.div>
            <motion.div custom={1} variants={cardVariants} initial="hidden" animate={statsInView ? "visible" : "hidden"} className="glass" style={{ padding: 'var(--space-4) var(--space-5)', textAlign: 'left', borderLeft: '2px solid var(--warning)' }}>
              <h3 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'white', fontFamily: 'var(--font-mono)' }}>43%</h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                Of generated code blocks require manual developer rewrites due to missing style guides or naming conventions.
              </p>
            </motion.div>
            <motion.div custom={2} variants={cardVariants} initial="hidden" animate={statsInView ? "visible" : "hidden"} className="glass" style={{ padding: 'var(--space-4) var(--space-5)', textAlign: 'left', borderLeft: '2px solid var(--cyan)' }}>
              <h3 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'white', fontFamily: 'var(--font-mono)' }}>96%</h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                Of engineers report not trusting default LLM prompts for mission-critical software refactoring.
              </p>
            </motion.div>
          </div>

          {/* Three pillars overview */}
          <div ref={pillarsRef} style={{ marginTop: 'var(--space-8)', width: '100%', maxWidth: '960px' }}>
            <motion.h2 
              initial={{ opacity: 0 }} animate={pillarsInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.5 }}
              style={{ fontSize: 'var(--text-xl)', color: 'white', fontWeight: 800, marginBottom: 'var(--space-6)' }}
            >
              The Three Pillars of AI Governance
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
              <motion.div custom={0} variants={cardVariants} initial="hidden" animate={pillarsInView ? "visible" : "hidden"} className="glass" style={{ padding: 'var(--space-5)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <motion.div whileHover={{ rotate: [0, 5, -5, 0] }} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'hsla(192, 100%, 55%, 0.1)', border: '1px solid hsla(192, 100%, 55%, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)' }}>
                  <Award size={20} />
                </motion.div>
                <h4 style={{ fontSize: 'var(--text-base)', color: 'white', fontWeight: 700, marginTop: '4px' }}>1. AUDIT — Quantify Coverage</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Scan code patterns recursively. IBM Granite evaluates conventions, architecture layers, error boundary systems, and produces a quantified scoring index.
                </p>
              </motion.div>

              <motion.div custom={1} variants={cardVariants} initial="hidden" animate={pillarsInView ? "visible" : "hidden"} className="glass" style={{ padding: 'var(--space-5)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <motion.div whileHover={{ rotate: [0, 5, -5, 0] }} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'hsla(265, 90%, 65%, 0.1)', border: '1px solid hsla(265, 90%, 65%, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)' }}>
                  <Cpu size={20} />
                </motion.div>
                <h4 style={{ fontSize: 'var(--text-base)', color: 'white', fontWeight: 700, marginTop: '4px' }}>2. HEAL — Context Synchronization</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Generate optimized synchronization context maps. Produce specialized blueprints supporting IBM Bob, Cursor Editor, GitHub Copilot, and Claude.
                </p>
              </motion.div>

              <motion.div custom={2} variants={cardVariants} initial="hidden" animate={pillarsInView ? "visible" : "hidden"} className="glass" style={{ padding: 'var(--space-5)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <motion.div whileHover={{ rotate: [0, 5, -5, 0] }} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'hsla(145, 75%, 48%, 0.1)', border: '1px solid hsla(145, 75%, 48%, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                  <FileSpreadsheet size={20} />
                </motion.div>
                <h4 style={{ fontSize: 'var(--text-base)', color: 'white', fontWeight: 700, marginTop: '4px' }}>3. PROVE — Quantified ROI Proof</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Benchmark savings directly. Turn technical quality metrics into concrete financial ROI proof, showing developer hours saved and annual waste recovery.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Powered By Section */}
          <section style={{ textAlign: 'center', padding: 'var(--space-10) 0', marginTop: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-4)' }}>
              Powered By
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="glass" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: 'var(--radius-full)' }}>
                <Cpu size={20} color="var(--cyan)" />
                <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>IBM Granite 3.1</span>
              </div>
              <div className="glass" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: 'var(--radius-full)' }}>
                <Bot size={20} color="var(--purple)" />
                <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>IBM Bob IDE</span>
              </div>
              <div className="glass" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: 'var(--radius-full)' }}>
                <Globe size={20} color="var(--text-secondary)" />
                <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>Next.js 16</span>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: 'var(--space-6) 0', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', backgroundColor: 'hsla(228, 28%, 4%, 0.4)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <span>AgentIQ &copy; 2026. IBM Bob Hackathon Championship Submission.</span>
          <span>Designed & Architected by Shree Shah. Powered by IBM Granite.</span>
        </div>
      </footer>
    </div>
  );
}
