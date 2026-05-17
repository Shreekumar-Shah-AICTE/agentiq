'use client';

import React, { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  score: number;
  label: string;
  animate?: boolean;
}

export default function ScoreGauge({ score, label, animate = true }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);

  // SVG parameters
  const radius = 90;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius; // ~565.48
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }

    setDisplayScore(0);
    const duration = 1500; // 1.5s for count-up
    const startTime = performance.now();

    let animationFrameId: number;

    const updateScore = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out expo formula
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(ease * score);
      
      setDisplayScore(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateScore);
      }
    };

    animationFrameId = requestAnimationFrame(updateScore);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [score, animate]);

  // Determine semantic color and status label
  let strokeColor = 'var(--score-critical)';
  let statusText = '⚠️ CRITICAL CONTEXT DRIFT';
  let badgeClass = 'badge-critical';

  if (score >= 81) {
    strokeColor = 'var(--score-excellent)';
    statusText = '🚀 AI AGENT READY';
    badgeClass = 'badge-excellent';
  } else if (score >= 61) {
    strokeColor = 'var(--score-good)';
    statusText = '✅ CONVENTIONS HEALTHY';
    badgeClass = 'badge-good';
  } else if (score >= 31) {
    strokeColor = 'var(--score-warning)';
    statusText = '⚠️ NEEDS OPTIMIZATION';
    badgeClass = 'badge-warning';
  }

  return (
    <div className="flex-col-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
      <div style={{ position: 'relative', width: '220px', height: '220px' }}>
        {/* SVG Circle Gauge */}
        <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="100"
            cy="110"
            r={radius}
            fill="transparent"
            stroke="var(--text-ghost)"
            strokeWidth={strokeWidth}
            strokeOpacity="0.25"
          />
          {/* Main gauge ring */}
          <circle
            cx="100"
            cy="110"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.8s var(--ease-out-expo), stroke 0.5s ease',
            }}
          />
        </svg>

        {/* Center Text Wrapper */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            fontSize: 'var(--text-mega)',
            fontWeight: 800,
            lineHeight: 1,
            fontFamily: 'var(--font-mono)',
            background: 'var(--gradient-text)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {displayScore}
          </span>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            fontWeight: 600,
            marginTop: '2px',
            letterSpacing: '0.1em'
          }}>
            / 100
          </span>
        </div>
      </div>

      {/* Label and Status Badge */}
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 'var(--space-2)' }}>
          {label}
        </h4>
        <span className={badgeClass} style={{
          padding: '6px 12px',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          letterSpacing: '0.05em',
          backgroundColor: strokeColor + '1A', // 10% opacity hex
          border: `1px solid ${strokeColor}40`, // 25% opacity hex
          color: strokeColor,
          display: 'inline-block'
        }}>
          {statusText}
        </span>
      </div>
    </div>
  );
}
