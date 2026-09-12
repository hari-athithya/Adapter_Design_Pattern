import React, { useState } from 'react';
import { ArrowRight, Plug, Cpu, Layers, CheckCircle2, AlertTriangle, Play, RefreshCw } from 'lucide-react';

export const ConceptHubView: React.FC = () => {
  const [activeMetaphor, setActiveMetaphor] = useState<'plug' | 'memory' | 'audio'>('plug');
  const [simStep, setSimStep] = useState<number>(0);

  const metaphors = {
    plug: {
      title: 'Power Plug Adapter',
      subtitle: 'UK 3-pin plug into EU 2-pin round wall socket',
      client: 'Laptop Charger (UK 3-Pin)',
      adapter: 'Travel Adapter Housing',
      adaptee: 'Hotel Wall Socket (EU 2-Pin 230V)',
      desc: 'Your laptop charger expects rectangular prongs with an earth pin. The European hotel wall only accepts two round prongs. The travel adapter does not generate electricity; it simply reshapes the physical contacts so current flows seamlessly.',
      quote: '"UK plug to EU wall socket converter."'
    },
    memory: {
      title: 'MicroSD to SD Card Sleeve',
      subtitle: 'Miniature flash chip into full-size camera slot',
      client: 'DSLR Professional Camera',
      adapter: 'Plastic SD Card Sleeve',
      adaptee: 'Tiny MicroSD Chip',
      desc: 'The camera slot expects 9 wide metal pin pads in a standard 32x24mm plastic cartridge. The phone flash card is only 15x11mm with 8 dense pins. The adapter routes electrical traces from the mini pins to the standard pads without modifying the flash memory controller.',
      quote: '"Form-factor & wire layout bridge."'
    },
    audio: {
      title: 'USB-C to 3.5mm Headphone Jack',
      subtitle: 'Digital audio stream into analog wired headphones',
      client: 'Smartphone (Digital PCM)',
      adapter: 'DAC Dongle Adapter',
      adaptee: 'Studio Monitor Headphones (Analog Jack)',
      desc: 'Modern smartphones output raw digital packets via USB-C. Legacy wired headphones require analog voltage waves. The adapter contains a DAC (Digital-to-Analog Converter) that translates digital frames into analog speaker currents.',
      quote: '"Digital stream to analog wire translator."'
    }
  };

  const curMetaphor = metaphors[activeMetaphor];

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header */}
      <div className="border-b border-[#14202d] pb-6">
        <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-[#00f0ff]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
          <span>01 // ARCHITECTURAL FOUNDATION & MENTAL MODELS</span>
        </div>
        <h1 className="text-xl font-bold text-[#f8fafc] tracking-tight">
          Overview & Conceptual Blueprint
        </h1>
        <p className="text-xs text-[#94a3b8] mt-1 max-w-3xl leading-relaxed">
          The <strong className="text-[#00f0ff]">Adapter Pattern</strong> (also known as the <strong className="text-[#f1f5f9]">Wrapper</strong>) 
          converts the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.
        </p>
      </div>

      {/* 2. Interactive Real-World Metaphors */}
      <div className="bg-[#091018] rounded-xl border border-[#142333] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#00f0ff] font-bold">PHYSICAL HARDWARE INTUITION</div>
            <h2 className="text-sm font-bold text-[#f8fafc]">Real-World Metaphors</h2>
          </div>

          {/* Selector buttons */}
          <div className="flex items-center gap-1.5 font-mono text-xs bg-[#060a0f] p-1 rounded-lg border border-[#14202d]">
            <button
              onClick={() => setActiveMetaphor('plug')}
              className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
                activeMetaphor === 'plug' ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40' : 'text-[#64748b] hover:text-[#cbd5e1]'
              }`}
            >
              <Plug className="w-3.5 h-3.5" />
              <span>Travel Plug</span>
            </button>
            <button
              onClick={() => setActiveMetaphor('memory')}
              className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
                activeMetaphor === 'memory' ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40' : 'text-[#64748b] hover:text-[#cbd5e1]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>MicroSD Sleeve</span>
            </button>
            <button
              onClick={() => setActiveMetaphor('audio')}
              className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
                activeMetaphor === 'audio' ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40' : 'text-[#64748b] hover:text-[#cbd5e1]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Audio DAC Dongle</span>
            </button>
          </div>
        </div>

        {/* Metaphor Card */}
        <div className="bg-[#060a0f] p-4 rounded-lg border border-[#142333] grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="p-3 bg-[#081018] rounded-lg border border-[#1b2b3d] text-center space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#38bdf8] font-bold">[ CLIENT ]</span>
            <div className="text-xs font-semibold text-[#f8fafc]">{curMetaphor.client}</div>
            <div className="text-[10px] text-[#64748b]">Expects Standard Interface</div>
          </div>

          <div className="p-3 bg-[#0c1f2b] rounded-lg border border-[#00f0ff]/40 text-center space-y-1 shadow-[0_0_15px_rgba(0,240,255,0.08)]">
            <span className="text-[10px] font-mono uppercase text-[#00f0ff] font-bold">[ ADAPTER ]</span>
            <div className="text-xs font-bold text-[#00f0ff]">{curMetaphor.adapter}</div>
            <div className="text-[10px] text-[#94a3b8]">Translates Contact Traces & Protocol</div>
          </div>

          <div className="p-3 bg-[#1c140c] rounded-lg border border-[#7c2d12] text-center space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#fb923c] font-bold">[ ADAPTEE ]</span>
            <div className="text-xs font-semibold text-[#f8fafc]">{curMetaphor.adaptee}</div>
            <div className="text-[10px] text-[#64748b]">Incompatible Legacy / External Service</div>
          </div>
        </div>

        <p className="text-xs text-[#cbd5e1] leading-relaxed">
          {curMetaphor.desc}
        </p>

        <div className="text-xs font-mono italic text-[#00f0ff]">
          Mental Model: {curMetaphor.quote}
        </div>
      </div>

      {/* 3. Interactive UML Architecture Diagram */}
      <div className="bg-[#091018] rounded-xl border border-[#142333] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#00f0ff] font-bold">STRUCTURAL TOPOLOGY</div>
            <h2 className="text-sm font-bold text-[#f8fafc]">UML Class Diagram & Association</h2>
          </div>
          <span className="text-[11px] font-mono text-[#64748b]">GoF Structural Pattern #1</span>
        </div>

        {/* SVG Diagram Canvas */}
        <div className="bg-[#05080c] p-6 rounded-lg border border-[#142333] flex flex-col items-center justify-center overflow-x-auto">
          <div className="min-w-[650px] w-full max-w-2xl py-4 font-mono text-xs">
            <div className="grid grid-cols-3 gap-6 items-center">
              {/* Client Box */}
              <div className="bg-[#0a121c] border border-[#1e2f42] rounded-lg p-3 space-y-2 text-center shadow">
                <div className="text-[#38bdf8] font-bold">Client</div>
                <div className="text-[10px] text-[#64748b] border-t border-[#1e2f42] pt-1">
                  checkout(PaymentProcessor)
                </div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center justify-center text-[#64748b] text-[10px]">
                <div className="flex items-center w-full justify-center">
                  <div className="h-0.5 bg-[#64748b] flex-1"></div>
                  <ArrowRight className="w-4 h-4 text-[#64748b] -ml-1" />
                </div>
                <span className="mt-1">uses contract</span>
              </div>

              {/* Target Interface */}
              <div className="bg-[#0a1824] border border-[#0284c7]/50 rounded-lg p-3 space-y-1 text-center shadow">
                <div className="text-[10px] text-[#38bdf8] italic font-serif">«interface»</div>
                <div className="text-[#f8fafc] font-bold">PaymentProcessor</div>
                <div className="text-[10px] text-[#94a3b8] border-t border-[#142a3e] pt-1">
                  + pay(amount: double)
                </div>
              </div>
            </div>

            {/* Vertical connector down to Adapter */}
            <div className="grid grid-cols-3 gap-6 my-2 items-center">
              <div></div>
              <div></div>
              <div className="flex flex-col items-center justify-center text-[#00f0ff] text-[10px]">
                <div className="w-0.5 h-8 bg-dashed bg-[#00f0ff]"></div>
                <span className="text-[9px] text-[#00f0ff] mt-0.5">implements</span>
                <div className="text-[#00f0ff] -mt-1">▲</div>
              </div>
            </div>

            {/* Bottom Row: Adapter & Adaptee */}
            <div className="grid grid-cols-3 gap-6 items-center">
              <div></div>

              {/* Adapter Box */}
              <div className="col-span-2 grid grid-cols-2 gap-6 bg-[#07131d] border border-[#00f0ff]/50 rounded-xl p-3.5 shadow-[0_0_20px_rgba(0,240,255,0.08)]">
                {/* Adapter */}
                <div className="space-y-1.5 border-r border-[#142a3e] pr-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00f0ff]">PaymentAdapter</span>
                    <span className="text-[9px] px-1 bg-[#00f0ff]/20 text-[#00f0ff] rounded">Bridge</span>
                  </div>
                  <div className="text-[10px] text-[#64748b] border-t border-[#142a3e] pt-1 space-y-0.5">
                    <div>- legacyService: Legacy</div>
                    <div className="text-[#10b981]">+ pay(amount: double)</div>
                  </div>
                </div>

                {/* Delegation Arrow to Adaptee */}
                <div className="space-y-1.5 pl-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#fb923c]">LegacyPaymentService</span>
                    <span className="text-[9px] px-1 bg-[#fb923c]/20 text-[#fb923c] rounded">Adaptee</span>
                  </div>
                  <div className="text-[10px] text-[#64748b] border-t border-[#142a3e] pt-1">
                    <div>+ makePayment(cents, cur)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Step-by-Step Execution Sequence */}
      <div className="bg-[#091018] rounded-xl border border-[#142333] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#00f0ff] font-bold">RUNTIME FLOW SIMULATOR</div>
            <h2 className="text-sm font-bold text-[#f8fafc]">Step-by-Step Execution Timeline</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSimStep((prev) => (prev + 1) % 5)}
              className="px-3 py-1 bg-[#00f0ff] hover:bg-[#38bdf8] text-[#070b10] rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Next Step ({simStep + 1}/5)</span>
            </button>
            <button
              onClick={() => setSimStep(0)}
              className="p-1 text-[#64748b] hover:text-[#94a3b8] rounded"
              title="Reset"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-5 gap-2 font-mono text-[11px]">
          {[
            '1. Client Calls Target',
            '2. Adapter Intercepts',
            '3. Parameter Conversion',
            '4. Adaptee Dispatched',
            '5. Canonical Result',
          ].map((title, idx) => {
            const isActive = simStep === idx;
            const isPast = simStep > idx;
            return (
              <button
                key={idx}
                onClick={() => setSimStep(idx)}
                className={`p-2 rounded text-left border transition-all ${
                  isActive
                    ? 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/60 font-bold'
                    : isPast
                    ? 'bg-[#0a1824] text-[#10b981] border-[#10b981]/30'
                    : 'bg-[#070b11] text-[#475569] border-[#14202d]'
                }`}
              >
                <div className="text-[9px] text-[#475569]">STEP 0{idx + 1}</div>
                <div className="truncate">{title.split('. ')[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Step Detail Box */}
        <div className="bg-[#05080c] p-4 rounded-lg border border-[#142333] space-y-2 font-mono text-xs">
          {simStep === 0 && (
            <div className="space-y-1">
              <span className="text-[#38bdf8] font-bold">CLIENT INVOCATION:</span>
              <p className="text-[#cbd5e1] font-sans">
                The e-commerce checkout service calls <code className="text-[#00f0ff]">processor.pay(128.50)</code>. 
                The client believes it is speaking to a generic standard payment processor and has zero idea that a 15-year-old banking SDK lurks underneath.
              </p>
            </div>
          )}
          {simStep === 1 && (
            <div className="space-y-1">
              <span className="text-[#00f0ff] font-bold">POLYMORPHIC DISPATCH TO ADAPTER:</span>
              <p className="text-[#cbd5e1] font-sans">
                Because <code className="text-[#00f0ff]">PaymentAdapter</code> implements <code className="text-[#00f0ff]">PaymentProcessor</code>, 
                the runtime routes the call into the adapter's overridden <code className="text-[#00f0ff]">pay(amount)</code> method.
              </p>
            </div>
          )}
          {simStep === 2 && (
            <div className="space-y-1">
              <span className="text-[#f59e0b] font-bold">DATA IMPEDANCE TRANSLATION:</span>
              <p className="text-[#cbd5e1] font-sans">
                The adapter normalizes data structures: <code className="text-[#f59e0b]">int cents = (int) Math.round(128.50 * 100) = 12850</code>. 
                It also injects default required context like <code className="text-[#34d399]">currency="USD"</code>.
              </p>
            </div>
          )}
          {simStep === 3 && (
            <div className="space-y-1">
              <span className="text-[#fb923c] font-bold">ADAPTEE EXECUTION:</span>
              <p className="text-[#cbd5e1] font-sans">
                The adapter delegates execution to the composed legacy instance: 
                <code className="text-[#fb923c]">legacyService.makePayment(12850, "USD")</code>. The legacy service performs raw socket or database calls.
              </p>
            </div>
          )}
          {simStep === 4 && (
            <div className="space-y-1">
              <span className="text-[#10b981] font-bold">RESULT CANONICALIZATION & RETURN:</span>
              <p className="text-[#cbd5e1] font-sans">
                The legacy service returns a primitive <code className="text-[#38bdf8]">true</code>. The adapter wraps it into a rich domain entity 
                <code className="text-[#10b981]">new PaymentResult("SUCCESS")</code> and delivers it back to the client.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
