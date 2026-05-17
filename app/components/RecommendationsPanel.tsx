'use client';

import React from 'react';
import { Target, AlertCircle, Wrench, Bookmark } from 'lucide-react';
import { Recommendation } from '../types';

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
}

export default function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  // Priority sorting: critical -> high -> medium -> low
  const sortedRecs = [...recommendations].sort((a, b) => {
    const scoreMap = { critical: 4, high: 3, medium: 2, low: 1 };
    return (scoreMap[b.impact] || 0) - (scoreMap[a.impact] || 0);
  });

  const getImpactStyles = (impact: Recommendation['impact']) => {
    switch (impact) {
      case 'critical':
        return {
          bg: 'hsla(350, 100%, 60%, 0.12)',
          border: '1px solid hsla(350, 100%, 60%, 0.35)',
          color: '#ff4a6b',
          text: 'CRITICAL'
        };
      case 'high':
        return {
          bg: 'hsla(20, 100%, 60%, 0.12)',
          border: '1px solid hsla(20, 100%, 60%, 0.3)',
          color: '#ff7c43',
          text: 'HIGH'
        };
      case 'medium':
        return {
          bg: 'hsla(192, 100%, 55%, 0.12)',
          border: '1px solid hsla(192, 100%, 55%, 0.3)',
          color: 'var(--cyan)',
          text: 'MEDIUM'
        };
      case 'low':
      default:
        return {
          bg: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: 'var(--text-secondary)',
          text: 'LOW'
        };
    }
  };

  return (
    <div className="glass" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Target size={20} color="var(--cyan)" />
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'white' }}>
            Prioritized Action Recommendations
          </h3>
        </div>
        <span 
          className="mono" 
          style={{
            fontSize: 'var(--text-xs)',
            backgroundColor: 'hsla(265, 90%, 65%, 0.1)',
            color: 'var(--purple)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid hsla(265, 90%, 65%, 0.2)'
          }}
        >
          {recommendations.length} items prioritized
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sortedRecs.map((rec) => {
          const styles = getImpactStyles(rec.impact);
          return (
            <div 
              key={rec.id} 
              className="glass"
              style={{
                padding: 'var(--space-4) var(--space-5)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {/* Header row: title + impact badge + dimension tag */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                  <AlertCircle size={18} style={{ color: styles.color, flexShrink: 0 }} />
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'white', margin: 0 }}>
                    {rec.title}
                  </h4>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Dimension Tag */}
                  <span style={{
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 700,
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    color: 'var(--text-secondary)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {rec.dimension}
                  </span>
                  
                  {/* Impact Badge */}
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    backgroundColor: styles.bg,
                    color: styles.color,
                    border: styles.border,
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    {styles.text}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {rec.description}
              </p>

              {/* Action Box */}
              <div style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-3) var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9px', color: 'var(--cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <Wrench size={10} /> Actionable Fix Instruction
                </div>
                <div className="mono" style={{ fontSize: 'var(--text-xs)', color: 'white', lineHeight: 1.4, wordBreak: 'break-word' }}>
                  {rec.action}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
