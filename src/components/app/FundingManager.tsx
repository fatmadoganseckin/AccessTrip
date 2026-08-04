import React from 'react';
import { Coins, Plus, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react';
import { SEEDED_FUNDING } from '../../services/mockDataSeeder';

export const FundingManager: React.FC = () => {
  const fund = SEEDED_FUNDING[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Funding & Grant Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Track approved mobility grants, budget category allocations, and reimbursements.
          </p>
        </div>

        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5">
          <Plus className="w-4 h-4" />
          <span>+ Add Grant Source</span>
        </button>
      </div>

      {/* Main Grant Summary Banner */}
      <div className="p-6 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/40 pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200 block mb-1">
              Active Grant • {fund.funderName}
            </span>
            <h2 className="text-2xl font-black">{fund.grantName}</h2>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase text-amber-200 block">Remaining Balance</span>
            <div className="text-3xl font-black">£{fund.remainingAmount.toLocaleString()}</div>
          </div>
        </div>

        {/* Category Spending Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {fund.spendingCategories.map((c, idx) => (
            <div key={idx} className="p-3 bg-amber-950/40 rounded-2xl border border-amber-500/30 space-y-1">
              <span className="text-[11px] font-bold text-amber-200 block truncate">{c.category}</span>
              <div className="text-lg font-black">£{c.spent.toLocaleString()} / £{c.allocated.toLocaleString()}</div>
              <div className="w-full bg-amber-950 rounded-full h-1.5">
                <div className="bg-amber-300 h-1.5 rounded-full" style={{ width: `${(c.spent / c.allocated) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
