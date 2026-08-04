import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SupportCase } from '../types/case';
import { SEEDED_CASES } from '../services/mockDataSeeder';

export type SaaSView =
  | 'public_landing'
  | 'overview'
  | 'travellers'
  | 'cases'
  | 'case_detail'
  | 'stays'
  | 'destinations'
  | 'map'
  | 'requests'
  | 'bookings'
  | 'funding'
  | 'documents'
  | 'reports'
  | 'team'
  | 'settings';

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
  const [activeView, setActiveView] = useState<SaaSView>('overview');
  const [envMode, setEnvMode] = useState<EnvironmentMode>('mock');
  const [activeCase, setActiveCase] = useState<SupportCase | null>(SEEDED_CASES[0]);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
