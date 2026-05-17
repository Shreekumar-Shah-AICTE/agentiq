'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, FileCode } from 'lucide-react';
import { GeneratedFiles } from '../types';

interface FileViewerProps {
  files: GeneratedFiles;
  repoName: string;
}

export default function FileViewer({ files, repoName }: FileViewerProps) {
  const [activeTab, setActiveTab] = useState<keyof GeneratedFiles>('agentsMd');
  const [copied, setCopied] = useState(false);

  const tabs: { key: keyof GeneratedFiles; label: string; filename: string }[] = [
    { key: 'agentsMd', label: 'AGENTS.md', filename: 'AGENTS.md' },
    { key: 'bobMode', label: '.bob/modes', filename: 'agentiq-optimized.yaml' },
    { key: 'bobSkill', label: '.bob/skills', filename: 'SKILL.md' },
    { key: 'cursorRules', label: '.cursorrules', filename: '.cursorrules' },
    { key: 'claudeMd', label: 'CLAUDE.md', filename: 'CLAUDE.md' },
    { key: 'copilotInstructions', label: 'copilot-instructions', filename: 'copilot-instructions.md' }
  ];

  const activeFileContent = files[activeTab] || '';
  const activeFilename = tabs.find(t => t.key === activeTab)?.filename || '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeFileContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([activeFileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass" style={{ width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Tab Selector Row */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--glass-border)',
        backgroundColor: 'var(--bg-deep)',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCopied(false);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--cyan)' : '2px solid transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                padding: 'var(--space-3) var(--space-4)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: isActive ? 600 : 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <FileCode size={14} color={isActive ? 'var(--cyan)' : 'var(--text-muted)'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Toolbar Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-2) var(--space-4)',
        borderBottom: '1px solid var(--glass-border)',
        backgroundColor: 'var(--bg-surface)'
      }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Location: {activeTab === 'bobMode' ? `.bob/modes/${activeFilename}` : activeTab === 'bobSkill' ? `.bob/skills/project-context/${activeFilename}` : activeTab === 'copilotInstructions' ? `.github/${activeFilename}` : activeFilename}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{
              padding: '6px 12px',
              fontSize: 'var(--text-xs)',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="btn-secondary"
            style={{
              padding: '6px 12px',
              fontSize: 'var(--text-xs)',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={14} />
            Download
          </button>
        </div>
      </div>

      {/* Code Text Area */}
      <div style={{
        padding: 'var(--space-4)',
        backgroundColor: 'var(--bg-void)',
        maxHeight: '400px',
        overflowY: 'auto',
        display: 'flex'
      }}>
        <pre style={{
          margin: 0,
          padding: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-primary)',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          width: '100%'
        }}>
          <code>{activeFileContent}</code>
        </pre>
      </div>
    </div>
  );
}
