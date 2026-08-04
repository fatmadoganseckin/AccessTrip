import React, { useState } from 'react';
import { LayoutDashboard, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { AccessibilityToolbar } from '../common/AccessibilityToolbar';
import { AuthModal } from '../auth/AuthModal';
import { ProfileOnboardingModal } from '../profile/ProfileOnboardingModal';

// Landing sub-components
import { Hero } from '../landing/Hero';
import { PopularDestinations } from '../landing/PopularDestinations';
import { VerifiedStaysGrid } from '../landing/VerifiedStaysGrid';
import { TrustFeaturesBar } from '../landing/TrustFeaturesBar';
import { CommunityStories } from '../landing/CommunityStories';
import { InteractiveWorldMap } from '../landing/InteractiveWorldMap';
import { FeatureGrid } from '../landing/FeatureGrid';
import { Pricing } from '../landing/Pricing';
import { FAQ } from '../landing/FAQ';

export const PublicMarketingSite: React.FC = () => {
  const { setActiveView } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors">
      
      {/* Top Banner allowing transition to SaaS Desktop App */}
      <div className="bg-emerald-700 text-white px-4 py-2 text-xs font-bold flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="w-4 h-4 text-amber-300" />
          <span>AccessTrip SaaS Desktop Platform is active for Charities, NGOs & Travel Coordinators.</span>
        </div>

        <button
          onClick={() => setActiveView('overview')}
          className="px-3 py-1 bg-white text-emerald-900 font-black text-xs rounded-xl shadow hover:bg-emerald-50 flex items-center space-x-1.5 transition-all"
        >
          <span>Enter Desktop SaaS Platform</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <Header onOpenProfile={() => setIsProfileOpen(true)} />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        <Hero onOpenProfile={() => setIsProfileOpen(true)} />
        <PopularDestinations />
        <VerifiedStaysGrid />
        <TrustFeaturesBar />
        <CommunityStories />
        <InteractiveWorldMap />
        <FeatureGrid />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
      <AccessibilityToolbar />
      <AuthModal />
      <ProfileOnboardingModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};
