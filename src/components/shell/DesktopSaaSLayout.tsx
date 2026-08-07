import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopAppBar } from './TopAppBar';
import { ModeBanner } from './ModeBanner';
import { AccessibilityToolbar } from '../common/AccessibilityToolbar';

interface Props {
  children: ReactNode;
}

export const DesktopSaaSLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 antialiased">
      
      {/* Left Desktop SaaS Navigation Sidebar */}
      <Sidebar />

      {/* Main SaaS Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top App Bar & Environment Mode Banner */}
        <ModeBanner />
        <TopAppBar />

        {/* Scrollable Work Area Canvas (Restricted to 1440px max width) */}
        <main className="flex-1 overflow-y-auto p-6 focus:outline-none" tabIndex={-1}>
          <div className="max-w-[1440px] mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      <AccessibilityToolbar />
    </div>
  );
};
