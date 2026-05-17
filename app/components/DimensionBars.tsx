'use client';

import React, { useEffect, useState } from 'react';
import { ScoreBreakdown } from '../types';

interface DimensionBarsProps {
  score: ScoreBreakdown;
}

export default function DimensionBars({ score }: DimensionBarsProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger transition shortly after mounting
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const dimensions = [
    {
      label: 'Code Conventions & Naming',
      value: score.conventions,
      desc: 'Consistency of naming rules, variables, structures, and style configurations.'
    },
    {
      label: 'Architectural Blueprint Integrity',
      value: score.architecture,
      desc: 'Clarity of layer boundaries, module interactions, and project design patterns.'
    },
    {
      label: 'Code Flow & Error Patterns',
      value: score.patterns,
      desc: 'Robustness of asynchronous queries, custom error wrappers, and database abstractions.'
    },
    {
      label: 'Build Operations & Pipeline Configuration',
      value: score.buildDeploy,
      desc: 'Presence of standard testing frameworks, build processes, and deployment automation.'
    },
    {
      label: 'Workspace Documentation Completeness',
      value: score.documentation,
      desc: 'Readiness of onboarding files, API documentation, and instructions files for AI agents.'
    }
  ];

  // Helper to get semantic color based on value
  const getSemanticColor = (val: number) => {
    if (val >= 81) return 'var(--score-excellent)';
    if (val >= 61) return 'var(--score-good)';
    if (val >= 31) return 'var(--score-warning)';
    return 'var(--score-critical)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%' }}>
      {dimensions.map((dim, index) => {
        const color = getSemanticColor(dim.value);
        return (
          <div 
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {/* Label and Score Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'white'
                }}>
                  {dim.label}
                </span>
                <span style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  marginTop: '1px'
                }}>
                  {dim.desc}
                </span>
              </div>
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: color
              }}>
                {dim.value}/100
              </span>
            </div>

            {/* Progress Bar Track */}
            <div style={{
              height: '8px',
              width: '100%',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Animated Progress Fill */}
              <div style={{
                height: '100%',
                width: animate ? `${dim.value}%` : '0%',
                backgroundColor: color,
                borderRadius: 'var(--radius-full)',
                boxShadow: `0 0 10px ${color}80`,
                transition: `width 1.2s var(--ease-out-expo) ${index * 100}ms, background-color 0.5s ease`,
                position: 'absolute',
                top: 0,
                left: 0
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
