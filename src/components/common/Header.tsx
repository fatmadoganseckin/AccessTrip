import React, { useState } from 'react';
import { ShieldAlert, Bell, Sparkles, Compass, Map, LayoutDashboard, MessageSquareQuote, Calendar, User, Keyboard, Menu, X } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { EmergencyModal } from './EmergencyModal';
import { NotificationCenter } from './NotificationCenter';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';

interface Props {
  onOpenProfile: () => void;
}

export const Header: React.FC<Props> = ({ onOpenProfile }) => {
  const { activeTab, setActiveTab, notifications } = useTrip();
  const { profile } = useAccessibility();
  const { user, openAuthModal } = useAuth();

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: 'landing' | 'explorer' | 'assistant' | 'planner' | 'dashboard' | 'reviews' | 'map'; label: string; icon: any; badge?: string }[] = [
    { id: 'landing', label: 'Home', icon: Sparkles },
    { id: 'explorer', label: 'Destinations', icon: Compass },
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles, badge: 'AI' },
    { id: 'map', label: 'Live Map', icon: Map },
    { id: 'planner', label: 'Itinerary Planner', icon: Calendar },
    { id: 'dashboard', label: 'Metrics', icon: LayoutDashboard },
    { id: 'reviews', label: 'Community', icon: MessageSquareQuote },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('landing')}
              className="flex items-center space-x-3 group focus:outline-none focus:ring-4 focus:ring-brand-500 rounded-2xl p-1"
              aria-label="AccessTrip Home"
            >
              <div className="w-11 h-11 bg-gradient-to-tr from-brand-600 to-accessible-teal rounded-2xl flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <span className="text-2xl font-black">♿</span>
              </div>
              <div className="text-left">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 dark:from-brand-400 dark:to-indigo-400 bg-clip-text text-transparent block">
                  AccessTrip
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block -mt-1">
                  AI Accessible Planner
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 shadow-xs border border-brand-200 dark:border-brand-900'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600 dark:text-brand-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[9px] rounded-md uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center space-x-2">
            
            {/* Emergency SOS Button */}
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl flex items-center space-x-1.5 shadow-md shadow-red-600/20 focus:outline-none focus:ring-4 focus:ring-red-400 transition-all hover:scale-105"
              aria-label="Emergency SOS Mode"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">SOS Mode</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
              aria-label={`View ${notifications.length} live accessibility alerts`}
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Keyboard Shortcuts Trigger */}
            <button
              onClick={() => setIsKeyboardOpen(true)}
              className="hidden md:flex p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
              title="Keyboard Shortcuts (Press ?)"
              aria-label="Keyboard Shortcuts"
            >
              <Keyboard className="w-5 h-5" />
            </button>

            {/* Accessibility Profile Trigger */}
            <button
              onClick={onOpenProfile}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              aria-label="Edit Accessibility Profile"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="capitalize max-w-[100px] truncate hidden sm:inline">
                {profile.disabilities[0]?.replace('_', ' ') || 'Profile'}
              </span>
              <span className="text-xs">⚙️</span>
            </button>

            {/* User Auth Avatar / Login */}
            {user ? (
              <img
                src={user.avatarUrl}
                alt={`${user.name} profile`}
                className="w-9 h-9 rounded-xl border-2 border-brand-500 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={openAuthModal}
                title={user.name}
              />
            ) : (
              <button
                onClick={openAuthModal}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-400 shadow-md"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-2 animate-fade-in">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm flex items-center space-x-3 transition-colors ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5 text-brand-500" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Modals */}
      <EmergencyModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <KeyboardShortcutsModal isOpen={isKeyboardOpen} onClose={() => setIsKeyboardOpen(false)} />
    </>
  );
};
