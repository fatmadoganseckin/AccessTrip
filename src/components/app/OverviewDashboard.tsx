import React from 'react';
import { Users, FolderKanban, Building2, Coins, ArrowUpRight, CheckCircle2, Mail, FileText, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { SEEDED_CASES, SEEDED_TRAVELLERS, SEEDED_FUNDING, SEEDED_ENQUIRIES } from '../../services/mockDataSeeder';
import { SafeImage } from '../common/SafeImage';

export const OverviewDashboard: React.FC = () => {
  const { setActiveView, setActiveCase } = useApp();
  const { activeOrg, activeRole } = useAuth();

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl shadow-xl border border-slate-800">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
            {activeOrg.name} • Operational Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Accessibility Travel & Support Management
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            Active role: <strong className="text-white capitalize">{activeRole}</strong> • Verified Organization ID: {activeOrg.id.slice(0, 8)}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveView('cases')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all"
          >
            + Create Travel Case
          </button>
          <button
            onClick={() => setActiveView('travellers')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl border border-slate-700 transition-all"
          >
            + Add Traveller
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Managed Travellers */}
        <div
          onClick={() => setActiveView('travellers')}
          className="cursor-pointer p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-400">Travellers</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
            {SEEDED_TRAVELLERS.length}
          </div>
          <p className="text-[11px] text-slate-500 font-semibold flex items-center text-emerald-600">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Needs-based profiles complete
          </p>
        </div>

        {/* Active Cases */}
        <div
          onClick={() => setActiveView('cases')}
          className="cursor-pointer p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-400">Active Cases</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
            {SEEDED_CASES.length}
          </div>
          <p className="text-[11px] text-slate-500 font-semibold flex items-center text-amber-500">
            <AlertTriangle className="w-3 h-3 mr-1" /> 1 case contacting properties
          </p>
        </div>

        {/* Grant Funding Balance */}
        <div
          onClick={() => setActiveView('funding')}
          className="cursor-pointer p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-400">Remaining Grant Balance</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
            £{SEEDED_FUNDING[0].remainingAmount.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 font-semibold">
            Out of £{SEEDED_FUNDING[0].approvedAmount.toLocaleString()} approved grant
          </p>
        </div>

        {/* Hotel Questionnaires */}
        <div
          onClick={() => setActiveView('requests')}
          className="cursor-pointer p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-400">Hotel Questionnaires</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
            {SEEDED_ENQUIRIES.length}
          </div>
          <p className="text-[11px] text-slate-500 font-semibold flex items-center text-emerald-600">
            <CheckCircle2 className="w-3 h-3 mr-1" /> 1 hotel reply verified
          </p>
        </div>

      </div>

      {/* Active Cases Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Active Support Cases
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Travel coordination cases assigned to your team
            </p>
          </div>

          <button
            onClick={() => setActiveView('cases')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center"
          >
            <span>View all cases</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider">
                <th className="py-3 px-3">Case Ref</th>
                <th className="py-3 px-3">Traveller</th>
                <th className="py-3 px-3">Destination</th>
                <th className="py-3 px-3">Dates</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Coordinator</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
              {SEEDED_CASES.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                    {c.caseReference}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-2">
                      <SafeImage
                        src={c.travellerAvatar}
                        alt={c.travellerName}
                        category="avatar"
                        className="w-6 h-6 rounded-full object-cover"
                        containerClassName="w-6 h-6 rounded-full flex-shrink-0"
                      />
                      <span className="text-slate-900 dark:text-slate-100 font-bold">{c.travellerName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300">
                    {c.destinationName}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500">
                    {c.proposedStartDate} – {c.proposedEndDate}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-[10px] rounded-full uppercase tracking-wide">
                      {c.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                    {c.assignedCoordinatorName}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => {
                        setActiveCase(c);
                        setActiveView('case_detail');
                      }}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-lg transition-all"
                    >
                      Open Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
