'use client';

import React, { useState } from 'react';
import { Archive, Download, Check, RefreshCw } from 'lucide-react';
import JSZip from 'jszip';
import { GeneratedFiles } from '../types';

interface ExportPanelProps {
  files: GeneratedFiles;
  repoName: string;
  onReRun?: () => void;
}

export default function ExportPanel({ files, repoName, onReRun }: ExportPanelProps) {
  const [zipping, setZipping] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);

  const handleExportZip = async () => {
    setZipping(true);
    setZipSuccess(false);

    try {
      const zip = new JSZip();

      // Place files into their exact required directories
      zip.file('AGENTS.md', files.agentsMd);
      zip.file('.bob/modes/agentiq-optimized.yaml', files.bobMode);
      zip.file('.bob/skills/project-context/SKILL.md', files.bobSkill);
      zip.file('.cursorrules', files.cursorRules);
      zip.file('CLAUDE.md', files.claudeMd);
      zip.file('.github/copilot-instructions.md', files.copilotInstructions);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `agentiq-${repoName}-context.zip`;
      a.click();
      
      URL.revokeObjectURL(url);
      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to create context ZIP bundle:', err);
    } finally {
      setZipping(false);
    }
  };

  return (
    <div 
      className="glass" 
      style={{
        width: '100%',
        padding: 'var(--space-4) var(--space-5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--glass-border)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'white' }}>
          Synchronize Context Workspace
        </h4>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
          Download the optimized configuration package and extract it directly into your local workspace.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        {onReRun && (
          <button 
            onClick={onReRun}
            className="btn-secondary"
            style={{
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-sm)',
              borderRadius: 'var(--radius-md)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RefreshCw size={16} />
            Re-Run Audit
          </button>
        )}

        <button 
          onClick={handleExportZip}
          className="btn-primary"
          disabled={zipping}
          style={{
            padding: 'var(--space-3) var(--space-5)',
            fontSize: 'var(--text-sm)',
            borderRadius: 'var(--radius-md)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            opacity: zipping ? 0.7 : 1,
            cursor: zipping ? 'not-allowed' : 'pointer'
          }}
        >
          {zipping ? (
            <>
              <RefreshCw size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              Packaging...
            </>
          ) : zipSuccess ? (
            <>
              <Check size={16} />
              Bundle Exported!
            </>
          ) : (
            <>
              <Archive size={16} />
              Export Context ZIP
            </>
          )}
        </button>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
