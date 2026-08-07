import React, { useState } from 'react';
import { Sparkles, Send, Calendar, MapPin, CheckCircle2, AlertTriangle, Download, Printer, Share2, Compass, Sun, Bus } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const AIPlannerWorkspace: React.FC = () => {
  const { setActiveTab } = useTrip();

  const [destinationInput, setDestinationInput] = useState('Barcelona, Spain');
  const [daysCount, setDaysCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(true);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Contextual Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              AI Travel Planning Workspace
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Structured itineraries matching walking limits, elevator reliability, weather, and rest stops.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs rounded-xl shadow-sm flex items-center space-x-1.5">
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export PDF / Offline Guide</span>
          </button>
        </div>
      </div>

      {/* Inputs Form Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
          <label className="block text-[10px] font-extrabold uppercase text-slate-400">Target Destination</label>
          <input
            type="text"
            value={destinationInput}
            onChange={(e) => setDestinationInput(e.target.value)}
            className="w-full bg-transparent text-xs font-extrabold text-slate-900 dark:text-slate-100 focus:outline-none"
          />
        </div>

        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
          <label className="block text-[10px] font-extrabold uppercase text-slate-400">Trip Duration</label>
          <select
            value={daysCount}
            onChange={(e) => setDaysCount(Number(e.target.value))}
            className="w-full bg-transparent text-xs font-extrabold text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
          >
            <option value={3}>3 Days Accessible Plan</option>
            <option value={5}>5 Days Accessible Plan</option>
            <option value={7}>7 Days Accessible Plan</option>
          </select>
        </div>

        <div className="lg:col-span-3 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center space-x-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Analyzing...' : 'Generate Workspace'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Canvas */}
      {isGenerated && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Itinerary Timeline */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Day 1 */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs rounded-xl">
                  Day 1: Arrival & Accessible Hotel Check-In
                </span>
                <span className="text-xs text-slate-500 font-bold">Max Walking: 50m</span>
              </div>

              <div className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex items-start space-x-3">
                  <Bus className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">Barcelona El Prat Airport ➔ Aerobús A1 (Step-free)</strong>
                    <span>100% low-floor bus with automated ramp deployment. 35-min trip to Plaça de Catalunya.</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">Gran Vía Accessible Luxury Loft</strong>
                    <span>Step-free level entrance, automated glass doors, 98cm door clearance, and private roll-in shower.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs rounded-xl">
                  Day 2: Step-Free Gothic Quarter & Picasso Museum
                </span>
                <span className="text-xs text-slate-500 font-bold">Max Walking: 150m</span>
              </div>

              <div className="space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex items-start space-x-3">
                  <Compass className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">Gothic Quarter Flat Trail & Picasso Elevator Access</strong>
                    <span>Smooth stone paving (Max 3% slope gradient). Picasso Museum includes priority elevator access & accessible restroom on 1st floor.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Granular Accessibility Match Explanation */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                  Accessibility Match Explanation
                </h3>
                <span className="px-3 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-xl">
                  94% Match
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                Detailed breakdown of why this itinerary scores 94% based on your active needs profile:
              </p>

              <div className="space-y-2 text-xs font-bold">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-800 dark:text-emerald-300 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
                  <span>✓ Dual elevator redundancy at hotel</span>
                </div>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-800 dark:text-emerald-300 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
                  <span>✓ Step-free low-floor transit routes</span>
                </div>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-800 dark:text-emerald-300 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
                  <span>✓ Roll-in shower with grab rails</span>
                </div>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-800 dark:text-emerald-300 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
                  <span>✓ Service animals accepted without fees</span>
                </div>

                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-800 dark:text-amber-300 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0" />
                  <span>⚠ Bathroom door clearance is 82cm</span>
                </div>
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-800 dark:text-amber-300 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0" />
                  <span>⚠ Bed height not physically verified</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
