import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/gofData';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ArrowRight,
  Sparkles,
  RefreshCw,
  GitFork,
  BookOpen,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ScenariosQuizView: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [activeScenario, setActiveScenario] = useState<'stripe' | 'storage' | 'xml'>('stripe');

  // Decision Tree state
  const [decisionStep, setDecisionStep] = useState<number>(1);
  const [decisionResult, setDecisionResult] = useState<string | null>(null);

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score === QUIZ_QUESTIONS.length) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const scenarios = {
    stripe: {
      title: 'Unified Multi-Gateway Payment Rails',
      problem: 'Your enterprise checkout needs to support Stripe, PayPal, and Adyen simultaneously. Stripe takes cent amounts with tokens, PayPal requires OAuth redirect flows with dollar strings, and Adyen uses encrypted card blocks.',
      solution: 'Define a clean target interface `PaymentGateway { charge(PaymentRequest): Promise<PaymentResponse> }`. Write `StripeAdapter`, `PayPalAdapter`, and `AdyenAdapter`. Checkout controller is completely agnostic to vendor quirks.',
      codePreview: `class StripeAdapter implements PaymentGateway {
  constructor(private stripe: StripeClient) {}
  async charge(req: PaymentRequest): Promise<PaymentResponse> {
    const charge = await this.stripe.charges.create({
      amount: Math.round(req.amountUSD * 100),
      currency: "usd",
      source: req.token
    });
    return { success: charge.paid, txId: charge.id };
  }
}`
    },
    storage: {
      title: 'Cloud Agnostic Blob Storage System',
      problem: 'Your application needs to run on AWS in US regions (using S3 SDK with `PutObjectCommand`) and Google Cloud in Europe (using Google Cloud Storage `file.createWriteStream()`).',
      solution: 'Define `CloudStorageService { upload(key: string, data: Buffer): Promise<string> }`. Create `S3StorageAdapter` and `GCSStorageAdapter`. Your image upload controllers simply call `storage.upload()` without cloud lock-in.',
      codePreview: `class S3StorageAdapter implements CloudStorageService {
  constructor(private s3: S3Client, private bucket: string) {}
  async upload(key: string, data: Buffer): Promise<string> {
    await this.s3.send(new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: data }));
    return \`https://\${this.bucket}.s3.amazonaws.com/\${key}\`;
  }
}`
    },
    xml: {
      title: 'Legacy SOAP/XML Core Banking Bridge',
      problem: 'The core banking mainframe only accepts raw XML over TCP sockets with rigid namespaces and custom checksum bytes, but the new mobile app microservice expects standard REST JSON.',
      solution: 'Implement `CoreBankingAdapter` that takes JSON DTOs, validates them, generates the legacy SOAP envelope with security headers, establishes socket transport, parses the XML response, and maps errors back to HTTP 400/500 JSON.',
      codePreview: `class BankingAdapter implements ModernAccountService {
  async getBalance(accountId: string): Promise<AccountBalance> {
    const soapEnvelope = this.xmlSerializer.buildSoapPayload(accountId);
    const rawXml = await this.socketClient.send(soapEnvelope);
    return this.xmlParser.extractBalance(rawXml);
  }
}`
    }
  };

  const curScenario = scenarios[activeScenario];

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header */}
      <div className="border-b border-[#14202d] pb-6">
        <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-[#00f0ff]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
          <span>03 // PRODUCTION SCENARIOS & INTERACTIVE EVALUATION</span>
        </div>
        <h1 className="text-xl font-bold text-[#f8fafc] tracking-tight">
          Enterprise Scenarios, Decision Tree & Mastery Quiz
        </h1>
        <p className="text-xs text-[#94a3b8] mt-1 max-w-3xl leading-relaxed">
          Explore production-tested patterns from top engineering organizations, test your architectural intuition with the diagnostic decision tree, and validate your mastery of the GoF Adapter pattern.
        </p>
      </div>

      {/* 2. Real-World Enterprise Scenarios */}
      <div id="module-section-10" className="bg-[#091018] rounded-xl border border-[#142333] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#00f0ff] font-bold">CASE STUDIES</div>
            <h2 className="text-sm font-bold text-[#f8fafc]">Production Enterprise Scenarios</h2>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs bg-[#060a0f] p-1 rounded-lg border border-[#14202d]">
            <button
              onClick={() => setActiveScenario('stripe')}
              className={`px-3 py-1 rounded transition-all ${
                activeScenario === 'stripe' ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40' : 'text-[#64748b] hover:text-[#cbd5e1]'
              }`}
            >
              Multi-Gateway Payments
            </button>
            <button
              onClick={() => setActiveScenario('storage')}
              className={`px-3 py-1 rounded transition-all ${
                activeScenario === 'storage' ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40' : 'text-[#64748b] hover:text-[#cbd5e1]'
              }`}
            >
              Agnostic Cloud Storage
            </button>
            <button
              onClick={() => setActiveScenario('xml')}
              className={`px-3 py-1 rounded transition-all ${
                activeScenario === 'xml' ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40' : 'text-[#64748b] hover:text-[#cbd5e1]'
              }`}
            >
              SOAP XML to REST JSON
            </button>
          </div>
        </div>

        <div className="space-y-3 bg-[#060a0f] p-4 rounded-lg border border-[#142333]">
          <h3 className="text-sm font-bold text-[#f1f5f9]">{curScenario.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1 bg-[#0b121a] p-3 rounded border border-[#172638]">
              <div className="text-[#f87171] font-bold font-mono text-[11px]">THE IMPEDANCE PROBLEM:</div>
              <p className="text-[#cbd5e1] leading-relaxed">{curScenario.problem}</p>
            </div>

            <div className="space-y-1 bg-[#091a24] p-3 rounded border border-[#00f0ff]/30">
              <div className="text-[#00f0ff] font-bold font-mono text-[11px]">ADAPTER ARCHITECTURE:</div>
              <p className="text-[#cbd5e1] leading-relaxed">{curScenario.solution}</p>
            </div>
          </div>

          {/* Code snippet */}
          <div className="bg-[#05070a] p-3 rounded border border-[#142333] font-mono text-xs text-[#a7f3d0] overflow-x-auto">
            <pre>{curScenario.codePreview}</pre>
          </div>
        </div>
      </div>

      {/* 3. Interactive Decision Tree */}
      <div id="module-section-11" className="bg-[#091018] rounded-xl border border-[#142333] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#00f0ff] font-bold">ARCHITECTURAL DIAGNOSTIC</div>
            <h2 className="text-sm font-bold text-[#f8fafc]">Interactive Decision Tree: "Do I Need an Adapter?"</h2>
          </div>
          <button
            onClick={() => {
              setDecisionStep(1);
              setDecisionResult(null);
            }}
            className="text-xs font-mono text-[#64748b] hover:text-[#00f0ff] flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Restart Wizard</span>
          </button>
        </div>

        <div className="bg-[#060a0f] p-4 rounded-lg border border-[#142333] space-y-4">
          {!decisionResult ? (
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#00f0ff]">Question 0{decisionStep}:</div>

              {decisionStep === 1 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[#f1f5f9]">
                    Do you already have an existing class or 3rd-party library whose interface doesn't match what your client code expects?
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDecisionStep(2)}
                      className="px-4 py-2 bg-[#00f0ff]/15 hover:bg-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/40 rounded-lg text-xs font-mono font-bold"
                    >
                      Yes, an existing interface is incompatible
                    </button>
                    <button
                      onClick={() => {
                        setDecisionResult("You don't need an Adapter! If you are creating a new subsystem from scratch, simply design the interface to match your exact needs.");
                      }}
                      className="px-4 py-2 bg-[#121c28] hover:bg-[#1a293a] text-[#94a3b8] rounded-lg text-xs font-mono"
                    >
                      No, we are writing new code from scratch
                    </button>
                  </div>
                </div>
              )}

              {decisionStep === 2 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[#f1f5f9]">
                    Are you trying to simplify a complex subsystem behind a single unified entry point, or translate a specific interface?
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDecisionStep(3)}
                      className="px-4 py-2 bg-[#00f0ff]/15 hover:bg-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/40 rounded-lg text-xs font-mono font-bold"
                    >
                      Translate one specific interface to another
                    </button>
                    <button
                      onClick={() => {
                        setDecisionResult("Use the FACADE pattern! When you want to simplify multiple complex subsystem objects into a convenient high-level API, Facade is the intended solution.");
                      }}
                      className="px-4 py-2 bg-[#121c28] hover:bg-[#1a293a] text-[#94a3b8] rounded-lg text-xs font-mono"
                    >
                      Simplify a complex multi-class subsystem
                    </button>
                  </div>
                </div>
              )}

              {decisionStep === 3 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[#f1f5f9]">
                    Are you trying to add new dynamic behavior (like caching, encryption, logging) without modifying the interface?
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setDecisionResult("DEFINITIVE VERDICT: USE THE ADAPTER PATTERN! Use an Object Adapter (composition) to wrap the incompatible service and implement your client target interface.");
                      }}
                      className="px-4 py-2 bg-[#00f0ff] text-[#070b10] rounded-lg text-xs font-mono font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                    >
                      No, strictly translate signatures & data types
                    </button>
                    <button
                      onClick={() => {
                        setDecisionResult("Use the DECORATOR or PROXY pattern! If the interface remains identical but you want to attach behavior dynamically (caching, logging, access control), use Decorator or Proxy.");
                      }}
                      className="px-4 py-2 bg-[#121c28] hover:bg-[#1a293a] text-[#94a3b8] rounded-lg text-xs font-mono"
                    >
                      Yes, we want to add extra responsibilities
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-[#07131e] border border-[#00f0ff]/50 space-y-2">
              <div className="flex items-center gap-2 text-[#00f0ff] font-bold text-xs font-mono">
                <Sparkles className="w-4 h-4" />
                <span>ARCHITECTURAL RECOMMENDATION</span>
              </div>
              <p className="text-xs text-[#f1f5f9] leading-relaxed font-sans">{decisionResult}</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Interactive GoF Mastery Quiz */}
      <div id="module-section-12" className="bg-[#091018] rounded-xl border border-[#142333] p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#00f0ff] font-bold">KNOWLEDGE CHECK</div>
            <h2 className="text-sm font-bold text-[#f8fafc]">Interactive Adapter Mastery Quiz</h2>
          </div>

          {submitted && (
            <div className="flex items-center gap-2 bg-[#060a0f] px-3 py-1 rounded-lg border border-[#142333]">
              <Award className="w-4 h-4 text-[#00f0ff]" />
              <span className="text-xs font-mono text-[#cbd5e1]">
                Final Score: <strong className="text-[#00f0ff]">{calculateScore()}/{QUIZ_QUESTIONS.length}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const selectedOpt = selectedAnswers[q.id];
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div
                key={q.id}
                className="bg-[#060a0f] p-4 rounded-lg border border-[#142333] space-y-3 font-sans text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-[#f1f5f9] leading-relaxed">
                    <span className="font-mono text-[#00f0ff] mr-1.5">{qIndex + 1}.</span>
                    {q.question}
                  </h4>
                  {submitted && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#ef4444] flex-shrink-0" />
                      )}
                    </span>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-1.5 font-mono text-xs">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = selectedOpt === optIdx;
                    let optStyle = 'bg-[#09111a] text-[#94a3b8] hover:bg-[#0f1a26] border-[#142333]';

                    if (submitted) {
                      if (optIdx === q.correctIndex) {
                        optStyle = 'bg-[#06241b] text-[#34d399] border-[#10b981]/60 font-semibold';
                      } else if (isOptionSelected && !isCorrect) {
                        optStyle = 'bg-[#290d0d] text-[#f87171] border-[#ef4444]/60 line-through';
                      }
                    } else if (isOptionSelected) {
                      optStyle = 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/60 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-2.5 rounded border transition-all flex items-start gap-2.5 ${optStyle}`}
                      >
                        <span className="text-[10px] uppercase font-bold text-[#64748b] mt-0.5">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="flex-1 leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback */}
                {submitted && (
                  <div
                    className={`p-3 rounded text-xs leading-relaxed ${
                      isCorrect ? 'bg-[#06241b] text-[#a7f3d0] border border-[#10b981]/30' : 'bg-[#1e1414] text-[#fca5a5] border border-[#ef4444]/30'
                    }`}
                  >
                    <strong>Explanation: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quiz Controls */}
        <div className="flex items-center justify-between pt-2">
          {!submitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
              className="px-4 py-2 bg-[#00f0ff] hover:bg-[#38bdf8] text-[#070b10] rounded-lg text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit & Check Answers ({Object.keys(selectedAnswers).length}/{QUIZ_QUESTIONS.length})
            </button>
          ) : (
            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 bg-[#121f2d] hover:bg-[#1a2d42] text-[#00f0ff] border border-[#00f0ff]/30 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* 5. Module 13: Cheat Sheet Reference */}
      <div id="module-section-13" className="bg-[#091018] rounded-xl border border-[#142333] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#00f0ff] font-bold">RAPID REFERENCE</div>
            <h2 className="text-sm font-bold text-[#f8fafc]">Adapter Pattern Architectural Cheat Sheet</h2>
          </div>
          <span className="text-xs font-mono text-[#64748b]">Module 13</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-3.5 bg-[#060a0f] rounded-lg border border-[#1b2b3d] space-y-2">
            <div className="text-[#38bdf8] font-bold">WHEN TO USE:</div>
            <ul className="space-y-1.5 text-[11px] text-[#94a3b8] font-sans list-disc list-inside">
              <li>When you want to use an existing class, but its interface does not match the rest of your code.</li>
              <li>When you need to create a reusable class that cooperates with unrelated or unforeseen classes.</li>
              <li>When writing integration layers for multiple payment, SMS, or storage providers.</li>
              <li>When migrating legacy monolith subsystems to cloud-native microservices.</li>
            </ul>
          </div>

          <div className="p-3.5 bg-[#060a0f] rounded-lg border border-[#1b2b3d] space-y-2">
            <div className="text-[#00f0ff] font-bold">CRITICAL IMPLEMENTATION RULES:</div>
            <ul className="space-y-1.5 text-[11px] text-[#94a3b8] font-sans list-disc list-inside">
              <li><strong>Favor Object Composition</strong> over Class Inheritance (Single-responsibility, dynamic dispatch).</li>
              <li><strong>Catch & Translate Exceptions</strong> to prevent Adaptee vendor types from leaking to callers.</li>
              <li><strong>Do NOT Add Unrelated Business Logic</strong>; an Adapter should strictly handle interface and data translation.</li>
              <li><strong>Keep Adapters Lightweight</strong>: Delegate heavy computational work to the underlying service.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
