import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock, Mail, Calendar, Coins, Plus, FileText, Send, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEEDED_ENQUIRIES, SEEDED_DOCUMENTS } from '../../services/mockDataSeeder';
import { HotelEnquiryModal } from './HotelEnquiryModal';
import { SafeImage } from '../common/SafeImage';

export const CaseDetailView: React.FC = () => {
  const { activeCase, setActiveView } = useApp();
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  if (!activeCase) return <div>No case selected</div>;

  return (
    <>
      <div className="space-y-6">
        
        {/* Top Back Navigation & Case Reference Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={() => setActiveView('cases')}
            className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Support Cases</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>+ Send Hotel Enquiry Email</span>
            </button>
          </div>
        </div>

        {/* Case Main Header Card */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-black text-xs rounded-lg uppercase tracking-wider">
                  {activeCase.caseReference}
                </span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-xs rounded-full uppercase tracking-wider">
                  Status: {activeCase.status.replace('_', ' ')}
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
                {activeCase.destinationName} Travel Support Case
              </h1>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Purpose: {activeCase.purposeOfTravel}
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-right space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Estimated Budget</span>
              <div className="text-2xl font-black text-emerald-600">£{activeCase.estimatedBudget.toLocaleString()}</div>
              <div className="text-[11px] text-slate-500 font-bold">Funding: {activeCase.fundingSource}</div>
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">Traveller</span>
              <div className="flex items-center space-x-2">
                <SafeImage
                  src={activeCase.travellerAvatar}
                  alt={activeCase.travellerName}
                  category="avatar"
                  className="w-5 h-5 rounded-full object-cover"
                  containerClassName="w-5 h-5 rounded-full flex-shrink-0"
                />
                <span className="font-bold text-slate-900 dark:text-slate-100">{activeCase.travellerName}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">Proposed Travel Dates</span>
              <div className="font-bold text-slate-900 dark:text-slate-100">{activeCase.proposedStartDate} – {activeCase.proposedEndDate}</div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">Assigned Coordinator</span>
              <div className="font-bold text-slate-900 dark:text-slate-100">{activeCase.assignedCoordinatorName}</div>
            </div>
          </div>
        </div>

        {/* Tasks & Hotel Enquiries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Internal Tasks */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h2 className="text-base font-black text-slate-900 dark:text-slate-100">
              Internal Case Tasks ({activeCase.tasks.length})
            </h2>

            <div className="space-y-2">
              {activeCase.tasks.map((t) => (
                <div key={t.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked={t.isCompleted} className="w-4 h-4 rounded text-emerald-600" />
                    <span className={`text-xs font-bold ${t.isCompleted ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {t.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Due {t.dueDate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Enquiries Sent */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900 dark:text-slate-100">
                Hotel Questionnaires Sent ({SEEDED_ENQUIRIES.length})
              </h2>
              <button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                + Send New
              </button>
            </div>

            <div className="space-y-3">
              {SEEDED_ENQUIRIES.map((e) => (
                <div key={e.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-900 dark:text-slate-100">{e.propertyName}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md uppercase">
                      {e.status} ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium italic">
                    "{e.replyContent}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <HotelEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        caseReference={activeCase.caseReference}
      />
    </>
  );
};
