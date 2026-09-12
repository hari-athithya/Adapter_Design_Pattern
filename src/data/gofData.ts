export interface GofPatternComparison {
  pattern: string;
  coreIntent: string;
  modifiesInterface: string;
  modifiesInterfaceHighlight?: boolean;
  addsBehavior: string;
  addsBehaviorHighlight?: boolean;
  mentalModel: string;
}

export const GOF_COMPARISON_MATRIX: GofPatternComparison[] = [
  {
    pattern: 'Adapter',
    coreIntent: 'Converts one interface into another incompatible interface.',
    modifiesInterface: 'YES (Translates)',
    modifiesInterfaceHighlight: true,
    addsBehavior: 'No (Only protocol)',
    addsBehaviorHighlight: false,
    mentalModel: '"UK plug to EU wall socket converter."'
  },
  {
    pattern: 'Facade',
    coreIntent: 'Provides a higher-level simplified entrypoint to a subsystem.',
    modifiesInterface: 'YES (Simplifies)',
    modifiesInterfaceHighlight: false,
    addsBehavior: 'No (Orchestrates)',
    addsBehaviorHighlight: false,
    mentalModel: '"Universal TV master power button."'
  },
  {
    pattern: 'Decorator',
    coreIntent: 'Attaches additional responsibilities dynamically without subclassing.',
    modifiesInterface: 'NO (Identical)',
    modifiesInterfaceHighlight: false,
    addsBehavior: 'YES (Enhances)',
    addsBehaviorHighlight: true,
    mentalModel: '"Warm coat over winter clothes."'
  },
  {
    pattern: 'Bridge',
    coreIntent: 'Decouples an abstraction from implementation so both can vary.',
    modifiesInterface: 'Independent',
    modifiesInterfaceHighlight: false,
    addsBehavior: 'No (Decouples)',
    addsBehaviorHighlight: false,
    mentalModel: '"Device driver architecture."'
  }
];

export const CORE_ADVANTAGES = [
  {
    title: 'Zero Upstream Modification',
    detail: 'Legacy and 3rd-party vendor code is kept immutable. You never have to hack vendor jars, DLLs, or fragile upstream repositories.'
  },
  {
    title: 'Single Responsibility Principle',
    detail: 'Wire conversion logic, protocol mapping, and data normalization are segregated from domain core business rules.'
  },
  {
    title: 'Open/Closed Principle',
    detail: 'New vendor providers, payment rails, or protocol updates can be plugged in with zero client modifications.'
  },
  {
    title: 'Safe Incremental Migrations',
    detail: 'Allows phased refactoring behind stable interfaces, enabling canary releases or strangler-fig system upgrades.'
  },
  {
    title: 'Testability & Mocks',
    detail: 'Enables lightweight mocking and isolation in unit test suites without requiring real network connections or legacy hardware.'
  }
];

export const HIDDEN_COSTS = [
  {
    title: 'Multiplied Complexity',
    detail: 'Introduces pairs of interfaces and wrapper classes. For trivial microservices, too many single-method adapters can bloat codebases.'
  },
  {
    title: 'Stack Trace Indirection',
    detail: 'Debugging involves extra intermediate jump frames, requiring developers to step through adapter forwarding layers.'
  },
  {
    title: 'Leaky Abstractions',
    detail: 'Adaptee-specific exceptions or timeout codes must be actively caught and remapped to avoid exposing legacy leaks to caller.'
  },
  {
    title: 'Impedance Mismatch',
    detail: 'Extreme model divergences (e.g. streaming WebSocket vs batch polling, asynchronous vs synchronous) make adapters brittle.'
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary motivation for selecting the Adapter pattern over the Facade pattern?",
    options: [
      "Adapter makes an existing incompatible interface adhere to a client-expected target contract, while Facade creates a brand new simplified interface.",
      "Adapter always introduces multi-threading and caching layers to the adaptee.",
      "Adapter modifies the original source code of the adaptee directly to optimize bytecode.",
      "Adapter creates multiple instances of the subsystem to balance load."
    ],
    correctIndex: 0,
    explanation: "Correct! The Adapter focuses on matching an existing interface to an established contract. Facade focuses on creating a new, simpler interface for a complex subsystem."
  },
  {
    id: 2,
    question: "Why does the Gang of Four (GoF) recommend Object Adapters over Class Adapters in modern software?",
    options: [
      "Object Adapters use inheritance which makes them faster in runtime dispatch.",
      "Object Adapters rely on Object Composition (HAS-A), allowing them to adapt any subclass of the Adaptee and working in single-inheritance languages like Java and C#.",
      "Class Adapters cannot be compiled in C++ or Python.",
      "Object Adapters do not require any memory allocation."
    ],
    correctIndex: 1,
    explanation: "Spot on! 'Favor object composition over class inheritance' is a foundational GoF design principle. Composition (HAS-A) keeps coupling low and enables runtime polymorphism."
  },
  {
    id: 3,
    question: "What happens when an adaptee method throws a vendor-specific checked exception in a well-architected Adapter?",
    options: [
      "The Adapter ignores it and returns null.",
      "The Adapter must bubble up the vendor exception directly so the client deals with it.",
      "The Adapter catches the vendor-specific exception and translates it into a domain-canonical exception specified by the Target interface.",
      "The Adapter automatically shuts down the application."
    ],
    correctIndex: 2,
    explanation: "Exact! To prevent 'Leaky Abstractions', the adapter intercepts vendor-specific exceptions and converts them into standardized domain exceptions."
  },
  {
    id: 4,
    question: "In our payment gateway code example, what was the data incompatibility between the client and the legacy service?",
    options: [
      "Client provided Bitcoin, while legacy required Ethereum.",
      "Client supplied floating/double dollars ($128.50), but legacy API strictly demanded integer cents (12850).",
      "Client sent XML payload while legacy service expected YAML.",
      "Client requested synchronous response while legacy service only supported email notifications."
    ],
    correctIndex: 1,
    explanation: "Precisely! Line 20 performs `int cents = (int) Math.round(amount * 100);` to bridge this exact impedance mismatch."
  }
];
