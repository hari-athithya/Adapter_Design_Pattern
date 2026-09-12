import React from 'react';
import { MainNavTab } from '../types';

interface HeaderProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onToggleMobileSidebar,
}) => {
  return (
    <header className="h-14 border-b border-[#14202d] bg-[#070b10]/95 backdrop-blur px-4 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left Title & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-1.5 rounded bg-[#0b121a] border border-[#162536] text-[#94a3b8] hover:text-[#00f0ff]"
            aria-label="Toggle curriculum sidebar"
          >
            <span className="text-xs font-mono">☰</span>
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="text-[#f1f5f9] font-bold text-sm tracking-wide">Adapter Lab</span>
        </div>
        <div className="hidden md:flex items-center text-xs text-[#64748b]">
          <span className="mx-1.5 text-[#334155]">/</span>
          <span>Design Patterns</span>
          <span className="mx-1.5 text-[#334155]">/</span>
          <span>Structural Patterns</span>
          <span className="mx-1.5 text-[#334155]">/</span>
          <span className="text-[#94a3b8]">Adapter</span>
        </div>
      </div>

      {/* Center Main Nav Tabs */}
      <nav className="flex items-center gap-1 bg-[#0b121a] p-1 rounded-lg border border-[#162536]">
        <button
          onClick={() => onSelectTab('concept')}
          className={`px-3 py-1 text-xs font-medium rounded transition-all flex items-center gap-1.5 ${
            activeTab === 'concept'
              ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
              : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#121e2c]'
          }`}
        >
          <span className="text-[10px] text-[#00f0ff]/70 font-mono">01.</span>
          <span>Concept Hub</span>
        </button>

        <button
          onClick={() => onSelectTab('playground')}
          className={`px-3 py-1 text-xs font-medium rounded transition-all flex items-center gap-1.5 ${
            activeTab === 'playground'
              ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
              : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#121e2c]'
          }`}
        >
          <span className="text-[10px] text-[#00f0ff] font-mono">02.</span>
          <span>Code Playground & Inspector</span>
        </button>

        <button
          onClick={() => onSelectTab('scenarios')}
          className={`px-3 py-1 text-xs font-medium rounded transition-all flex items-center gap-1.5 ${
            activeTab === 'scenarios'
              ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
              : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#121e2c]'
          }`}
        >
          <span className="text-[10px] text-[#00f0ff]/70 font-mono">03.</span>
          <span>Scenarios & Quiz</span>
        </button>
      </nav>

      {/* Right Status */}
      <div className="flex items-center gap-3 text-xs">
        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#142333] text-[#38bdf8] rounded border border-[#1e344d]">
          DEV
        </span>
      </div>
    </header>
  );
};
