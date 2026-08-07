import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SupportCase } from '../types/case';
import { SEEDED_CASES } from '../services/mockDataSeeder';

export type SaaSView =
  | 'public_landing'
  | 'overview'
  | 'stays'
  | 'destinations'
  | 'ai_planner'
  | 'trips'
  | 'saved'
  | 'reports'
  | 'settings'
  | 'travellers'
  | 'cases'
  | 'case_detail'
  | 'requests'
  | 'funding'
  | 'documents'
  | 'team';

export type EnvironmentMode = 'mock' | 'sandbox' | 'production';

interface AppContextType {
  activeView: SaaSView;
  setActiveView: (view: SaaSView) => void;
  envMode: EnvironmentMode;
  setEnvMode: (mode: EnvironmentMode) => void;
  activeCase: SupportCase | null;
  setActiveCase: (c: SupportCase | null) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<SaaSView>('stays');
  const [envMode, setEnvMode] = useState<EnvironmentMode>('mock');
  const [activeCase, setActiveCase] = useState<SupportCase | null>(SEEDED_CASES[0]);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Keyboard Shortcuts (Ctrl+K = search, S = Stays, D = Destinations, A = AI Planner)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
      if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        if (e.key.toLowerCase() === 's') setActiveView('stays');
        if (e.key.toLowerCase() === 'd') setActiveView('destinations');
        if (e.key.toLowerCase() === 'a') setActiveView('ai_planner');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        envMode,
        setEnvMode,
        activeCase,
        setActiveCase,
        globalSearchQuery,
        setGlobalSearchQuery,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
