import React from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { TripProvider } from './context/TripContext';

// Connected Public Marketing Website
import { PublicMarketingSite } from './components/marketing/PublicMarketingSite';

// Desktop Application Shell & Core Workspaces
import { DesktopSaaSLayout } from './components/shell/DesktopSaaSLayout';
import { OverviewDashboard } from './components/app/OverviewDashboard';
import { StaysMarketplacePage } from './components/stays/StaysMarketplacePage';
import { DestinationsPage } from './components/destinations/DestinationsPage';
import { AIPlannerWorkspace } from './components/ai/AIPlannerWorkspace';
import { AccessibilityReportsPage } from './components/reports/AccessibilityReportsPage';

// Secondary Enterprise Workspaces
import { TravellersManager } from './components/app/TravellersManager';
import { CaseManager } from './components/app/CaseManager';
import { CaseDetailView } from './components/app/CaseDetailView';
import { FundingManager } from './components/app/FundingManager';
import { DocumentManager } from './components/app/DocumentManager';
import { TeamManager } from './components/app/TeamManager';
import { OrgSettingsView } from './components/app/OrgSettingsView';
import { ConsumerDashboard } from './components/b2c/ConsumerDashboard';

const MainAppContent: React.FC = () => {
  const { activeView } = useApp();

  if (activeView === 'public_landing') {
    return <PublicMarketingSite />;
  }

  return (
    <DesktopSaaSLayout>
      {activeView === 'overview' && <OverviewDashboard />}
      {activeView === 'stays' && <StaysMarketplacePage />}
      {activeView === 'destinations' && <DestinationsPage />}
      {activeView === 'ai_planner' && <AIPlannerWorkspace />}
      {activeView === 'trips' && <ConsumerDashboard />}
      {activeView === 'saved' && <ConsumerDashboard />}
      {activeView === 'reports' && <AccessibilityReportsPage />}
      {activeView === 'settings' && <OrgSettingsView />}

      {/* Secondary Enterprise Organization Workspaces */}
      {activeView === 'cases' && <CaseManager />}
      {activeView === 'case_detail' && <CaseDetailView />}
      {activeView === 'travellers' && <TravellersManager />}
      {activeView === 'funding' && <FundingManager />}
      {activeView === 'documents' && <DocumentManager />}
      {activeView === 'team' && <TeamManager />}
    </DesktopSaaSLayout>
  );
};

export function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <AppProvider>
          <TripProvider>
            <MainAppContent />
          </TripProvider>
        </AppProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
}

export default App;
