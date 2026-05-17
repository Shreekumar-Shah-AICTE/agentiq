'use client';

import React from 'react';
import { ShieldCheck, ShieldAlert, Layers } from 'lucide-react';
import { DependencyInfo } from '../types';

interface DependencyPanelProps {
  dependencies: DependencyInfo[];
}

export default function DependencyPanel({ dependencies }: DependencyPanelProps) {
  // Sort: deprecated -> heavy -> outdated -> safe
  const sortedDeps = [...dependencies].sort((a, b) => {
    const scoreMap = { deprecated: 4, heavy: 3, outdated: 2, safe: 1 };
    return (scoreMap[b.risk] || 0) - (scoreMap[a.risk] || 0);
  });

  const getRiskStyles = (risk: DependencyInfo['risk']) => {
    switch (risk) {
      case 'deprecated':
        return {
          bg: 'hsla(350, 100%, 60%, 0.1)',
          border: '1px solid hsla(350, 100%, 60%, 0.3)',
          color: '#ff4a6b',
          text: 'DEPRECATED',
          pulse: true
        };
      case 'heavy':
        return {
          bg: 'hsla(20, 100%, 60%, 0.1)',
          border: '1px solid hsla(20, 100%, 60%, 0.3)',
          color: '#ff7c43',
          text: 'HEAVY',
          pulse: false
        };
      case 'outdated':
        return {
          bg: 'hsla(45, 100%, 50%, 0.1)',
          border: '1px solid hsla(45, 100%, 50%, 0.3)',
          color: '#ffc72c',
          text: 'OUTDATED',
          pulse: false
        };
      case 'safe':
      default:
        return {
          bg: 'hsla(145, 80%, 50%, 0.1)',
          border: '1px solid hsla(145, 80%, 50%, 0.3)',
          color: '#34d399',
          text: 'SAFE',
          pulse: false
        };
    }
  };

  const getRiskIcon = (risk: DependencyInfo['risk']) => {
    if (risk === 'safe') {
      return <ShieldCheck size={14} style={{ color: '#34d399' }} />;
    }
    return <ShieldAlert size={14} style={{ color: risk === 'deprecated' ? '#ff4a6b' : risk === 'heavy' ? '#ff7c43' : '#ffc72c' }} />;
  };

  return (
    <div className="glass" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layers size={20} color="var(--cyan)" />
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'white' }}>
            Dependency & Security Intelligence
          </h3>
        </div>
        <span 
          className="mono" 
          style={{
            fontSize: 'var(--text-xs)',
            backgroundColor: 'hsla(192, 100%, 55%, 0.1)',
            color: 'var(--cyan)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid hsla(192, 100%, 55%, 0.2)'
          }}
        >
          {dependencies.length} packages scanned
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', padding: '0 12px', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div>Package Name</div>
          <div>Installed Version</div>
          <div>Environment</div>
          <div>Health Audit</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '350px', overflowY: 'auto', paddingRight: '4px' }}>
          {sortedDeps.map((dep, i) => {
            const styles = getRiskStyles(dep.risk);
            return (
              <div 
                key={i} 
                className="glass-interactive"
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--glass-border)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', alignItems: 'center', width: '100%' }}>
                  <div style={{ fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {getRiskIcon(dep.risk)}
                    {dep.name}
                  </div>
                  <div className="mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    {dep.version}
                  </div>
                  <div>
                    <span style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 700,
                      backgroundColor: dep.type === 'dev' ? 'rgba(255,255,255,0.06)' : 'rgba(0,212,255,0.06)',
                      color: dep.type === 'dev' ? 'var(--text-secondary)' : 'var(--cyan)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: dep.type === 'dev' ? '1px solid rgba(255,255,255,0.1)' : '1px solid hsla(192, 100%, 55%, 0.15)'
                    }}>
                      {dep.type}
                    </span>
                  </div>
                  <div>
                    <span 
                      className={styles.pulse ? 'animate-pulse' : ''}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '10px',
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        backgroundColor: styles.bg,
                        color: styles.color,
                        border: styles.border,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        animationDuration: '1.5s'
                      }}
                    >
                      {styles.text}
                    </span>
                  </div>
                </div>

                {dep.note && (
                  <div style={{ 
                    fontSize: 'var(--text-xs)', 
                    color: 'var(--text-secondary)', 
                    padding: '8px 12px', 
                    borderRadius: '4px', 
                    backgroundColor: 'rgba(0,0,0,0.2)', 
                    borderLeft: `2px solid ${styles.color}`,
                    marginTop: '2px',
                    lineHeight: 1.4
                  }}>
                    {dep.note}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
