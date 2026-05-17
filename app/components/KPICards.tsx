'use client';

import React, { useEffect, useState } from 'react';
import { Target, DollarSign, Clock, Zap } from 'lucide-react';
import { ScoreBreakdown, BusinessImpact } from '../types';

interface KPICardsProps {
  score: ScoreBreakdown;
  impact: BusinessImpact;
  projectedScore: number;
}

export default function KPICards({ score, impact, projectedScore }: KPICardsProps) {
  const [savings, setSavings] = useState(0);
  const [hours, setHours] = useState(0);
  const [efficiency, setEfficiency] = useState(0);

  useEffect(() => {
    // Count-up animations
    const duration = 1200;
    const startTime = performance.now();

    let animationFrameId: number;

    const animateKPIs = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setSavings(Math.round(ease * impact.annualSavings));
      setHours(Math.round(ease * impact.weeklyHoursSavedPerDev * 10) / 10);
      setEfficiency(Math.round(ease * impact.tokenEfficiencyGain));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateKPIs);
      }
    };

    animationFrameId = requestAnimationFrame(animateKPIs);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [impact]);

  const cards = [
    {
      title: 'AgentIQ Score',
      value: `${score.overall} → ${projectedScore}`,
      label: 'Context coverage audit',
      icon: <Target size={20} className="cyan-accent" />,
      color: 'var(--cyan)',
      glow: 'var(--cyan-glow)'
    },
    {
      title: 'Annual Savings',
      value: `$${savings.toLocaleString()}`,
      label: 'Developer hours recovered',
      icon: <DollarSign size={20} className="green-accent" />,
      color: 'hsl(145, 75%, 48%)',
      glow: 'hsla(145, 75%, 48%, 0.25)'
    },
    {
      title: 'Weekly Hours Saved',
      value: `${hours} hrs`,
      label: 'Saved per developer',
      icon: <Clock size={20} className="purple-accent" />,
      color: 'hsl(265, 90%, 65%)',
      glow: 'hsla(265, 90%, 65%, 0.25)'
    },
    {
      title: 'Token Efficiency',
      value: `+${efficiency}%`,
      label: 'Reduced prompt overhead',
      icon: <Zap size={20} className="orange-accent" />,
      color: 'hsl(35, 95%, 58%)',
      glow: 'hsla(35, 95%, 58%, 0.25)'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 'var(--space-4)',
      width: '100%'
    }}>
      {cards.map((card, idx) => (
        <div 
          key={idx}
          className="glass glass-interactive"
          style={{
            padding: 'var(--space-4) var(--space-5)',
            borderLeft: `3px solid ${card.color}`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle accent background glow */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: card.glow,
            filter: 'blur(30px)',
            pointerEvents: 'none'
          }} />

          {/* Header Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-2)'
          }}>
            <span style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {card.title}
            </span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: card.glow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: card.color
            }}>
              {card.icon}
            </div>
          </div>

          {/* Value and Label */}
          <div>
            <h3 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: 'white',
              marginBottom: '2px'
            }}>
              {card.value}
            </h3>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              fontWeight: 500
            }}>
              {card.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
