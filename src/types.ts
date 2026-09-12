export type Language = 'java' | 'python' | 'typescript' | 'csharp';

export type MainNavTab = 'concept' | 'playground' | 'scenarios';

export interface CodeLineAnnotation {
  badge: string;
  title: string;
  description: string;
  vector?: {
    source: string;
    transform: string;
    target: string;
  };
  anatomyKey?: string;
  anatomyLabel?: string;
}

export interface CodeLine {
  num: number;
  code: string;
  annotation?: CodeLineAnnotation;
}

export interface CodeFile {
  id: string;
  name: string;
  roleTag: string; // e.g., 'Adapter (Bridge)', 'Target', 'Adaptee'
  lines: CodeLine[];
}

export interface LanguageCodeSet {
  language: Language;
  name: string;
  compiler: string;
  runtime: string;
  files: CodeFile[];
  terminalDemo: {
    compileCmd: string;
    lines: string[];
  };
}

export interface AnatomyPoint {
  key: string;
  title: string;
  line: number;
  role: string;
}

export interface ModuleItem {
  id: number;
  code: string;
  title: string;
  category: 'core' | 'architecture' | 'deep-dive' | 'practice';
  tab: MainNavTab;
}
