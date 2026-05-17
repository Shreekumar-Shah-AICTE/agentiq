'use client';

import React, { useEffect, useRef } from 'react';
import { GitBranch } from 'lucide-react';

interface ArchDiagramProps {
  diagram: string;
}

export default function ArchDiagram({ diagram }: ArchDiagramProps) {
  const diagramRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    // If mermaid CDN hasn't loaded yet, retry a few times
    let retries = 0;
    const renderDiagram = () => {
      if (typeof window !== 'undefined' && (window as any).mermaid && diagramRef.current) {
        try {
          // Clear any previous rendering artifacts inside pre
          diagramRef.current.removeAttribute('data-processed');
          
          (window as any).mermaid.initialize({
            theme: 'dark',
            themeVariables: {
              primaryColor: '#0e1525',
              primaryTextColor: '#f5f5f5',
              primaryBorderColor: '#00d4ff',
              lineColor: '#a855f7',
              secondaryColor: '#161b22',
              tertiaryColor: '#1a1a2e',
              nodeBorder: '#00d4ff',
              mainBkg: '#0e1525'
            },
            startOnLoad: false,
            securityLevel: 'loose'
          });
          
          (window as any).mermaid.run({
            nodes: [diagramRef.current]
          });
        } catch (err) {
          console.error('Mermaid render error:', err);
        }
      } else if (retries < 10) {
        retries++;
        setTimeout(renderDiagram, 500);
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="glass" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-5)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        <GitBranch size={20} color="var(--cyan)" />
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'white' }}>
          Architecture Blueprint
        </h3>
      </div>

      <div 
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.3)', 
          borderRadius: 'var(--radius-sm)', 
          padding: 'var(--space-5)', 
          overflowX: 'auto',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid var(--glass-border)'
        }}
      >
        <pre ref={diagramRef} className="mermaid" style={{ background: 'transparent', margin: 0, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {diagram}
        </pre>
      </div>
    </div>
  );
}
