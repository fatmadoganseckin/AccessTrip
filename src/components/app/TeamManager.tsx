import React from 'react';
import { UserCheck, UserPlus, ShieldCheck } from 'lucide-react';
import { SEEDED_MEMBERS } from '../../services/mockDataSeeder';
import { useAuth } from '../../context/AuthContext';

export const TeamManager: React.FC = () => {
  const { activeOrg } = useAuth();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Team Members & RBAC Roles ({SEEDED_MEMBERS.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Role-Based Access Control (Owner, Admin, Travel Coordinator, Social Worker, Finance Manager, Auditor).
          </p>
        </div>

        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5">
          <UserPlus className="w-4 h-4" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SEEDED_MEMBERS.map((m) => (
          <div key={m.id} className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <img src={m.avatarUrl} alt={m.fullName} className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500" />
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">{m.fullName}</h3>
                <span className="text-xs text-slate-500 font-semibold block">{m.title}</span>
                <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] rounded uppercase">
                  Role: {m.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
