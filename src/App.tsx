import React, { useState, useEffect, useRef } from 'react';
import { MainNavTab } from './types';
import { MODULE_LIST } from './data/codeData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CodePlaygroundView } from './components/CodePlaygroundView';
import { ConceptHubView } from './components/ConceptHubView';
import { ScenariosQuizView } from './components/ScenariosQuizView';

export function App() {
  const [activeTab, setActiveTab] = useState<MainNavTab>('playground');
  const [activeModuleId, setActiveModuleId] = useState<number>(6); // Module 06: Code Playground
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const mainScrollRef = useRef<HTMLElement | null>(null);

  const scrollToModuleSection = (moduleId: number) => {
    // Attempt scrolling to target module section smoothly
    const element = document.getElementById(`module-section-${moduleId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectModule = (id: number) => {
    setActiveModuleId(id);
    const mod = MODULE_LIST.find((m) => m.id === id);
    if (mod) {
      if (activeTab !== mod.tab) {
        setActiveTab(mod.tab);
        // Defer scroll to next tick to allow DOM rendering of new tab
        setTimeout(() => {
          scrollToModuleSection(id);
        }, 100);
      } else {
        // Same tab: scroll immediately
        scrollToModuleSection(id);
      }
    }
    setMobileSidebarOpen(false);
  };

  const handleSelectTab = (tab: MainNavTab) => {
    setActiveTab(tab);
    let defaultModule = 6;
    if (tab === 'concept') defaultModule = 1;
    else if (tab === 'playground') defaultModule = 6;
    else if (tab === 'scenarios') defaultModule = 10;
    
    setActiveModuleId(defaultModule);
    setMobileSidebarOpen(false);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b10] text-[#cbd5e1] flex flex-col font-sans">
      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Main Body: Sidebar + Dynamic Content View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Curriculum Sidebar */}
        <Sidebar
          activeModuleId={activeModuleId}
          onSelectModule={handleSelectModule}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Center/Main Scrollable Work Area */}
        <main ref={mainScrollRef} className="flex-1 overflow-y-auto px-6 py-6 bg-[#070b10] scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'playground' && <CodePlaygroundView onModuleChange={handleSelectModule} />}
            {activeTab === 'concept' && <ConceptHubView />}
            {activeTab === 'scenarios' && <ScenariosQuizView />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

