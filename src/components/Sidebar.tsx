import React from 'react';
import { MODULE_LIST } from '../data/codeData';

interface SidebarProps {
  activeModuleId: number;
  onSelectModule: (moduleId: number) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModuleId,
  onSelectModule,
  mobileOpen = false,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`w-64 flex-shrink-0 bg-[#070b10] border-r border-[#14202d] flex flex-col justify-between select-none h-[calc(100vh-3.5rem)] sticky top-14 z-50 md:z-auto transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'fixed left-0 top-14 translate-x-0' : 'hidden md:flex'
        }`}
      >
      {/* Top Identity & Curriculum */}
      <div className="overflow-y-auto">
        {/* Brand Block */}
        <div className="p-4 border-b border-[#14202d]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-[#00f0ff] uppercase font-mono">
              ARCHITECT CORE
            </span>
          </div>
          <div className="text-sm font-semibold text-[#f1f5f9]">Adapter Lab</div>
          <div className="text-[11px] text-[#64748b]">Master the Adapter Pattern</div>
        </div>

        {/* Modules Section */}
        <div className="p-3">
          <div className="text-[10px] font-mono font-bold tracking-wider text-[#475569] uppercase px-2 mb-2">
            CURRICULUM MODULES
          </div>

          <div className="space-y-0.5">
            {MODULE_LIST.map((mod) => {
              const isActive = activeModuleId === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => onSelectModule(mod.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-2 group ${
                    isActive
                      ? 'bg-[#00f0ff]/15 text-[#00f0ff] font-semibold border-l-2 border-[#00f0ff] pl-2 shadow-[0_0_12px_rgba(0,240,255,0.1)]'
                      : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#0f1722]'
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono ${
                      isActive ? 'text-[#00f0ff]' : 'text-[#475569] group-hover:text-[#64748b]'
                    }`}
                  >
                    {mod.code}
                  </span>
                  <span className="truncate tracking-tight">{mod.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Status Panel */}
      <div className="p-3.5 border-t border-[#14202d] bg-[#070b10] text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-[#64748b] mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
          <span className="text-[#94a3b8] font-medium tracking-wide">RUNTIME: DUAL-DISPATCH</span>
        </div>
        <div className="flex items-center justify-between text-[#475569]">
          <span>LATENCY: 0.04ms</span>
          <span className="text-[#10b981] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
            READY
          </span>
        </div>
      </div>
    </aside>
    </>
  );
};
