import React, { useState } from 'react';
import { Building2, Hotel, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConsumerHeader } from '../b2c/ConsumerHeader';
import { ConsumerFooter } from '../b2c/ConsumerFooter';
import { B2CHero } from '../b2c/B2CHero';
import { TrendingDestinations } from '../b2c/TrendingDestinations';
import { HotelMarketplaceGrid } from '../b2c/HotelMarketplaceGrid';
import { AITripPlannerPreview } from '../b2c/AITripPlannerPreview';
import { PopularExperiences } from '../b2c/PopularExperiences';
import { VerifiedCommunityReports } from '../b2c/VerifiedCommunityReports';
import { AccessibilityToolbar } from '../common/AccessibilityToolbar';
import { AuthModal } from '../auth/AuthModal';
import { ProfileOnboardingModal } from '../profile/ProfileOnboardingModal';

export const PublicMarketingSite: React.FC = () => {
  const { setActiveView } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors">
      
      {/* Top Banner allowing transition to Workspaces (Organization Portal & Partner Portal) */}
      <div className="bg-slate-900 text-white px-4 py-2 text-xs font-bold flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-800 shadow-md">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>AccessTrip Workspace Portals: Enterprise SaaS for Charities, NGOs & Hotel Partners.</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveView('overview')}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow flex items-center space-x-1 transition-all"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Organization Portal (portal.accesstrip.com)</span>
          </button>

          <button
            onClick={() => setActiveView('settings')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 font-extrabold text-xs rounded-xl border border-slate-700 flex items-center space-x-1 transition-all"
          >
            <Hotel className="w-3.5 h-3.5" />
            <span>Partner Portal (partners.accesstrip.com)</span>
          </button>
        </div>
      </div>

      <ConsumerHeader onOpenProfile={() => setIsProfileOpen(true)} />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        <B2CHero />
        <TrendingDestinations />
        <HotelMarketplaceGrid />
        <AITripPlannerPreview />
        <PopularExperiences />
        <VerifiedCommunityReports />
      </main>

      <ConsumerFooter />
      <AccessibilityToolbar />
      <AuthModal />
      <ProfileOnboardingModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};
