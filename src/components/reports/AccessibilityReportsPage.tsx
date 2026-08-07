import React from 'react';
import { FileText, Plus, ShieldCheck, ThumbsUp, Camera, AlertTriangle } from 'lucide-react';
import { VerifiedCommunityReports } from '../b2c/VerifiedCommunityReports';

export const AccessibilityReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Contextual Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Accessibility Reports & Field Evidence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Waze-style ground-truth reports with door measurements, elevator status, construction alerts & photos.
          </p>
        </div>

        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition-all">
          <Plus className="w-4 h-4" />
          <span>+ Submit Field Evidence Report</span>
        </button>
      </div>

      {/* Reports Feed */}
      <VerifiedCommunityReports />

    </div>
  );
};
