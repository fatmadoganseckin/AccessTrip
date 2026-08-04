import React, { useState } from 'react';
import { FolderKanban, Table, LayoutGrid, Calendar, Plus, Search, Filter } from 'lucide-react';
import { SEEDED_CASES } from '../../services/mockDataSeeder';
import { SupportCase, CaseStatus } from '../../types/case';
import { useApp } from '../../context/AppContext';

export const CaseManager: React.FC = () => {
  const { setActiveView, setActiveCase } = useApp();
  const [viewMode, setViewMode] = useState<'table' | 'board'>('board');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCases = SEEDED_CASES.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  const columns: { status: CaseStatus; label: string }[] = [
    { status: 'researching', label: 'Researching' },
    { status: 'contacting_properties', label: 'Contacting Properties' },
    { status: 'awaiting_funding', label: 'Awaiting Funding' },
    { status: 'ready_to_book', label: 'Ready to Book' },
    { status: 'booked', label: 'Booked' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Travel Cases & Support Requests
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Coordinate accessible trips, track property enquiries, and manage grant approvals.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Toggles */}
          <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('board')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
                viewMode === 'board' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => setActiveView('cases')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Case</span>
          </button>
        </div>
      </div>

      {/* Board View (Kanban) */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colCases = filteredCases.filter(c => c.status === col.status);
            return (
              <div key={col.status} className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 space-y-3 min-w-[240px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                    {col.label}
                  </h3>
                  <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] rounded-full">
                    {colCases.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colCases.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setActiveCase(c);
                        setActiveView('case_detail');
                      }}
                      className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg cursor-pointer transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-extrabold text-slate-500">
                          {c.caseReference}
                        </span>
                        <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                          £{c.estimatedBudget}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm leading-tight">
                        {c.destinationName}
                      </h4>

                      <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <img src={c.travellerAvatar} alt={c.travellerName} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-bold truncate">{c.travellerName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-extrabold">
                <th className="py-3">Case Ref</th>
                <th className="py-3">Traveller</th>
                <th className="py-3">Destination</th>
                <th className="py-3">Proposed Dates</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
              {filteredCases.map((c) => (
                <tr key={c.id}>
                  <td className="py-3.5 font-mono font-bold">{c.caseReference}</td>
                  <td className="py-3.5 font-bold">{c.travellerName}</td>
                  <td className="py-3.5">{c.destinationName}</td>
                  <td className="py-3.5 text-slate-500">{c.proposedStartDate} – {c.proposedEndDate}</td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full">
                      {c.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => {
                        setActiveCase(c);
                        setActiveView('case_detail');
                      }}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 font-bold rounded-lg text-xs"
                    >
                      Open Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
