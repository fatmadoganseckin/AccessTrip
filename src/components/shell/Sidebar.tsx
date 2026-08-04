import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CalendarRange,
  Home,
  Compass,
  Map,
  Mail,
  CheckSquare,
  Coins,
  FileText,
  BarChart3,
  UserCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { useApp, SaaSView } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, isSidebarCollapsed, setIsSidebarCollapsed } = useApp();
  const { activeOrg, userOrgs, setActiveOrg, activeRole, user, logout } = useAuth();
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);

  const menuNavs: { id: SaaSView; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'travellers', label: 'Travellers', icon: Users },
    { id: 'cases', label: 'Cases', icon: FolderKanban, badge: '3' },
    { id: 'stays', label: 'Stays', icon: Home },
    { id: 'destinations', label: 'Destinations', icon: Compass },
    { id: 'map', label: 'Map Workspace', icon: Map },
    { id: 'requests', label: 'Hotel Requests', icon: Mail },
    { id: 'funding', label: 'Funding & Grants', icon: Coins },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'reports', label: 'Audit Reports', icon: BarChart3 },
    { id: 'team', label: 'Team & Roles', icon: UserCheck },
    { id: 'settings', label: 'Org Settings', icon: Settings },
  ];

  return (
    <aside
      className={`bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-all duration-300 z-30 ${
        isSidebarCollapsed ? 'w-18' : 'w-64'
      }`}
      aria-label="Desktop Navigation Sidebar"
    >
      {/* Top Header & Organization Switcher */}
      <div className="p-3 space-y-4">
        
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
              AT
            </div>
            {!isSidebarCollapsed && (
              <div>
                <span className="text-sm font-black text-white tracking-tight block">AccessTrip</span>
                <span className="text-[10px] text-emerald-400 font-bold block -mt-1">SaaS Operational Platform</span>
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

        {/* Organization Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
            className={`w-full p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between transition-all text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              isSidebarCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <div className="flex items-center space-x-2 min-w-0">
              <Building2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white truncate block">{activeOrg.name}</span>
                  <span className="text-[10px] text-slate-400 font-semibold block capitalize truncate">
                    {activeOrg.orgType.replace('_', ' ')} • <strong className="text-emerald-400">{activeRole}</strong>
                  </span>
                </div>
              )}
            </div>
          </button>

          {/* Org Selector Popup */}
          {isOrgDropdownOpen && !isSidebarCollapsed && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-50 p-2 space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 py-1">
                Switch Organization
              </div>
              {userOrgs.map((org) => (
                <button
                  key={org.id}
                  onClick={() => {
                    setActiveOrg(org);
                    setIsOrgDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl text-xs font-bold flex items-center justify-between ${
                    org.id === activeOrg.id ? 'bg-emerald-600 text-white' : 'hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <span className="truncate">{org.name}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-900/40 text-slate-300">
                    {org.accountPlan}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Items List */}
        <nav className="space-y-1 pt-2">
          {menuNavs.map((item) => {
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
                  <span className="px-2 py-0.5 bg-slate-800 text-emerald-400 font-extrabold text-[10px] rounded-full border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
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
          {!isSidebarCollapsed && <span>Public Marketing Site</span>}
        </button>

        {user && (
          <div className={`flex items-center justify-between p-2 rounded-xl bg-slate-800/40 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="flex items-center space-x-2 min-w-0">
              <img src={user.avatarUrl} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-emerald-500" />
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
