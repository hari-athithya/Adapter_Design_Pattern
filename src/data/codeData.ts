import { LanguageCodeSet, AnatomyPoint, ModuleItem, Language } from '../types';

export const LANGUAGE_ANATOMY_POINTS: Record<Language, AnatomyPoint[]> = {
  java: [
    { key: 'mask', title: 'Polymorphic Mask (implements Target)', line: 10, role: 'Implements PaymentProcessor so caller is unaware of wrapper' },
    { key: 'composition', title: 'Composition Reference (HAS-A adaptee)', line: 12, role: 'Maintains private reference to legacy service via DI' },
    { key: 'translation', title: 'Data Incompatibility Translation', line: 20, role: 'Translates double dollars to integer cents via Math.round' },
    { key: 'delegation', title: 'Adaptee Method Delegation', line: 21, role: 'Forwards converted parameters to legacy vendor method' },
    { key: 'canonical', title: 'Return Value Canonicalization', line: 22, role: 'Normalizes boolean or raw vendor status into modern PaymentResult' },
  ],
  python: [
    { key: 'mask', title: 'Polymorphic Mask (subclasses Target)', line: 10, role: 'Inherits PaymentProcessor abstract base class for caller typing' },
    { key: 'composition', title: 'Composition Reference (HAS-A adaptee)', line: 12, role: 'Takes legacy service instance through constructor injection' },
    { key: 'translation', title: 'Data Incompatibility Translation', line: 17, role: 'Converts float dollars to int cents: int(round(amount * 100))' },
    { key: 'delegation', title: 'Adaptee Method Delegation', line: 18, role: 'Dispatches execution to legacy execute_tx(cents, currency="USD")' },
    { key: 'canonical', title: 'Return Value Canonicalization', line: 19, role: 'Wraps raw boolean result into domain PaymentResult dataclass' },
  ],
  typescript: [
    { key: 'mask', title: 'Polymorphic Mask (implements Target)', line: 5, role: 'Implements PaymentProcessor interface for compile-time contract adherence' },
    { key: 'composition', title: 'Composition Reference (HAS-A adaptee)', line: 7, role: 'Holds private readonly reference to LegacyBillingSDK' },
    { key: 'translation', title: 'Data Incompatibility Translation', line: 15, role: 'Calculates integer cents: Math.round(amount * 100)' },
    { key: 'delegation', title: 'Adaptee Method Delegation', line: 16, role: 'Awaits legacy chargeCustomer(cents, "USD") async call' },
    { key: 'canonical', title: 'Return Value Canonicalization', line: 17, role: 'Constructs canonical PaymentResult object with timestamp' },
  ],
  csharp: [
    { key: 'mask', title: 'Polymorphic Mask (implements Target)', line: 4, role: 'Implements IPaymentProcessor for dependency injection registration' },
    { key: 'composition', title: 'Composition Reference (HAS-A adaptee)', line: 6, role: 'Private readonly field storing LegacyPaymentService dependency' },
    { key: 'translation', title: 'Data Incompatibility Translation', line: 16, role: 'Converts decimal amount to 32-bit int cents: (int)Math.Round(amount * 100m)' },
    { key: 'delegation', title: 'Adaptee Method Delegation', line: 17, role: 'Awaits _legacyService.MakePaymentAsync(cents, "USD")' },
    { key: 'canonical', title: 'Return Value Canonicalization', line: 18, role: 'Wraps boolean into modern immutable PaymentResult record' },
  ],
};

export const JAVA_ANATOMY_POINTS: AnatomyPoint[] = LANGUAGE_ANATOMY_POINTS.java;

