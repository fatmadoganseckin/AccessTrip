import React, { useState } from 'react';
import { Search, Plus, Bell, Command, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { EmergencyModal } from '../common/EmergencyModal';
import { NotificationCenter } from '../common/NotificationCenter';
import { SafeImage } from '../common/SafeImage';

export const TopAppBar: React.FC = () => {
  const { globalSearchQuery, setGlobalSearchQuery, setActiveView } = useApp();
  const { activeOrg, user } = useAuth();

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <>
      <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between z-20 transition-colors">
        
        {/* Left: Global Search */}
        <div className="flex items-center space-x-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search (Ctrl+K)..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="w-full pl-9 pr-10 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <kbd className="hidden sm:flex items-center absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-[10px] font-bold text-slate-400">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Active Org Pill */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="truncate max-w-[160px]">{activeOrg.name}</span>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => setActiveView('cases')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Case</span>
          </button>

          {/* SOS Emergency Mode */}
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            title="Emergency SOS Mode"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative focus:outline-none"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>

          {/* User Profile / Avatar */}
          {user && (
            <div onClick={() => setActiveView('settings')} className="cursor-pointer">
              <SafeImage
                src={user.avatarUrl}
                alt={user.name}
                category="avatar"
                className="w-7 h-7 rounded-full border border-emerald-500 object-cover"
                containerClassName="w-7 h-7 rounded-full"
              />
            </div>
          )}

        </div>
      </header>

      <EmergencyModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
