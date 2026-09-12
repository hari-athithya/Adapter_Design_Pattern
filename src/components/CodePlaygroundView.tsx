import React, { useState, useEffect } from 'react';
import { Language, CodeLine } from '../types';
import { CODE_DATA, JAVA_ANATOMY_POINTS } from '../data/codeData';
import { GOF_COMPARISON_MATRIX, CORE_ADVANTAGES, HIDDEN_COSTS } from '../data/gofData';
import {
  Play,
  Copy,
  Check,
  Eye,
  EyeOff,
  Terminal,
  Pin,
  CheckCircle2,
  AlertCircle,
  Code2,
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface CodePlaygroundViewProps {
  onModuleChange?: (moduleId: number) => void;
}

export const CodePlaygroundView: React.FC<CodePlaygroundViewProps> = () => {
  const [selectedLang, setSelectedLang] = useState<Language>('java');
  const [selectedFileId, setSelectedFileId] = useState<string>('adapter');
  const [hoveredLineNum, setHoveredLineNum] = useState<number | null>(null);
  const [pinnedLineNum, setPinnedLineNum] = useState<number>(20); // Default to line 20 as in screenshot
  const [hoverInspectorActive, setHoverInspectorActive] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Terminal state
  const [terminalStatus, setTerminalStatus] = useState<'STANDBY' | 'RUNNING' | 'SUCCESS'>('STANDBY');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [customAmount, setCustomAmount] = useState<number>(128.5);

  const currentLangData = CODE_DATA[selectedLang];
  const currentFile = currentLangData.files.find((f) => f.id === selectedFileId) || currentLangData.files[0];

  // Initialize terminal logs on language change
  useEffect(() => {
    setTerminalLogs([
      `$ ${currentLangData.terminalDemo.compileCmd}`,
      ...currentLangData.terminalDemo.lines,
    ]);
    setTerminalStatus('SUCCESS');
  }, [selectedLang]);

  // Determine active displayed line for line breakdown
  const effectiveLineNum = hoverInspectorActive && hoveredLineNum !== null ? hoveredLineNum : pinnedLineNum;
  const activeLineObj = currentFile.lines.find((l) => l.num === effectiveLineNum);
  const activeAnnotation = activeLineObj?.annotation;

  // Run terminal simulation
  const handleRunCode = () => {
    setTerminalStatus('RUNNING');
    setTerminalLogs([`$ ${currentLangData.terminalDemo.compileCmd}`, '>>> Compiling syntax trees and linking modules...']);

    setTimeout(() => {
      const cents = Math.round(customAmount * 100);
      let runOutput: string[] = [];

      if (selectedLang === 'java') {
        runOutput = [
          `$ javac PaymentProcessor.java LegacyPaymentService.java PaymentAdapter.java`,
          `[Adapter] Initialized with target interface [PaymentProcessor] wrapping [LegacyPaymentService].`,
          `[Client] Invoking PaymentProcessor.pay(amount: $${customAmount.toFixed(2)})`,
          `[Adapter::Transform] Converted ${customAmount.toFixed(2)} USD -> ${cents} Cents.`,
          `[LegacyPaymentService] makePayment(${cents}, "USD") -> true`,
          `[Client] Result: PaymentResult[status='SUCCESS'] - Approved!`,
        ];
      } else if (selectedLang === 'python') {
        runOutput = [
          `$ python3 -m mypy payment_adapter.py && python3 main.py`,
          `[Adapter] Initialized with target interface [PaymentProcessor] wrapping [LegacyPaymentGateway].`,
          `[Client] Invoking PaymentProcessor.pay(amount: $${customAmount.toFixed(2)})`,
          `[Adapter::Transform] Converted ${customAmount.toFixed(2)} USD -> ${cents} Cents.`,
          `[LegacySDK] execute_tx(${cents}, currency="USD") -> True`,
          `[Client] Result: PaymentResult(status='SUCCESS') - Approved!`,
        ];
      } else if (selectedLang === 'typescript') {
        runOutput = [
          `$ tsc --noEmit && node dist/index.js`,
          `[Adapter] Initialized with target interface [PaymentProcessor] wrapping [LegacyBillingSDK].`,
          `[Client] Invoking PaymentProcessor.pay(amount: $${customAmount.toFixed(2)})`,
          `[Adapter::Transform] Converted ${customAmount.toFixed(2)} USD -> ${cents} Cents.`,
          `[LegacyBillingSDK] chargeCustomer(${cents}, "USD") -> true`,
          `[Client] Result: PaymentResult{ status: 'SUCCESS', timestamp: ${Date.now()} } - Approved!`,
        ];
      } else {
        runOutput = [
          `$ dotnet run --project ArchitectCore.Payments.csproj`,
          `[Adapter] Initialized with target interface [IPaymentProcessor] wrapping [LegacyPaymentService].`,
          `[Client] Invoking IPaymentProcessor.PayAsync(amount: ${customAmount.toFixed(2)}m)`,
          `[Adapter::Transform] Converted ${customAmount.toFixed(2)} USD -> ${cents} Cents.`,
          `[LegacyPaymentService] MakePaymentAsync(${cents}, "USD") -> True`,
          `[Client] Result: PaymentResult { Status = SUCCESS } - Approved!`,
        ];
      }

      setTerminalLogs(runOutput);
      setTerminalStatus('SUCCESS');
    }, 450);
  };

  const handleCopyCode = () => {
    const allCode = currentFile.lines.map((l) => l.code).join('\n');
    navigator.clipboard.writeText(allCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Syntax highlighting renderer
  const renderHighlightedCode = (code: string) => {
    if (!code) return <span>&nbsp;</span>;
    if (code.trim().startsWith('//') || code.trim().startsWith('#') || code.trim().startsWith('/*')) {
      return <span className="text-[#526071] italic font-mono">{code}</span>;
    }

    // Split words and match keywords
    const tokens = code.split(/(\s+|[(){}[\];,.<>=:+\-*"/])/);

    return (
      <span className="font-mono">
        {tokens.map((token, idx) => {
          if (!token) return null;
          if (
            [
              'public',
              'private',
              'interface',
              'class',
              'implements',
              'extends',
              'final',
              'new',
              'return',
              'int',
              'double',
              'float',
              'boolean',
              'def',
              'from',
              'import',
              'async',
              'await',
              'export',
              'const',
              'namespace',
              'using',
              'record',
              'this',
              'readonly',
              'decimal',
              'Task',
              'Promise',
            ].includes(token)
          ) {
            return (
              <span key={idx} className="text-[#38bdf8] font-semibold">
                {token}
              </span>
            );
          }
          if (token.startsWith('@')) {
            return (
              <span key={idx} className="text-[#f59e0b]">
                {token}
              </span>
            );
          }
          if (
            [
              'PaymentProcessor',
              'PaymentResult',
              'LegacyPaymentService',
              'PaymentAdapter',
              'IPaymentProcessor',
              'LegacyBillingSDK',
              'LegacyPaymentGateway',
              'Math',
              'String',
              'ABC',
            ].includes(token)
          ) {
            return (
              <span key={idx} className="text-[#00f0ff] font-medium">
                {token}
              </span>
            );
          }
          if (['pay', 'makePayment', 'execute_tx', 'chargeCustomer', 'PayAsync', 'round', 'MakePaymentAsync'].includes(token)) {
            return (
              <span key={idx} className="text-[#a7f3d0]">
                {token}
              </span>
            );
          }
          if (token.match(/^\d+$/) || token.match(/^\d+\.\d+$/)) {
            return (
              <span key={idx} className="text-[#fb923c]">
                {token}
              </span>
            );
          }
          if (token.startsWith('"') || token.startsWith("'")) {
            return (
              <span key={idx} className="text-[#34d399]">
                {token}
              </span>
            );
          }
          return (
            <span key={idx} className="text-[#cbd5e1]">
              {token}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header Title & Stats Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#14202d] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-[#00f0ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
            <span>02 // MULTI-LANGUAGE CODE INSPECTOR</span>
          </div>
          <h1 className="text-xl font-bold text-[#f8fafc] tracking-tight">
            Code Playground & Line-Hover Inspector
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1 max-w-3xl leading-relaxed">
            Hover over any line in <strong className="text-[#e2e8f0]">Java, Python, TypeScript,</strong> or{' '}
            <strong className="text-[#e2e8f0]">C#</strong> to inspect its architectural role, parameter conversion
            vector, and structural intent in real time.
          </p>
        </div>

        {/* Top-Right Stat Badges */}
        <div className="flex items-center gap-2.5 font-mono text-[11px]">
          <div className="bg-[#091119] px-3 py-2 rounded-lg border border-[#142333] min-w-[120px]">
            <div className="text-[9px] text-[#475569] uppercase font-bold tracking-wider">INSPECTOR</div>
            <div className="text-[#00f0ff] font-semibold mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              Live Hover & Pin
            </div>
          </div>

          <div className="bg-[#091119] px-3 py-2 rounded-lg border border-[#142333] min-w-[110px]">
            <div className="text-[9px] text-[#475569] uppercase font-bold tracking-wider">LANGUAGES</div>
            <div className="text-[#10b981] font-semibold mt-0.5">4 Idiomatic</div>
          </div>

          <div className="bg-[#091119] px-3 py-2 rounded-lg border border-[#142333] min-w-[110px]">
            <div className="text-[9px] text-[#475569] uppercase font-bold tracking-wider">TOPOLOGY</div>
            <div className="text-[#00f0ff] font-semibold mt-0.5">HAS-A vs IS-A</div>
          </div>
        </div>
      </div>

      {/* 2. Languages Bar & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#091018] p-2.5 rounded-xl border border-[#142232]">
        {/* Language Tabs */}
        <div className="flex items-center gap-1.5">
          {(['java', 'python', 'typescript', 'csharp'] as Language[]).map((lang) => {
            const isSelected = selectedLang === lang;
            const labels: Record<Language, string> = {
              java: 'Java',
              python: 'Python',
              typescript: 'TypeScript',
              csharp: 'C# (.NET)',
            };
            return (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLang(lang);
                  setSelectedFileId('adapter');
                  if (lang === 'java') setPinnedLineNum(20);
                  else if (lang === 'python') setPinnedLineNum(17);
                  else if (lang === 'typescript') setPinnedLineNum(15);
                  else setPinnedLineNum(16);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                    : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#121c28]'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] inline-block shadow-[0_0_6px_#00f0ff]" />}
                <span>{labels[lang]}</span>
              </button>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={() => setHoverInspectorActive(!hoverInspectorActive)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
              hoverInspectorActive
                ? 'bg-[#091722] text-[#38bdf8] border-[#0284c7]/40'
                : 'bg-[#0a0f16] text-[#64748b] border-[#162536]'
            }`}
          >
            {hoverInspectorActive ? <Eye className="w-3.5 h-3.5 text-[#00f0ff]" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Hover Inspector: {hoverInspectorActive ? 'LIVE' : 'PAUSED'}</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="px-2.5 py-1.5 rounded-lg text-xs text-[#cbd5e1] hover:text-[#f8fafc] bg-[#0d1622] hover:bg-[#152336] border border-[#1b2b3d] flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5 text-[#94a3b8]" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleRunCode}
            disabled={terminalStatus === 'RUNNING'}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#00f0ff] hover:bg-[#38bdf8] text-[#070b10] flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.35)] transition-all active:scale-95 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>RUN CODE</span>
          </button>
        </div>
      </div>

      {/* 3. Code Editor & Line Inspector (Side-by-side) */}
      <div className="bg-[#080d14] rounded-xl border border-[#142333] overflow-hidden shadow-2xl">
        {/* File Tabs Bar */}
        <div className="flex items-center gap-1 bg-[#06090e] border-b border-[#14202d] px-2 pt-1.5 overflow-x-auto">
          {currentLangData.files.map((file) => {
            const isSelected = file.id === selectedFileId;
            return (
              <button
                key={file.id}
                onClick={() => setSelectedFileId(file.id)}
                className={`px-3 py-1.5 rounded-t-md text-xs font-mono transition-all flex items-center gap-2 border-t border-x ${
                  isSelected
                    ? 'bg-[#080d14] text-[#00f0ff] font-semibold border-[#142333] border-b-transparent border-t-[#00f0ff]'
                    : 'bg-transparent text-[#64748b] hover:text-[#94a3b8] border-transparent'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#00f0ff]' : 'bg-[#334155]'}`} />
                <span>{file.name}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded border ${
                    file.id === 'adapter'
                      ? 'bg-[#082f34] text-[#00f0ff] border-[#00f0ff]/40'
                      : file.id === 'target'
                      ? 'bg-[#1e293b] text-[#94a3b8] border-[#334155]'
                      : 'bg-[#291e14] text-[#fb923c] border-[#7c2d12]'
                  }`}
                >
                  {file.roleTag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Editor Area: Code (Left 62%) + Inspector Panel (Right 38%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
          {/* Code Viewer (Left) */}
          <div className="lg:col-span-7 bg-[#070b10] p-3 overflow-x-auto border-r border-[#14202d] font-mono text-[12px] leading-relaxed select-text">
            {currentFile.lines.map((line) => {
              const isHovered = hoveredLineNum === line.num;
              const isPinned = pinnedLineNum === line.num;
              const hasAnnotation = !!line.annotation;

              let bgClass = 'hover:bg-[#0c1520]/80';
              if (isPinned) {
                bgClass = 'bg-[#00f0ff]/10 border-l-2 border-[#00f0ff]';
              } else if (isHovered && hoverInspectorActive) {
                bgClass = 'bg-[#00f0ff]/5 border-l-2 border-[#00f0ff]/60';
              }

              return (
                <div
                  key={line.num}
                  onMouseEnter={() => hoverInspectorActive && setHoveredLineNum(line.num)}
                  onMouseLeave={() => hoverInspectorActive && setHoveredLineNum(null)}
                  onClick={() => setPinnedLineNum(line.num)}
                  className={`flex items-center gap-3 px-2 py-0.5 rounded cursor-pointer transition-colors group ${bgClass}`}
                >
                  {/* Line Number */}
                  <span
                    className={`w-7 text-right text-[11px] select-none flex items-center justify-end gap-1 ${
                      isPinned
                        ? 'text-[#00f0ff] font-bold'
                        : isHovered
                        ? 'text-[#38bdf8]'
                        : hasAnnotation
                        ? 'text-[#64748b]'
                        : 'text-[#334155]'
                    }`}
                  >
                    {isPinned && <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />}
                    {line.num}
                  </span>

                  {/* Code Line Content */}
                  <div className="flex-1 whitespace-pre">{renderHighlightedCode(line.code)}</div>
                </div>
              );
            })}
          </div>

          {/* Inspector Panel (Right) */}
          <div className="lg:col-span-5 bg-[#080e16] p-4 flex flex-col justify-between border-t lg:border-t-0 border-[#14202d]">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#14202d] pb-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#f8fafc] font-semibold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[#00f0ff]" />
                    Line Breakdown
                  </span>
                  <span className="px-2 py-0.5 text-[10px] bg-[#0c2233] text-[#00f0ff] rounded border border-[#00f0ff]/30">
                    Pinned L{pinnedLineNum}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#64748b]">
                  <Pin className="w-3 h-3 text-[#00f0ff]" />
                  <span>Pinned</span>
                </div>
              </div>

              {/* Main Active Annotation Box */}
              {activeAnnotation ? (
                <div className="bg-[#0b1522] border border-[#00f0ff]/40 rounded-lg p-3.5 space-y-3 shadow-[0_0_15px_rgba(0,240,255,0.08)]">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#00f0ff]/15 text-[#00f0ff] rounded border border-[#00f0ff]/30 uppercase tracking-wider">
                      {activeAnnotation.badge}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748b]">Line {effectiveLineNum}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#f1f5f9] tracking-tight">{activeAnnotation.title}</h3>
                    <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">{activeAnnotation.description}</p>
                  </div>

                  {/* Transformation Vector Visual Diagram (If present) */}
                  {activeAnnotation.vector && (
                    <div className="bg-[#070b10] p-2.5 rounded border border-[#142333] space-y-2">
                      <div className="text-[9px] font-mono uppercase tracking-wider text-[#475569] font-bold">
                        TRANSFORMATION VECTOR: DOUBLE TO CENTS MAPPING
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono gap-2 py-1">
                        <span className="text-[#38bdf8] bg-[#0c1e2e] px-2 py-1 rounded border border-[#0284c7]/30">
                          {activeAnnotation.vector.source}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-[#00f0ff]">
                          <span>──[</span>
                          <span className="font-bold text-[#f59e0b]">* 100 round</span>
                          <span>]──▶</span>
                        </div>
                        <span className="text-[#10b981] bg-[#0a231b] px-2 py-1 rounded border border-[#10b981]/30 font-bold">
                          {activeAnnotation.vector.target}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-[#0b141f] border border-[#142333] rounded-lg p-4 text-center text-xs text-[#64748b] space-y-2">
                  <p>Line {effectiveLineNum}: Structural code framing or comment declaration.</p>
                  <p className="text-[11px] text-[#475569]">
                    Hover over or click highlighted lines (e.g. L10, L12, L20, L21, L22) to inspect active GoF pattern
                    mechanisms.
                  </p>
                </div>
              )}

              {/* Anatomy Points List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-[#64748b] uppercase">
                  <span>ADAPTER ANATOMY POINTS</span>
                  <span className="text-[#00f0ff]">{currentLangData.name} GoF Anatomy</span>
                </div>

                <div className="space-y-1 font-mono text-xs">
                  {JAVA_ANATOMY_POINTS.map((pt) => {
                    const isActive = effectiveLineNum === pt.line;
                    return (
                      <button
                        key={pt.key}
                        onClick={() => setPinnedLineNum(pt.line)}
                        className={`w-full text-left px-2.5 py-1.5 rounded transition-all flex items-center justify-between border ${
                          isActive
                            ? 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/50 font-semibold shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                            : 'bg-[#0a1018] text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#101924] border-[#142333]'
                        }`}
                      >
                        <span className="truncate pr-2">{pt.title}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            isActive ? 'bg-[#00f0ff] text-[#070b10] font-bold' : 'bg-[#14202d] text-[#64748b]'
                          }`}
                        >
                          L{pt.line}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Key Principle Callout */}
            <div className="mt-4 bg-[#0a1622] border border-[#0284c7]/30 rounded-lg p-2.5 text-xs text-[#38bdf8] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-[#00f0ff]" />
              <span className="text-[11px] leading-snug">
                Client code operates solely against <strong className="text-[#f1f5f9]">PaymentProcessor</strong> with 0
                knowledge of the legacy system.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bar Beneath Editor */}
        <div className="bg-[#060a0f] px-4 py-2 border-t border-[#14202d] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#64748b] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
            <span>Hover any code line to inspect</span>
            <span className="text-[#334155]">•</span>
            <span>Click to pin inspection details</span>
          </div>
          <div className="text-[#00f0ff] font-medium bg-[#0b1724] px-2.5 py-0.5 rounded border border-[#00f0ff]/20 text-[11px]">
            Adapter Pattern: Object Composition (HAS-A)
          </div>
        </div>
      </div>

      {/* 4. Virtual Runtime Terminal Output */}
      <div className="bg-[#070b11] rounded-xl border border-[#142333] overflow-hidden shadow-xl font-mono">
        {/* Terminal Header */}
        <div className="bg-[#05080c] px-4 py-2.5 border-b border-[#14202d] flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2 text-[#00f0ff] font-semibold">
            <Terminal className="w-4 h-4 text-[#00f0ff]" />
            <span>VIRTUAL RUNTIME TERMINAL OUTPUT</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#64748b]">
            <div>
              <span>Runtime: </span>
              <strong className="text-[#cbd5e1]">{currentLangData.runtime}</strong>
            </div>
            <div>
              <span>Status: </span>
              <span
                className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                  terminalStatus === 'RUNNING'
                    ? 'bg-[#f59e0b]/20 text-[#f59e0b]'
                    : 'bg-[#10b981]/20 text-[#10b981]'
                }`}
              >
                {terminalStatus}
              </span>
            </div>
            <div>
              <span>Exit Code: </span>
              <strong className="text-[#10b981]">0</strong>
            </div>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 bg-[#05070a] text-xs text-[#94a3b8] space-y-1.5 min-h-[140px] select-text">
          {terminalLogs.map((log, index) => {
            const isPrompt = log.startsWith('$');
            const isTransform = log.includes('Transform');
            const isSuccess = log.includes('Approved') || log.includes('SUCCESS');
            return (
              <div
                key={index}
                className={`leading-relaxed ${
                  isPrompt
                    ? 'text-[#f8fafc] font-bold'
                    : isTransform
                    ? 'text-[#00f0ff]'
                    : isSuccess
                    ? 'text-[#10b981] font-semibold'
                    : 'text-[#cbd5e1]'
                }`}
              >
                {log}
              </div>
            );
          })}
        </div>

        {/* Terminal Controls Toolbar */}
        <div className="bg-[#080d14] px-4 py-2 border-t border-[#14202d] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#64748b]">
            <span>Simulate Client Amount:</span>
            <div className="flex items-center bg-[#05070a] border border-[#1b2b3d] rounded px-2 py-0.5 text-[#00f0ff]">
              <span>$</span>
              <input
                type="number"
                step="0.01"
                value={customAmount}
                onChange={(e) => setCustomAmount(parseFloat(e.target.value) || 0)}
                className="w-16 bg-transparent text-[#00f0ff] outline-none font-mono ml-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunCode}
              className="px-3 py-1 bg-[#102a3a] hover:bg-[#163a50] text-[#00f0ff] border border-[#00f0ff]/30 rounded text-xs transition-all flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Re-run Transaction</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Section: GOF ARCHITECTURAL DICHOTOMY */}
      <div className="space-y-4 pt-4 border-t border-[#14202d]">
        <div>
          <div className="text-[11px] font-mono text-[#00f0ff] tracking-wider uppercase font-semibold">
            GOF ARCHITECTURAL DICHOTOMY
          </div>
          <h2 className="text-lg font-bold text-[#f8fafc] tracking-tight">Object Adapter vs. Class Adapter</h2>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            The Adapter pattern can be structured via Object Composition (HAS-A) or Class Inheritance (IS-A).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Object Adapter */}
          <div className="bg-[#091018] rounded-xl border border-[#00f0ff]/40 p-5 space-y-4 shadow-[0_0_20px_rgba(0,240,255,0.06)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#f8fafc]">Object Adapter</h3>
                <span className="text-[11px] text-[#64748b]">Composition-based bridge</span>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-[#00f0ff]/15 text-[#00f0ff] rounded border border-[#00f0ff]/40 uppercase tracking-wide">
                COMPOSITION: HAS-A (RECOMMENDED)
              </span>
            </div>

            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Wraps a private instance of the adaptee class inside a composition reference.
            </p>

            {/* Topology ASCII Diagram */}
            <div className="bg-[#05080c] p-3 rounded-lg border border-[#142333] font-mono text-[11px] text-[#38bdf8] space-y-1">
              <div className="text-[9px] text-[#475569] uppercase font-bold tracking-wider">// RELATIONSHIP TOPOLOGY</div>
              <div>[ Client ] ──▶ ( «interface» Target )</div>
              <div className="pl-28 text-[#00f0ff]">▲</div>
              <div className="pl-28 text-[#64748b]">│ implements</div>
              <div>[ Adapter ] ────(HAS-A)────▶ [ Adaptee ]</div>
            </div>

            {/* Bullets */}
            <ul className="space-y-2 text-xs text-[#cbd5e1]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#f1f5f9]">Universal Compatibility:</strong> Works across Java, Python, TS,
                  C#, Rust, Go.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#f1f5f9]">Polymorphic Adaptees:</strong> Adapts any derived subclass of the
                  Adaptee.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#f1f5f9]">Decoupled:</strong> Injected via Dependency Injection (IoC).
                </div>
              </li>
            </ul>

            <div className="pt-3 border-t border-[#142333] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#64748b]">GoF GUIDELINE: Favor Composition</span>
              <span className="text-[#10b981] font-semibold">Standard Industry Pattern</span>
            </div>
          </div>

          {/* Card 2: Class Adapter */}
          <div className="bg-[#091018] rounded-xl border border-[#1b2b3d] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#f8fafc]">Class Adapter</h3>
                <span className="text-[11px] text-[#64748b]">Multiple-inheritance variant</span>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-[#14202d] text-[#94a3b8] rounded border border-[#223347] uppercase tracking-wide">
                INHERITANCE: IS-A
              </span>
            </div>

            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Derives directly from both the target interface and concrete adaptee class.
            </p>

            {/* Topology ASCII Diagram */}
            <div className="bg-[#05080c] p-3 rounded-lg border border-[#142333] font-mono text-[11px] text-[#94a3b8] space-y-1">
              <div className="text-[9px] text-[#475569] uppercase font-bold tracking-wider">// RELATIONSHIP TOPOLOGY</div>
              <div>[ Client ] ──▶ ( «interface» Target )   [ Adaptee Class ]</div>
              <div className="pl-28 text-[#64748b]">▲                     ▲</div>
              <div className="pl-28 text-[#64748b]">│ implements          │ extends (IS-A)</div>
              <div className="pl-24 text-[#64748b]">└───┬─────────────────┘</div>
              <div className="pl-28 text-[#38bdf8]">[ Adapter ]</div>
            </div>

            {/* Bullets */}
            <ul className="space-y-2 text-xs text-[#cbd5e1]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64748b] mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#f1f5f9]">Direct Override:</strong> Allows overriding methods of the parent
                  Adaptee directly.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64748b] mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#f1f5f9]">Language Wall:</strong> Not cleanly viable in single-inheritance
                  languages like Java or C#.
                </div>
              </li>
            </ul>

            <div className="pt-3 border-t border-[#142333] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#64748b]">REQUIRES: C++, Python, or Default Interfaces</span>
              <span className="text-[#f59e0b] font-semibold">Tight Coupling Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Section: SYSTEM EVALUATION */}
      <div className="space-y-4 pt-4 border-t border-[#14202d]">
        <div>
          <div className="text-[11px] font-mono text-[#00f0ff] tracking-wider uppercase font-semibold">
            SYSTEM EVALUATION
          </div>
          <h2 className="text-lg font-bold text-[#f8fafc] tracking-tight">Architectural Trade-Offs & Common Pitfalls</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 5 Core Advantages */}
          <div className="bg-[#091018] rounded-xl border border-[#10b981]/30 p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#10b981] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>5 Core Advantages</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {CORE_ADVANTAGES.map((adv, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[#f1f5f9] font-semibold">
                    {idx + 1}. {adv.title}:
                  </div>
                  <div className="text-[#94a3b8] leading-relaxed">{adv.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trade-Offs & Hidden Costs */}
          <div className="bg-[#091018] rounded-xl border border-[#ef4444]/30 p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#f87171] font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Trade-Offs & Hidden Costs</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {HIDDEN_COSTS.map((cost, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[#f1f5f9] font-semibold">
                    {idx + 1}. {cost.title}:
                  </div>
                  <div className="text-[#94a3b8] leading-relaxed">{cost.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 7. Section: GOF TAXONOMY Comparison Matrix */}
      <div className="space-y-4 pt-4 border-t border-[#14202d]">
        <div>
          <div className="text-[11px] font-mono text-[#00f0ff] tracking-wider uppercase font-semibold">
            GOF TAXONOMY
          </div>
          <h2 className="text-lg font-bold text-[#f8fafc] tracking-tight">Comparison Matrix: Adapter & Kin</h2>
        </div>

        <div className="bg-[#091018] rounded-xl border border-[#142333] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#060a0f] text-[#64748b] border-b border-[#14202d] text-[11px]">
                <th className="py-3 px-4 uppercase font-bold tracking-wider">PATTERN</th>
                <th className="py-3 px-4 uppercase font-bold tracking-wider">CORE INTENT</th>
                <th className="py-3 px-4 uppercase font-bold tracking-wider">MODIFIES INTERFACE?</th>
                <th className="py-3 px-4 uppercase font-bold tracking-wider">ADDS BEHAVIOR?</th>
                <th className="py-3 px-4 uppercase font-bold tracking-wider">1-LINE MENTAL MODEL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#14202d]">
              {GOF_COMPARISON_MATRIX.map((row) => {
                const isAdapter = row.pattern === 'Adapter';
                return (
                  <tr
                    key={row.pattern}
                    className={`transition-colors ${
                      isAdapter ? 'bg-[#00f0ff]/5 font-semibold text-[#f8fafc]' : 'hover:bg-[#0c1622] text-[#cbd5e1]'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-[#00f0ff]">{row.pattern}</td>
                    <td className="py-3 px-4 text-xs font-sans text-[#94a3b8] max-w-xs">{row.coreIntent}</td>
                    <td className="py-3 px-4">
                      <span
                        className={
                          row.modifiesInterfaceHighlight
                            ? 'text-[#00f0ff] font-bold'
                            : row.modifiesInterface.startsWith('YES')
                            ? 'text-[#38bdf8]'
                            : 'text-[#64748b]'
                        }
                      >
                        {row.modifiesInterface}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={row.addsBehaviorHighlight ? 'text-[#10b981] font-bold' : 'text-[#64748b]'}>
                        {row.addsBehavior}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-sans italic text-[#cbd5e1]">{row.mentalModel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