export const CODE_DATA: Record<string, LanguageCodeSet> = {
  java: {
    language: 'java',
    name: 'Java',
    compiler: 'javac 21.0.2',
    runtime: 'JVM 21.0 (OpenJDK)',
    files: [
      {
        id: 'adapter',
        name: 'PaymentAdapter.java',
        roleTag: 'Adapter (Bridge)',
        lines: [
          { num: 1, code: '// 1. Target Interface: Standardized Modern Contract' },
          { num: 2, code: 'public interface PaymentProcessor {' },
          { num: 3, code: '  PaymentResult pay(double amount);' },
          { num: 4, code: '}' },
          { num: 5, code: '// 2. Incompatible Adaptee: Third-Party Enterprise SDK' },
          { num: 6, code: 'public class LegacyPaymentService {' },
          { num: 7, code: '  public boolean makePayment(int cents, String currency) { /* ... */ }' },
          { num: 8, code: '}' },
          { num: 9, code: '// 3. Adapter: Implements Target while composing Adaptee' },
          {
            num: 10,
            code: 'public class PaymentAdapter implements PaymentProcessor {',
            annotation: {
              badge: 'Polymorphism Mask',
              title: 'Target Interface Implementation',
              description: 'The Adapter implements the target interface, enabling seamless substitution anywhere PaymentProcessor is expected.',
              anatomyKey: 'mask',
              anatomyLabel: 'Polymorphic Mask (implements Target) L10'
            }
          },
          { num: 11, code: '  // Composition Reference (HAS-A)' },
          {
            num: 12,
            code: '  private final LegacyPaymentService legacyService;',
            annotation: {
              badge: 'Composition (HAS-A)',
              title: 'Adaptee Encapsulation',
              description: 'Holds a private, immutable instance of the incompatible adaptee, injected via constructor dependency injection.',
              anatomyKey: 'composition',
              anatomyLabel: 'Composition Reference (HAS-A adaptee) L12'
            }
          },
          { num: 13, code: '' },
          { num: 14, code: '  public PaymentAdapter(LegacyPaymentService legacyService) {' },
          { num: 15, code: '    this.legacyService = legacyService;' },
          { num: 16, code: '  }' },
          { num: 17, code: '  @Override' },
          {
            num: 18,
            code: '  public PaymentResult pay(double amount) {',
            annotation: {
              badge: 'Method Signature',
              title: 'Standard Client Contract',
              description: 'Exposes modern clean method signature accepting double dollar amounts.',
              anatomyKey: 'mask'
            }
          },
          { num: 19, code: '    // Parameter Normalization: Dollars to Cents Translation' },
          {
            num: 20,
            code: '    int cents = (int) Math.round(amount * 100);',
            annotation: {
              badge: 'Parameter Translation',
              title: 'Data Incompatibility Translation',
              description: 'Client supplies double dollars ($128.50), but legacy API strictly demands integer cents (12850).',
              vector: {
                source: '$128.50 USD (double)',
                transform: '100 round',
                target: '12850 Cents (int)'
              },
              anatomyKey: 'translation',
              anatomyLabel: 'Data Incompatibility Translation L20'
            }
          },
          {
            num: 21,
            code: '    boolean ok = legacyService.makePayment(cents, "USD");',
            annotation: {
              badge: 'Delegation Call',
              title: 'Adaptee Method Delegation',
              description: 'Dispatches execution to the legacy service using converted arguments and hardcoded or mapped system defaults.',
              anatomyKey: 'delegation',
              anatomyLabel: 'Adaptee Method Delegation L21'
            }
          },
          {
            num: 22,
            code: '    return new PaymentResult(ok ? "SUCCESS" : "FAILED");',
            annotation: {
              badge: 'Canonical Result',
              title: 'Return Value Canonicalization',
              description: 'Converts legacy primitive boolean into domain-level PaymentResult object matching modern architectural standards.',
              anatomyKey: 'canonical',
              anatomyLabel: 'Return Value Canonicalization L22'
            }
          },
          { num: 23, code: '  }' },
          { num: 24, code: '}' }
        ]
      },
      {
        id: 'target',
        name: 'PaymentProcessor.java',
        roleTag: 'Target',
        lines: [
          { num: 1, code: '// Modern Domain Contract for Client Systems' },
          { num: 2, code: 'package com.architect.payment;' },
          { num: 3, code: '' },
          { num: 4, code: 'public interface PaymentProcessor {' },
          {
            num: 5,
            code: '  PaymentResult pay(double amount);',
            annotation: {
              badge: 'Target Protocol',
              title: 'Standard Payment Contract',
              description: 'Every client checkout controller communicates solely via this interface.',
            }
          },
          { num: 6, code: '}' },
          { num: 7, code: '' },
          { num: 8, code: 'public record PaymentResult(String status, String txId) {' },
          { num: 9, code: '  public PaymentResult(String status) { this(status, java.util.UUID.randomUUID().toString()); }' },
          { num: 10, code: '}' }
        ]
      },
      {
        id: 'adaptee',
        name: 'LegacyPaymentService.java',
        roleTag: 'Adaptee',
        lines: [
          { num: 1, code: '// Incompatible 3rd-Party Vendor Library (Cannot be modified)' },
          { num: 2, code: 'package com.legacy.enterprise.sdk;' },
          { num: 3, code: '' },
          { num: 4, code: 'public class LegacyPaymentService {' },
          {
            num: 5,
            code: '  public boolean makePayment(int cents, String currency) {',
            annotation: {
              badge: 'Incompatible Method',
              title: 'Legacy Vendor Method',
              description: 'Requires integer cents and explicit ISO-4217 currency code. Completely incompatible with PaymentProcessor.pay(double).',
            }
          },
          { num: 6, code: '    System.out.printf("[LegacySDK] Processing %d %s\\n", cents, currency);' },
          { num: 7, code: '    return cents > 0;' },
          { num: 8, code: '  }' },
          { num: 9, code: '}' }
        ]
      }
    ],
    terminalDemo: {
      compileCmd: 'javac PaymentProcessor.java LegacyPaymentService.java PaymentAdapter.java',
      lines: [
        '[Adapter] Initialized with target interface [PaymentProcessor] wrapping [LegacyPaymentService].',
        '[Client] Invoking PaymentProcessor.pay(amount: $128.50)',
        '[Adapter::Transform] Converted 128.50 USD -> 12850 Cents.',
        '[LegacyPaymentService] makePayment(12850, "USD") -> true',
        "[Client] Result: PaymentResult[status='SUCCESS'] - Approved!"
      ]
    }
  },
  python: {
    language: 'python',
    name: 'Python',
    compiler: 'mypy 1.8.0',
    runtime: 'Python 3.12.2 (CPython)',
    files: [
      {
        id: 'adapter',
        name: 'payment_adapter.py',
        roleTag: 'Adapter (Bridge)',
        lines: [
          { num: 1, code: '# 1. Target Protocol & Incompatible SDK Import' },
          { num: 2, code: 'from abc import ABC, abstractmethod' },
          { num: 3, code: 'from dataclasses import dataclass' },
          { num: 4, code: 'from legacy_sdk import LegacyPaymentGateway' },
          { num: 5, code: '' },
          { num: 6, code: '@dataclass' },
          { num: 7, code: 'class PaymentResult:' },
          { num: 8, code: '    status: str' },
          { num: 9, code: '' },
          {
            num: 10,
            code: 'class PaymentAdapter(PaymentProcessor):',
            annotation: {
              badge: 'Polymorphism Mask',
              title: 'Subclassing Target Contract',
              description: 'Inherits PaymentProcessor abstract interface to satisfy client type annotations.',
              anatomyKey: 'mask',
              anatomyLabel: 'Polymorphic Mask (implements Target) L10'
            }
          },
          { num: 11, code: '    """Object Adapter wrapping LegacyPaymentGateway via composition."""' },
          {
            num: 12,
            code: '    def __init__(self, legacy_gw: LegacyPaymentGateway) -> None:',
            annotation: {
              badge: 'Composition (HAS-A)',
              title: 'Instance Encapsulation',
              description: 'Takes legacy service instance through constructor injection.',
              anatomyKey: 'composition',
              anatomyLabel: 'Composition Reference (HAS-A adaptee) L12'
            }
          },
          { num: 13, code: '        self._legacy_gw = legacy_gw' },
          { num: 14, code: '' },
          {
            num: 15,
            code: '    def pay(self, amount: float) -> PaymentResult:',
            annotation: {
              badge: 'Target Method',
              title: 'Modern Public Interface',
              description: 'Standard pay(amount) signature called by client checkout.',
              anatomyKey: 'mask'
            }
          },
          { num: 16, code: '        # Parameter Normalization: Float Dollars to Integer Cents' },
          {
            num: 17,
            code: '        cents: int = int(round(amount * 100))',
            annotation: {
              badge: 'Parameter Translation',
              title: 'Data Incompatibility Translation',
              description: 'Float dollar amount ($128.50) is converted into integer cents (12850).',
              vector: {
                source: '$128.50 USD (float)',
                transform: '100 round',
                target: '12850 Cents (int)'
              },
              anatomyKey: 'translation',
              anatomyLabel: 'Data Incompatibility Translation L17'
            }
          },
          {
            num: 18,
            code: '        is_approved: bool = self._legacy_gw.execute_tx(cents, currency="USD")',
            annotation: {
              badge: 'Delegation Call',
              title: 'Adaptee Method Delegation',
              description: 'Calls execute_tx() on legacy service with translated parameters.',
              anatomyKey: 'delegation',
              anatomyLabel: 'Adaptee Method Delegation L18'
            }
          },
          {
            num: 19,
            code: '        return PaymentResult(status="SUCCESS" if is_approved else "FAILED")',
            annotation: {
              badge: 'Canonical Result',
              title: 'Return Value Canonicalization',
              description: 'Wraps raw boolean response into domain PaymentResult dataclass.',
              anatomyKey: 'canonical',
              anatomyLabel: 'Return Value Canonicalization L19'
            }
          },
          { num: 20, code: '' }
        ]
      },
      {
        id: 'target',
        name: 'payment_processor.py',
        roleTag: 'Target',
        lines: [
          { num: 1, code: 'from abc import ABC, abstractmethod' },
          { num: 2, code: 'from dataclasses import dataclass' },
          { num: 3, code: '' },
          { num: 4, code: 'class PaymentProcessor(ABC):' },
          { num: 5, code: '    @abstractmethod' },
          {
            num: 6,
            code: '    def pay(self, amount: float) -> "PaymentResult":',
            annotation: {
              badge: 'Target Protocol',
              title: 'Abstract Client Contract',
              description: 'Defines the clean target protocol that checkout callers rely on, accepting standard float dollar amounts.',
            }
          },
          { num: 7, code: '        pass' }
        ]
      },
      {
        id: 'adaptee',
        name: 'legacy_sdk.py',
        roleTag: 'Adaptee',
        lines: [
          { num: 1, code: '# Third-party proprietary banking SDK' },
          { num: 2, code: 'class LegacyPaymentGateway:' },
          {
            num: 3,
            code: '    def execute_tx(self, amount_in_cents: int, currency: str = "USD") -> bool:',
            annotation: {
              badge: 'Incompatible Method',
              title: 'Legacy Vendor Signature',
              description: 'Requires integer cents and currency string. Direct invocation by client would violate separation of concerns.',
            }
          },
          { num: 4, code: '        print(f"[LegacySDK] Charge: {amount_in_cents} {currency}")' },
          { num: 5, code: '        return amount_in_cents > 0' }
        ]
      }
    ],
    terminalDemo: {
      compileCmd: 'python3 -m mypy payment_adapter.py && python3 main.py',
      lines: [
        '[Adapter] Initialized with target interface [PaymentProcessor] wrapping [LegacyPaymentGateway].',
        '[Client] Invoking PaymentProcessor.pay(amount: $128.50)',
        '[Adapter::Transform] Converted 128.50 USD -> 12850 Cents.',
        '[LegacySDK] execute_tx(12850, currency="USD") -> True',
        "[Client] Result: PaymentResult(status='SUCCESS') - Approved!"
      ]
    }
  },
  typescript: {
    language: 'typescript',
    name: 'TypeScript',
    compiler: 'tsc 5.4.2 (ESNext)',
    runtime: 'Node.js v20.11 / V8',
    files: [
      {
        id: 'adapter',
        name: 'PaymentAdapter.ts',
        roleTag: 'Adapter (Bridge)',
        lines: [
          { num: 1, code: '// 1. Target Interface & Incompatible SDK import' },
          { num: 2, code: 'import { PaymentProcessor, PaymentResult } from "./PaymentProcessor";' },
          { num: 3, code: 'import { LegacyBillingSDK } from "./legacy-billing-sdk";' },
          { num: 4, code: '' },
          {
            num: 5,
            code: 'export class PaymentAdapter implements PaymentProcessor {',
            annotation: {
              badge: 'Polymorphism Mask',
              title: 'Structural Subtyping Contract',
              description: 'Implements PaymentProcessor interface so caller treats it as first-class client contract.',
              anatomyKey: 'mask',
              anatomyLabel: 'Polymorphic Mask (implements Target) L5'
            }
          },
          { num: 6, code: '  // Composition Reference (HAS-A)' },
          {
            num: 7,
            code: '  private readonly legacySDK: LegacyBillingSDK;',
            annotation: {
              badge: 'Composition (HAS-A)',
              title: 'Private Adaptee Handle',
              description: 'Private reference to incompatible SDK.',
              anatomyKey: 'composition',
              anatomyLabel: 'Composition Reference (HAS-A adaptee) L7'
            }
          },
          { num: 8, code: '' },
          { num: 9, code: '  constructor(legacySDK: LegacyBillingSDK) {' },
          { num: 10, code: '    this.legacySDK = legacySDK;' },
          { num: 11, code: '  }' },
          { num: 12, code: '' },
          {
            num: 13,
            code: '  public async pay(amount: number): Promise<PaymentResult> {',
            annotation: {
              badge: 'Modern Signature',
              title: 'Clean Modern API',
              description: 'Accepts standard numeric dollars and returns Promise<PaymentResult>.',
              anatomyKey: 'mask'
            }
          },
          { num: 14, code: '    // Parameter Normalization: Decimal dollars to integer cents' },
          {
            num: 15,
            code: '    const cents = Math.round(amount * 100);',
            annotation: {
              badge: 'Parameter Translation',
              title: 'Data Incompatibility Translation',
              description: 'Converts double dollars to integer cents to avoid floating-point errors.',
              vector: {
                source: '$128.50 USD (number)',
                transform: '100 round',
                target: '12850 Cents (number)'
              },
              anatomyKey: 'translation',
              anatomyLabel: 'Data Incompatibility Translation L15'
            }
          },
          {
            num: 16,
            code: '    const success = await this.legacySDK.chargeCustomer(cents, "USD");',
            annotation: {
              badge: 'Delegation Call',
              title: 'Adaptee Method Delegation',
              description: 'Forwards mapped cents to legacy SDK charge method.',
              anatomyKey: 'delegation',
              anatomyLabel: 'Adaptee Method Delegation L16'
            }
          },
          {
            num: 17,
            code: '    return { status: success ? "SUCCESS" : "FAILED", timestamp: Date.now() };',
            annotation: {
              badge: 'Canonical Result',
              title: 'Return Value Canonicalization',
              description: 'Normalizes return value into modern PaymentResult structure.',
              anatomyKey: 'canonical',
              anatomyLabel: 'Return Value Canonicalization L17'
            }
          },
          { num: 18, code: '  }' },
          { num: 19, code: '}' }
        ]
      },
      {
        id: 'target',
        name: 'PaymentProcessor.ts',
        roleTag: 'Target',
        lines: [
          { num: 1, code: 'export interface PaymentResult {' },
          { num: 2, code: '  status: "SUCCESS" | "FAILED";' },
          { num: 3, code: '  timestamp: number;' },
          { num: 4, code: '}' },
          { num: 5, code: '' },
          { num: 6, code: 'export interface PaymentProcessor {' },
          {
            num: 7,
            code: '  pay(amount: number): Promise<PaymentResult>;',
            annotation: {
              badge: 'Target Protocol',
              title: 'Modern Async Client Interface',
              description: 'Standard TypeScript contract returning Promise<PaymentResult> for non-blocking payment processing.',
            }
          },
          { num: 8, code: '}' }
        ]
      },
      {
        id: 'adaptee',
        name: 'legacy-billing-sdk.ts',
        roleTag: 'Adaptee',
        lines: [
          { num: 1, code: '// Legacy Node module (v1.2.0, year 2014)' },
          { num: 2, code: 'export class LegacyBillingSDK {' },
          {
            num: 3,
            code: '  public async chargeCustomer(cents: number, cur: string): Promise<boolean> {',
            annotation: {
              badge: 'Incompatible Method',
              title: 'Legacy SDK Method',
              description: 'Requires integer cents and separate currency code. Unsuitable for modern domain services without an adapter.',
            }
          },
          { num: 4, code: '    // Old SOAP/XML or binary wire protocol' },
          { num: 5, code: '    return cents > 0;' },
          { num: 6, code: '  }' },
          { num: 7, code: '}' }
        ]
      }
    ],
    terminalDemo: {
      compileCmd: 'tsc --noEmit && node dist/index.js',
      lines: [
        '[Adapter] Initialized with target interface [PaymentProcessor] wrapping [LegacyBillingSDK].',
        '[Client] Invoking PaymentProcessor.pay(amount: $128.50)',
        '[Adapter::Transform] Converted 128.50 USD -> 12850 Cents.',
        '[LegacyBillingSDK] chargeCustomer(12850, "USD") -> true',
        "[Client] Result: PaymentResult{ status: 'SUCCESS', timestamp: 1726099500000 } - Approved!"
      ]
    }
  },
  csharp: {
    language: 'csharp',
    name: 'C# (.NET)',
    compiler: 'dotnet build (Roslyn .NET 8.0)',
    runtime: 'CoreCLR 8.0 (x64)',
    files: [
      {
        id: 'adapter',
        name: 'PaymentAdapter.cs',
        roleTag: 'Adapter (Bridge)',
        lines: [
          { num: 1, code: '// 1. Target Interface: Modern Clean Architecture' },
          { num: 2, code: 'namespace ArchitectCore.Payments;' },
          { num: 3, code: '' },
          {
            num: 4,
            code: 'public class PaymentAdapter : IPaymentProcessor',
            annotation: {
              badge: 'Polymorphic Mask',
              title: 'Explicit Interface Implementation',
              description: 'Implements IPaymentProcessor, enabling IoC container registration via AddScoped<IPaymentProcessor, PaymentAdapter>().',
              anatomyKey: 'mask',
              anatomyLabel: 'Polymorphic Mask (implements Target) L4'
            }
          },
          { num: 5, code: '{' },
          {
            num: 6,
            code: '    private readonly LegacyPaymentService _legacyService;',
            annotation: {
              badge: 'Composition (HAS-A)',
              title: 'Private Dependency',
              description: 'Private readonly reference to the legacy COM / legacy DLL service.',
              anatomyKey: 'composition',
              anatomyLabel: 'Composition Reference (HAS-A adaptee) L6'
            }
          },
          { num: 7, code: '' },
          { num: 8, code: '    public PaymentAdapter(LegacyPaymentService legacyService)' },
          { num: 9, code: '    {' },
          { num: 10, code: '        _legacyService = legacyService ?? throw new ArgumentNullException(nameof(legacyService));' },
          { num: 11, code: '    }' },
          { num: 12, code: '' },
          {
            num: 13,
            code: '    public async Task<PaymentResult> PayAsync(decimal amount)',
            annotation: {
              badge: 'Async Contract',
              title: 'Modern Asynchronous Interface',
              description: 'Adheres to Task-based Asynchronous Pattern (TAP).',
              anatomyKey: 'mask'
            }
          },
          { num: 14, code: '    {' },
          { num: 15, code: '        // Parameter Normalization: Decimal to Cents' },
          {
            num: 16,
            code: '        int cents = (int)Math.Round(amount * 100m);',
            annotation: {
              badge: 'Parameter Translation',
              title: 'Data Incompatibility Translation',
              description: 'Converts decimal dollar amount into 32-bit integer cents.',
              vector: {
                source: '$128.50 USD (decimal)',
                transform: '100 round',
                target: '12850 Cents (int)'
              },
              anatomyKey: 'translation',
              anatomyLabel: 'Data Incompatibility Translation L16'
            }
          },
          {
            num: 17,
            code: '        bool ok = await _legacyService.MakePaymentAsync(cents, "USD");',
            annotation: {
              badge: 'Delegation Call',
              title: 'Adaptee Method Delegation',
              description: 'Dispatches execution to legacy COM / legacy method with converted arguments.',
              anatomyKey: 'delegation',
              anatomyLabel: 'Adaptee Method Delegation L17'
            }
          },
          {
            num: 18,
            code: '        return new PaymentResult(ok ? "SUCCESS" : "FAILED");',
            annotation: {
              badge: 'Canonical Result',
              title: 'Return Value Canonicalization',
              description: 'Wraps raw boolean result into modern domain PaymentResult record.',
              anatomyKey: 'canonical',
              anatomyLabel: 'Return Value Canonicalization L18'
            }
          },
          { num: 19, code: '    }' },
          { num: 20, code: '}' }
        ]
      },
      {
        id: 'target',
        name: 'IPaymentProcessor.cs',
        roleTag: 'Target',
        lines: [
          { num: 1, code: 'namespace ArchitectCore.Payments;' },
          { num: 2, code: '' },
          { num: 3, code: 'public record PaymentResult(string Status);' },
          { num: 4, code: '' },
          { num: 5, code: 'public interface IPaymentProcessor' },
          { num: 6, code: '{' },
          {
            num: 7,
            code: '    Task<PaymentResult> PayAsync(decimal amount);',
            annotation: {
              badge: 'Target Protocol',
              title: '.NET Asynchronous Contract',
              description: 'C# Task-based asynchronous contract accepting high-precision financial decimal.',
            }
          },
          { num: 8, code: '}' }
        ]
      },
      {
        id: 'adaptee',
        name: 'LegacyPaymentService.cs',
        roleTag: 'Adaptee',
        lines: [
          { num: 1, code: '// Legacy DLL assembly from 2011' },
          { num: 2, code: 'namespace LegacyVendor.Enterprise;' },
          { num: 3, code: '' },
          { num: 4, code: 'public class LegacyPaymentService' },
          { num: 5, code: '{' },
          {
            num: 6,
            code: '    public Task<bool> MakePaymentAsync(int cents, string currency)',
            annotation: {
              badge: 'Incompatible Method',
              title: 'Legacy COM / DLL Method',
              description: 'Consumes integer cents and currency string, returning raw Task<bool>.',
            }
          },
          { num: 7, code: '    {' },
          { num: 8, code: '        return Task.FromResult(cents > 0);' },
          { num: 9, code: '    }' },
          { num: 10, code: '}' }
        ]
      }
    ],
    terminalDemo: {
      compileCmd: 'dotnet run --project ArchitectCore.Payments.csproj',
      lines: [
        '[Adapter] Initialized with target interface [IPaymentProcessor] wrapping [LegacyPaymentService].',
        '[Client] Invoking IPaymentProcessor.PayAsync(amount: 128.50m)',
        '[Adapter::Transform] Converted 128.50 USD -> 12850 Cents.',
        '[LegacyPaymentService] MakePaymentAsync(12850, "USD") -> True',
        "[Client] Result: PaymentResult { Status = SUCCESS } - Approved!"
      ]
    }
  }
};

