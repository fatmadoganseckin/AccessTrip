import React from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { TripProvider } from './context/TripContext';

// Connected Public Marketing Website
import { PublicMarketingSite } from './components/marketing/PublicMarketingSite';

// Desktop SaaS App Shell & Operational Views
import { DesktopSaaSLayout } from './components/shell/DesktopSaaSLayout';
import { OverviewDashboard } from './components/app/OverviewDashboard';
import { TravellersManager } from './components/app/TravellersManager';
import { CaseManager } from './components/app/CaseManager';
import { CaseDetailView } from './components/app/CaseDetailView';
import { FundingManager } from './components/app/FundingManager';
import { DocumentManager } from './components/app/DocumentManager';
import { TeamManager } from './components/app/TeamManager';
import { OrgSettingsView } from './components/app/OrgSettingsView';

// Travel Module Canvas components
import { DestinationExplorerPage } from './components/explorer/DestinationExplorerPage';
import { AIAssistantDrawer } from './components/ai/AIAssistantDrawer';
import { InteractiveMapView } from './components/map/InteractiveMapView';
import { DragDropItineraryPlanner } from './components/planner/DragDropItineraryPlanner';
import { AccessibilityMetricsDashboard } from './components/dashboard/AccessibilityMetricsDashboard';
import { CommunityReviewList } from './components/reviews/CommunityReviewList';

const MainAppContent: React.FC = () => {
  const { activeView } = useApp();

  if (activeView === 'public_landing') {
    return <PublicMarketingSite />;
  }

  return (
    <DesktopSaaSLayout>
      {activeView === 'overview' && <OverviewDashboard />}
      {activeView === 'travellers' && <TravellersManager />}
      {activeView === 'cases' && <CaseManager />}
      {activeView === 'case_detail' && <CaseDetailView />}
      {activeView === 'stays' && <DestinationExplorerPage />}
      {activeView === 'destinations' && <DestinationExplorerPage />}
      {activeView === 'map' && <InteractiveMapView />}
      {activeView === 'requests' && <OverviewDashboard />}
      {activeView === 'funding' && <FundingManager />}
      {activeView === 'documents' && <DocumentManager />}
      {activeView === 'reports' && <AccessibilityMetricsDashboard />}
      {activeView === 'team' && <TeamManager />}
      {activeView === 'settings' && <OrgSettingsView />}
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
