import React, { useState } from 'react';
import { Search, Plus, Bell, HelpCircle, Sliders, Command, ShieldAlert, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { EmergencyModal } from '../common/EmergencyModal';
import { NotificationCenter } from '../common/NotificationCenter';

export const TopAppBar: React.FC = () => {
  const { globalSearchQuery, setGlobalSearchQuery, setActiveView } = useApp();
  const { activeOrg, activeRole, openAuthModal, user } = useAuth();

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between z-20 transition-colors">
        
        {/* Left: Global Search & Command Menu */}
        <div className="flex items-center space-x-4 flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search travellers, cases, hotels, documents (Ctrl+K)..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <kbd className="hidden sm:flex items-center space-x-0.5 absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-[10px] font-extrabold text-slate-400">
              <Command className="w-3 h-3" />
              <span>K</span>
            </kbd>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Active Org Pill */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 rounded-full text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="truncate max-w-[180px]">{activeOrg.name}</span>
          </div>

          {/* Quick Create Button Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </button>

            {isCreateMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                <button
                  onClick={() => {
                    setActiveView('cases');
                    setIsCreateMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between"
                >
                  <span>New Travel Case</span>
                  <span className="text-[10px] text-emerald-600 font-extrabold">+ Case</span>
                </button>
                <button
                  onClick={() => {
                    setActiveView('travellers');
                    setIsCreateMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between"
                >
                  <span>New Traveller Profile</span>
                  <span className="text-[10px] text-emerald-600 font-extrabold">+ Profile</span>
                </button>
                <button
                  onClick={() => {
                    setActiveView('requests');
                    setIsCreateMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between"
                >
                  <span>Hotel Enquiry</span>
                  <span className="text-[10px] text-emerald-600 font-extrabold">+ Email</span>
                </button>
              </div>
            )}
          </div>

          {/* SOS Emergency Mode */}
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            title="Emergency SOS Mode"
          >
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative focus:outline-none"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>

          {/* User Profile / Auth */}
          {user ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-emerald-500 object-cover cursor-pointer"
              onClick={() => setActiveView('settings')}
            />
          ) : (
            <button
              onClick={openAuthModal}
              className="text-xs font-bold text-emerald-600 hover:underline px-2 py-1"
            >
              Sign in
            </button>
          )}

        </div>
      </header>

      <EmergencyModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
