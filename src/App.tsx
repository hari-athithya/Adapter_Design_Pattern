import React, { useState } from 'react';
import { MainNavTab } from './types';
import { MODULE_LIST } from './data/codeData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CodePlaygroundView } from './components/CodePlaygroundView';
import { ConceptHubView } from './components/ConceptHubView';
import { ScenariosQuizView } from './components/ScenariosQuizView';

export function App() {
  const [activeTab, setActiveTab] = useState<MainNavTab>('playground');
  const [activeModuleId, setActiveModuleId] = useState<number>(6); // Module 06: Code Playground is active in screenshot
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const handleSelectModule = (id: number) => {
    setActiveModuleId(id);
    const mod = MODULE_LIST.find((m) => m.id === id);
    if (mod) {
      setActiveTab(mod.tab);
    }
    setMobileSidebarOpen(false);
  };

  const handleSelectTab = (tab: MainNavTab) => {
    setActiveTab(tab);
    if (tab === 'concept') setActiveModuleId(1);
    else if (tab === 'playground') setActiveModuleId(6);
    else if (tab === 'scenarios') setActiveModuleId(10);
    setMobileSidebarOpen(false);
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
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-[#070b10]">
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