export const MODULE_LIST: ModuleItem[] = [
  { id: 1, code: '01', title: 'Overview & Concept', category: 'core', tab: 'concept' },
  { id: 2, code: '02', title: 'The Problem & Solution', category: 'core', tab: 'concept' },
  { id: 3, code: '03', title: 'Execution Timeline', category: 'core', tab: 'concept' },
  { id: 4, code: '04', title: 'Structure & UML', category: 'architecture', tab: 'concept' },
  { id: 5, code: '05', title: 'Interactive Simulator', category: 'practice', tab: 'playground' },
  { id: 6, code: '06', title: 'Code Playground', category: 'core', tab: 'playground' },
  { id: 7, code: '07', title: 'Object vs Class Adapter', category: 'architecture', tab: 'playground' },
  { id: 8, code: '08', title: 'Trade-offs & Pitfalls', category: 'architecture', tab: 'playground' },
  { id: 9, code: '09', title: 'Pattern Comparison', category: 'deep-dive', tab: 'playground' },
  { id: 10, code: '10', title: 'Real-World Scenarios', category: 'deep-dive', tab: 'scenarios' },
  { id: 11, code: '11', title: 'Decision Tree', category: 'deep-dive', tab: 'scenarios' },
  { id: 12, code: '12', title: 'Interactive Quiz', category: 'practice', tab: 'scenarios' },
  { id: 13, code: '13', title: 'Cheat Sheet Reference', category: 'deep-dive', tab: 'scenarios' },
];
