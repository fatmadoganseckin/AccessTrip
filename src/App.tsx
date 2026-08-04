import React, { useState } from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { TripProvider, useTrip } from './context/TripContext';
import { SkipLink } from './components/common/SkipLink';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AccessibilityToolbar } from './components/common/AccessibilityToolbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { AuthModal } from './components/auth/AuthModal';
import { ProfileOnboardingModal } from './components/profile/ProfileOnboardingModal';

// Landing sub-components
import { Hero } from './components/landing/Hero';
import { PopularDestinations } from './components/landing/PopularDestinations';
import { VerifiedStaysGrid } from './components/landing/VerifiedStaysGrid';
import { TrustFeaturesBar } from './components/landing/TrustFeaturesBar';
import { CommunityStories } from './components/landing/CommunityStories';
import { InteractiveWorldMap } from './components/landing/InteractiveWorldMap';
import { FeatureGrid } from './components/landing/FeatureGrid';
import { Pricing } from './components/landing/Pricing';
import { FAQ } from './components/landing/FAQ';

// Main module pages
import { DestinationExplorerPage } from './components/explorer/DestinationExplorerPage';
import { AIAssistantDrawer } from './components/ai/AIAssistantDrawer';
import { InteractiveMapView } from './components/map/InteractiveMapView';
import { DragDropItineraryPlanner } from './components/planner/DragDropItineraryPlanner';
import { AccessibilityMetricsDashboard } from './components/dashboard/AccessibilityMetricsDashboard';
import { CommunityReviewList } from './components/reviews/CommunityReviewList';

const MainContent: React.FC = () => {
  const { activeTab } = useTrip();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <SkipLink />
      <Header onOpenProfile={() => setIsProfileOpen(true)} />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {activeTab === 'landing' && (
          <>
            <Hero onOpenProfile={() => setIsProfileOpen(true)} />
            <PopularDestinations />
            <VerifiedStaysGrid />
            <TrustFeaturesBar />
            <CommunityStories />
            <InteractiveWorldMap />
            <FeatureGrid />
            <Pricing />
            <FAQ />
          </>
        )}

        {activeTab === 'explorer' && <DestinationExplorerPage />}
        {activeTab === 'assistant' && <AIAssistantDrawer />}
        {activeTab === 'map' && <InteractiveMapView />}
        {activeTab === 'planner' && <DragDropItineraryPlanner />}
        {activeTab === 'dashboard' && <AccessibilityMetricsDashboard />}
        {activeTab === 'reviews' && <CommunityReviewList />}
      </main>

      <Footer />
      <AccessibilityToolbar />
      <MobileBottomNav onOpenProfile={() => setIsProfileOpen(true)} />
      <AuthModal />
      <ProfileOnboardingModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <TripProvider>
          <MainContent />
        </TripProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
}

export default App;
