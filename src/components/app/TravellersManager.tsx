import React, { useState } from 'react';
import { Users, Plus, ShieldCheck, CheckCircle2, AlertCircle, Heart, Phone, Mail, FileText } from 'lucide-react';
import { SEEDED_TRAVELLERS } from '../../services/mockDataSeeder';
import { Traveller } from '../../types/traveller';

export const TravellersManager: React.FC = () => {
  const [selectedTraveller, setSelectedTraveller] = useState<Traveller>(SEEDED_TRAVELLERS[0]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Traveller Database & Needs Profiles
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Needs-based accessibility profiles avoiding unnecessary medical labels.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Traveller Profile</span>
        </button>
      </div>

      {/* Grid: Left List + Right Needs Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {SEEDED_TRAVELLERS.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedTraveller(t)}
              className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                selectedTraveller.id === t.id
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <img src={t.avatarUrl} alt={t.fullName} className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500" />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                      {t.fullName}
                    </h3>
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold rounded-md">
                      Consent Verified ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">
                    Assigned: {t.assignedCaseManagerName} • {t.activeCasesCount} Active Case
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Needs Profile Detail */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          
          <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-4">
              <img src={selectedTraveller.avatarUrl} alt={selectedTraveller.fullName} className="w-16 h-16 rounded-3xl object-cover border-2 border-emerald-500" />
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                  {selectedTraveller.fullName} ({selectedTraveller.preferredName})
                </h2>
                <div className="flex items-center space-x-3 text-xs text-slate-500 font-semibold mt-1">
                  <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1" /> {selectedTraveller.contactEmail}</span>
                  <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1" /> {selectedTraveller.contactPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Emergency Contact</span>
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {selectedTraveller.emergencyContact.name} ({selectedTraveller.emergencyContact.relationship}) — {selectedTraveller.emergencyContact.phone}
            </div>
          </div>

          {/* Needs-Based Requirements Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Needs-Based Accessibility Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-800">
                <span>Step-free routes required</span>
                <span className="text-emerald-600 font-extrabold">YES ✓</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-800">
                <span>Needs Roll-in wet room shower</span>
                <span className="text-emerald-600 font-extrabold">YES ✓</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-800">
                <span>Uses Power Wheelchair</span>
                <span className="text-emerald-600 font-extrabold">YES ✓</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-800">
                <span>Overnight Wheelchair Charging</span>
                <span className="text-emerald-600 font-extrabold">YES ✓</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-800">
                <span>Travels with Service Animal</span>
                <span className="text-emerald-600 font-extrabold">YES ✓</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-800">
                <span>Max Continuous Walking Limit</span>
                <span className="text-emerald-600 font-extrabold">{selectedTraveller.accessibilityProfile.maxContinuousWalkingMeters} meters</span>
              </div>
            </div>

            {/* Assistance Notes */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-emerald-800 dark:text-emerald-300">Coordinating Assistance Notes</span>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                {selectedTraveller.accessibilityProfile.assistanceNotes}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
