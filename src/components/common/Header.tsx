import React, { useState } from 'react';
import { Globe, User, Menu, X, ShieldAlert, Bell, Sparkles } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { EmergencyModal } from './EmergencyModal';
import { NotificationCenter } from './NotificationCenter';

interface Props {
  onOpenProfile: () => void;
}

export const Header: React.FC<Props> = ({ onOpenProfile }) => {
  const { activeTab, setActiveTab, notifications } = useTrip();
  const { user, openAuthModal } = useAuth();
  const { profile } = useAccessibility();

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { id: 'landing' | 'explorer' | 'map' | 'reviews' | 'planner' | 'dashboard'; label: string; badge?: string }[] = [
    { id: 'landing', label: 'Explore' },
    { id: 'explorer', label: 'Stays', badge: 'New' },
    { id: 'map', label: 'Map' },
    { id: 'reviews', label: 'Community' },
    { id: 'planner', label: 'Pricing' },
    { id: 'dashboard', label: 'Resources' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
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
                <span className="text-[10px] text-slate-500 font-semibold block -mt-1">
                  Travel for everyone.
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-bold text-slate-700 dark:text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center space-x-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-lg px-2 py-1 ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                      : 'hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-[9px] rounded-md uppercase tracking-wider">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Action Buttons */}
          <div className="flex items-center space-x-3">
            
            {/* SOS Mode */}
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              title="Emergency SOS Mode"
              aria-label="Emergency SOS Mode"
            >
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl focus:outline-none"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
              )}
            </button>

            {/* Language Selector */}
            <div className="hidden sm:flex items-center space-x-1 text-xs font-bold text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900">
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </div>

            {/* User Auth Controls */}
            {user ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-emerald-500 object-cover cursor-pointer"
                onClick={openAuthModal}
              />
            ) : (
              <>
                <button
                  onClick={openAuthModal}
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 px-2 py-1"
                >
                  Log in
                </button>
                <button
                  onClick={openAuthModal}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-all"
                >
                  Sign up
                </button>
              </>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-white dark:bg-slate-900 border-b border-slate-200 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-100"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <EmergencyModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
