import React, { useState } from 'react';
import { Compass, Calendar, Sparkles, Heart, Building2, Hotel, User, Globe, Menu, X, ShieldAlert, Bell } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

interface Props {
  onOpenProfile: () => void;
}

export const ConsumerHeader: React.FC<Props> = ({ onOpenProfile }) => {
  const { activeTab, setActiveTab } = useTrip();
  const { user, openAuthModal } = useAuth();
  const { setActiveView } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-2.5 text-left focus:outline-none focus:ring-4 focus:ring-emerald-400 rounded-2xl p-1"
            aria-label="AccessTrip Home"
          >
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md shadow-emerald-600/20">
              ♿
            </div>
            <div>
              <span className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight block">
                AccessTrip
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block -mt-1">
                Smart Accessible Travel
              </span>
            </div>
          </button>
        </div>

        {/* Consumer B2C Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-bold text-slate-700 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('landing')}
            className={`hover:text-emerald-600 transition-colors ${activeTab === 'landing' ? 'text-emerald-600 font-extrabold' : ''}`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveTab('explorer')}
            className={`hover:text-emerald-600 transition-colors ${activeTab === 'explorer' ? 'text-emerald-600 font-extrabold' : ''}`}
          >
            Stays
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`hover:text-emerald-600 transition-colors ${activeTab === 'map' ? 'text-emerald-600 font-extrabold' : ''}`}
          >
            Destinations
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className={`flex items-center space-x-1 hover:text-emerald-600 transition-colors ${activeTab === 'assistant' ? 'text-emerald-600 font-extrabold' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Planner</span>
          </button>
        </nav>

        {/* Right Actions & Portal Switcher */}
        <div className="flex items-center space-x-3">
          
          {/* Workspace Portals Dropdown Button */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => setActiveView('overview')}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-extrabold text-[11px] rounded-xl flex items-center space-x-1.5 border border-slate-200 dark:border-slate-700 transition-all"
              title="Switch to Organization SaaS Portal"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Org Portal</span>
            </button>

            <button
              onClick={() => setActiveView('settings')}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-extrabold text-[11px] rounded-xl flex items-center space-x-1.5 border border-slate-200 dark:border-slate-700 transition-all"
              title="Switch to Hotel Partner Portal"
            >
              <Hotel className="w-3.5 h-3.5 text-amber-500" />
              <span>Partner Portal</span>
            </button>
          </div>

          {/* User Sign In / Profile */}
          {user ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-emerald-500 object-cover cursor-pointer"
              onClick={openAuthModal}
            />
          ) : (
            <button
              onClick={openAuthModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
            >
              Sign up
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
