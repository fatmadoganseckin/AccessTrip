import React from 'react';
import { Settings, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const OrgSettingsView: React.FC = () => {
  const { activeOrg } = useAuth();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Organization Profile & Settings
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Manage charity registration, data retention settings, and platform plan.
        </p>
      </div>

      {/* Main Settings Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <div className="flex items-center space-x-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <img src={activeOrg.logoUrl} alt={activeOrg.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500" />
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">{activeOrg.name}</h2>
            <p className="text-xs text-slate-500 font-semibold">
              Org Type: <span className="capitalize">{activeOrg.orgType.replace('_', ' ')}</span> • Plan: <strong className="text-emerald-600">{activeOrg.accountPlan}</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Organization Name</label>
            <input type="text" readOnly value={activeOrg.name} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Charity Registration Number</label>
            <input type="text" readOnly value={activeOrg.charityRegistrationNumber || 'N/A'} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Country</label>
            <input type="text" readOnly value={activeOrg.country} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Contact Email</label>
            <input type="text" readOnly value={activeOrg.contactEmail} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Mission Statement</span>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            {activeOrg.mission}
          </p>
        </div>
      </div>

    </div>
  );
};
