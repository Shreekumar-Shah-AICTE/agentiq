'use client';

import React from 'react';
import { StreamEvent } from '../types';

interface AnalysisStreamProps {
  events: StreamEvent[];
  currentProgress: number;
}

export default function AnalysisStream({ events, currentProgress }: AnalysisStreamProps) {
  // Hardcoded phases in order to show a full timeline
  const timelinePhases = [
    { key: 'fetching', label: 'GitHub Meta Pipeline' },
    { key: 'scanning', label: 'Codebase Scanning & Blob Mapping' },
    { key: 'analyzing', label: 'Granite Syntax & Convention Analysis' },
    { key: 'tribal', label: 'Tribal Knowledge PR Extraction' },
    { key: 'scoring', label: 'Quantifying Coverage Score Indexes' },
    { key: 'generating', label: 'Context File Synthesis' }
  ];

  // Helper to determine the status of a phase
  const getPhaseStatus = (phaseKey: string) => {
    // Find if we have an active or completed event matching this phase
    const activeIndex = events.findIndex(e => e.phase === phaseKey);
    if (activeIndex === -1) {
      return 'pending';
    }
    
    // If there is an event AFTER this phase in the events stream, it's completed
    const hasNext = events.some(e => {
      const idx = timelinePhases.findIndex(tp => tp.key === e.phase);
      const targetIdx = timelinePhases.findIndex(tp => tp.key === phaseKey);
      return idx > targetIdx || e.phase === 'complete';
    });

    if (hasNext) return 'completed';
    
    // Otherwise, check if current event phase matches this phase
    const currentEvent = events[events.length - 1];
    if (currentEvent && currentEvent.phase === phaseKey) {
      return 'active';
    }
    
    return 'completed';
  };

  return (
    <div 
      className="glass mono" 
      style={{
        width: '100%',
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4) var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        boxShadow: 'var(--glass-shadow)',
        border: '1px solid var(--glass-border)'
      }}
    >
      {/* Terminal Title Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--glass-border)',
        paddingBottom: 'var(--space-2)',
        marginBottom: '2px'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'hsl(0, 85%, 62%)', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'hsl(35, 95%, 58%)', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'hsl(145, 75%, 48%)', display: 'inline-block' }} />
        </div>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.05em' }}>
          AgentIQ Context Analysis Pipeline
        </span>
        <div style={{ width: '30px' }} /> {/* Spacer */}
      </div>

      {/* Timeline list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {timelinePhases.map((phase, idx) => {
          const status = getPhaseStatus(phase.key);
          
          let icon = <span style={{ width: '12px', height: '12px', borderRadius: '50%', border: '1.5px solid var(--text-ghost)', display: 'inline-block' }} />;
          let textStyle = { color: 'var(--text-muted)' };
          let badge = null;

          if (status === 'completed') {
            icon = <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '13px' }}>✓</span>;
            textStyle = { color: 'var(--text-secondary)' };
          } else if (status === 'active') {
            icon = (
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--cyan)',
                display: 'inline-block',
                animation: 'pulseCyan 1.5s infinite'
              }} />
            );
            textStyle = { color: 'white' };
            // Find current message in events
            const matchingEvent = [...events].reverse().find(e => e.phase === phase.key);
            if (matchingEvent) {
              badge = (
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--cyan)',
                  marginTop: '4px',
                  paddingLeft: '20px',
                  lineHeight: 1.4
                }}>
                  &gt; {matchingEvent.message}
                </div>
              );
            }
          }

          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px' }}>
                  {icon}
                </div>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: status === 'active' ? 600 : 500,
                  ...textStyle
                }}>
                  {phase.label}
                </span>
              </div>
              {badge}
            </div>
          );
        })}
      </div>

      {/* Progress Bar bottom */}
      <div style={{ marginTop: 'var(--space-2)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          marginBottom: '4px'
        }}>
          <span>Synchronization Progress</span>
          <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>{currentProgress}%</span>
        </div>
        <div style={{
          height: '6px',
          backgroundColor: 'var(--bg-elevated)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            height: '100%',
            width: `${currentProgress}%`,
            background: 'var(--gradient-brand)',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 0 10px var(--cyan)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </div>
  );
}
