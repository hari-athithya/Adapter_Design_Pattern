import React, { useState } from 'react';
import { 
  AlertOctagon, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  Sparkles, 
  ShieldAlert, 
  Layers, 
  GitCompare,
  Zap,
  Cpu
} from 'lucide-react';

export const ProblemSolutionDeepDive: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'problem' | 'solution' | 'breakdown'>('problem');

  return (
    <div className="bg-[#091018] rounded-xl border border-[#142333] p-5 space-y-5">
      {/* Header with selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono uppercase text-[#00f0ff] font-bold">CORE ARCHITECTURAL DILEMMA</div>
          <h2 className="text-sm font-bold text-[#f8fafc]">The Problem & The Solution Blueprint</h2>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs bg-[#060a0f] p-1 rounded-lg border border-[#14202d]">
          <button
            onClick={() => setSelectedTab('problem')}
            className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
              selectedTab === 'problem' 
                ? 'bg-[#ef4444]/15 text-[#f87171] border border-[#ef4444]/40 font-semibold' 
                : 'text-[#64748b] hover:text-[#cbd5e1]'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-[#ef4444]" />
            <span>The Impedance Crisis</span>
          </button>
          <button
            onClick={() => setSelectedTab('solution')}
            className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
              selectedTab === 'solution' 
                ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 font-semibold' 
                : 'text-[#64748b] hover:text-[#cbd5e1]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>The Adapter Solution</span>
          </button>
          <button
            onClick={() => setSelectedTab('breakdown')}
            className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
              selectedTab === 'breakdown' 
                ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/40 font-semibold' 
                : 'text-[#64748b] hover:text-[#cbd5e1]'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Side-by-Side Breakdown</span>
          </button>
        </div>
      </div>

      {/* Tab 1: The Problem */}
      {selectedTab === 'problem' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#140b0b] border border-[#ef4444]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#ef4444] font-mono text-xs font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>THE CRISIS: WHY SYSTEMS COLLIDE WITHOUT AN ADAPTER</span>
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              In real enterprise applications, software rarely lives in an isolated vacuum. Modern client domains evolve rapidly, employing high-level abstractions, async Promises/Tasks, and semantic value types. However, your organization relies on legacy libraries, 3rd-party vendor SDKs, or hardware drivers whose interfaces are rigid, frozen in time, or completely out of your direct control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-[#0c0d12] rounded-lg border border-[#2a1717] space-y-1.5">
              <div className="text-[10px] text-[#f87171] uppercase font-bold">1. Signature Collision</div>
              <div className="text-[#f1f5f9] font-semibold">Incompatible Arguments</div>
              <p className="text-[11px] text-[#94a3b8] font-sans">
                Client calls <code className="text-[#f87171]">pay(amount: 128.50)</code> expecting standard dollars, while legacy vendor requires integer cents <code className="text-[#f87171]">makePayment(12850, "USD")</code> and currency strings.
              </p>
            </div>

            <div className="p-3 bg-[#0c0d12] rounded-lg border border-[#2a1717] space-y-1.5">
              <div className="text-[10px] text-[#f87171] uppercase font-bold">2. Polymorphic Breakdown</div>
              <div className="text-[#f1f5f9] font-semibold">Vendor Code Cannot Implement Target</div>
              <p className="text-[11px] text-[#94a3b8] font-sans">
                You cannot alter third-party compiled JARs, npm packages, or DLLs to implement your domain's <code className="text-[#f87171]">PaymentProcessor</code> interface.
              </p>
            </div>

            <div className="p-3 bg-[#0c0d12] rounded-lg border border-[#2a1717] space-y-1.5">
              <div className="text-[10px] text-[#f87171] uppercase font-bold">3. Leaky Abstractions</div>
              <div className="text-[#f1f5f9] font-semibold">Direct Coupling Contamination</div>
              <p className="text-[11px] text-[#94a3b8] font-sans">
                Directly calling vendor APIs pollutes client controllers with vendor imports, vendor error codes, and brittle wire formats, causing massive refactor ripples if vendor changes.
              </p>
            </div>
          </div>

          <div className="bg-[#06090e] p-3.5 rounded-lg border border-[#142333] font-mono text-xs">
            <div className="text-[11px] text-[#ef4444] font-bold mb-1">ANTI-PATTERN TO AVOID: HACKING THE CLIENT</div>
            <div className="text-[#94a3b8] leading-relaxed font-sans text-xs">
              Directly embedding vendor conversion logic (e.g. <code className="text-[#ef4444]">Math.round(amount * 100)</code>) inside 15 different checkout controllers violates the <strong className="text-[#f1f5f9]">Single Responsibility Principle (SRP)</strong> and completely breaks the <strong className="text-[#f1f5f9]">Open/Closed Principle (OCP)</strong>.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: The Solution */}
      {selectedTab === 'solution' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#07131e] border border-[#00f0ff]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#00f0ff] font-mono text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>THE ARCHITECTURAL REMEDY: THE WRAPPER BRIDGE</span>
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Create a dedicated intermediary class—the <strong className="text-[#00f0ff]">Adapter</strong>. The Adapter acts as an insulating membrane: it implements the client-expected <strong className="text-[#38bdf8]">Target Interface</strong> (polymorphic mask) and encapsulates a private instance of the <strong className="text-[#fb923c]">Adaptee</strong> (composition reference).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-[#06111a] rounded-lg border border-[#00f0ff]/30 space-y-1">
              <span className="text-[9px] px-1.5 py-0.5 bg-[#00f0ff]/20 text-[#00f0ff] rounded font-bold">STEP 1</span>
              <div className="text-[#f1f5f9] font-bold text-xs mt-1">Implement Target</div>
              <p className="text-[11px] text-[#94a3b8] font-sans">
                Adapter satisfies <code className="text-[#00f0ff]">PaymentProcessor</code> interface so the client treats it identically to native modern services.
              </p>
            </div>

            <div className="p-3 bg-[#06111a] rounded-lg border border-[#00f0ff]/30 space-y-1">
              <span className="text-[9px] px-1.5 py-0.5 bg-[#00f0ff]/20 text-[#00f0ff] rounded font-bold">STEP 2</span>
              <div className="text-[#f1f5f9] font-bold text-xs mt-1">Compose Adaptee</div>
              <p className="text-[11px] text-[#94a3b8] font-sans">
                Injected via constructor: keeps reference to <code className="text-[#fb923c]">LegacyPaymentService</code> without requiring multiple inheritance.
              </p>
            </div>

            <div className="p-3 bg-[#06111a] rounded-lg border border-[#00f0ff]/30 space-y-1">
              <span className="text-[9px] px-1.5 py-0.5 bg-[#00f0ff]/20 text-[#00f0ff] rounded font-bold">STEP 3</span>
              <div className="text-[#f1f5f9] font-bold text-xs mt-1">Translate Data</div>
              <p className="text-[11px] text-[#94a3b8] font-sans">
                Converts dollars to cents, dates to epoch timestamps, or XML payloads into JSON structures cleanly.
              </p>
            </div>

            <div className="p-3 bg-[#06111a] rounded-lg border border-[#00f0ff]/30 space-y-1">
              <span className="text-[9px] px-1.5 py-0.5 bg-[#00f0ff]/20 text-[#00f0ff] rounded font-bold">STEP 4</span>
              <div className="text-[#f1f5f9] font-bold text-xs mt-1">Canonical Return</div>
              <p className="text-[11px] text-[#94a3b8] font-sans">
                Intercepts vendor primitives or raw error codes and packages them into domain-safe <code className="text-[#10b981]">PaymentResult</code> entities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Side by Side Comparison */}
      {selectedTab === 'breakdown' && (
        <div className="space-y-3 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Without Adapter */}
            <div className="p-4 bg-[#120808] rounded-xl border border-[#ef4444]/40 space-y-3">
              <div className="flex items-center justify-between text-[#ef4444] font-bold">
                <span>WITHOUT ADAPTER (TIGHT COUPLING)</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#ef4444]/20 rounded">FRAGILE</span>
              </div>
              <ul className="space-y-2 text-[11px] text-[#fca5a5] font-sans list-disc list-inside">
                <li>Client directly calls vendor-specific methods (<code className="text-[#ef4444]">execute_tx(cents, "USD")</code>).</li>
                <li>Client must know vendor-specific quirks, defaults, and data formats.</li>
                <li>Replacing the payment vendor requires modifying every single client invocation site.</li>
                <li>Impossible to mock easily in unit tests if vendor requires live binary drivers.</li>
              </ul>
            </div>

            {/* With Adapter */}
            <div className="p-4 bg-[#06141a] rounded-xl border border-[#00f0ff]/40 space-y-3">
              <div className="flex items-center justify-between text-[#00f0ff] font-bold">
                <span>WITH ADAPTER (DECOUPLED BRIDGE)</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#00f0ff]/20 rounded">ROBUST</span>
              </div>
              <ul className="space-y-2 text-[11px] text-[#7dd3fc] font-sans list-disc list-inside">
                <li>Client talks strictly to standard <code className="text-[#00f0ff]">PaymentProcessor.pay(amount)</code> contract.</li>
                <li>Adapter encapsulates all quirks: unit math, error handling, parameter translation.</li>
                <li>Switching to a new vendor requires writing one new adapter class; zero client code edits.</li>
                <li>Cleanly testable using dependency injection and mock interfaces.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
