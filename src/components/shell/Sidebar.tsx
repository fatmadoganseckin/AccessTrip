import React, { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  Compass,
  Sparkles,
  CalendarRange,
  Heart,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  Hotel,
  LogOut,
  ExternalLink,
  Users,
  FolderKanban
} from 'lucide-react';
import { useApp, SaaSView } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { SafeImage } from '../common/SafeImage';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, isSidebarCollapsed, setIsSidebarCollapsed } = useApp();
  const { activeOrg, userOrgs, setActiveOrg, activeRole, user, logout } = useAuth();
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);

  // Primary Consumer Travel Navigation
  const primaryNavs: { id: SaaSView; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'stays', label: 'Stays', icon: Home, badge: 'Marketplace' },
    { id: 'destinations', label: 'Destinations', icon: Compass },
    { id: 'ai_planner', label: 'AI Planner', icon: Sparkles },
    { id: 'trips', label: 'Trips', icon: CalendarRange },
    { id: 'saved', label: 'Saved', icon: Heart },
    { id: 'reports', label: 'Accessibility Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Secondary Workspace Portals
  const secondaryNavs: { id: SaaSView; label: string; icon: React.ElementType }[] = [
    { id: 'cases', label: 'Cases & Beneficiaries', icon: FolderKanban },
    { id: 'travellers', label: 'Traveller Database', icon: Users },
  ];

  return (
    <aside
      className={`bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-all duration-300 z-30 ${
        isSidebarCollapsed ? 'w-18' : 'w-64'
      }`}
      aria-label="Primary Navigation Sidebar"
    >
      {/* Top Header & Logo */}
      <div className="p-3 space-y-4">
        
        {/* Logo & Collapse Toggle */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-md">
              AT
            </div>
            {!isSidebarCollapsed && (
              <div>
                <span className="text-sm font-black text-white tracking-tight block">AccessTrip</span>
                <span className="text-[10px] text-emerald-400 font-bold block -mt-1">Accessible Travel Platform</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors focus:outline-none"
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Primary Product Navigation */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-2.5 py-1">
              Travel Workspaces
            </div>
          )}

          {primaryNavs.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
                } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                title={item.label}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </div>

                {!isSidebarCollapsed && item.badge && (
                  <span className="px-2 py-0.5 bg-slate-800 text-emerald-400 font-extrabold text-[9px] rounded-full border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Organization Workspaces */}
        <div className="pt-3 border-t border-slate-800/80 space-y-1">
          {!isSidebarCollapsed && (
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-2.5 py-1">
              Enterprise Workspaces
            </div>
          )}

          {secondaryNavs.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full p-2 rounded-xl font-bold text-xs flex items-center space-x-3 transition-all ${
                  isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'
                } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                title={item.label}
              >
                <Icon className="w-4 h-4 flex-shrink-0 text-slate-400" />
                {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom Profile & Public Site Switcher */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <button
          onClick={() => setActiveView('public_landing')}
          className={`w-full p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center space-x-2 ${
            isSidebarCollapsed ? 'justify-center' : ''
          }`}
          title="Return to Public Website"
        >
          <ExternalLink className="w-4 h-4 text-slate-400" />
          {!isSidebarCollapsed && <span>Public Portal</span>}
        </button>

        {user && (
          <div className={`flex items-center justify-between p-2 rounded-xl bg-slate-800/40 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="flex items-center space-x-2 min-w-0">
              <SafeImage
                src={user.avatarUrl}
                alt={user.name}
                category="avatar"
                className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                containerClassName="w-7 h-7 rounded-full flex-shrink-0"
              />
              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white truncate block">{user.name}</span>
                  <span className="text-[10px] text-slate-400 truncate block">{user.email}</span>
                </div>
              )}
            </div>

            {!isSidebarCollapsed && (
              <button onClick={logout} className="p-1 text-slate-400 hover:text-red-400 transition-colors" title="Log out">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
