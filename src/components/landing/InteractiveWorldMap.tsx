import React, { useState } from 'react';
import { MapPin, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const InteractiveWorldMap: React.FC = () => {
  const { destinations, setActiveDestination, setActiveTab } = useTrip();
  const [selectedDestId, setSelectedDestId] = useState<string>(destinations[0].id);

  const selected = destinations.find(d => d.id === selectedDestId) || destinations[0];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Global Accessibility Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Interactive World Accessibility Map
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Select any featured global hub to view real-time verified accessibility scores, sidewalk ratings, and emergency preparedness.
          </p>
        </div>

        {/* Map & Card Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Destination Selector Cards */}
          <div className="space-y-3 lg:col-span-1">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Top Audited Accessible Cities
            </h3>
            {destinations.map((dest) => {
              const isSelected = dest.id === selectedDestId;
              return (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDestId(dest.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-brand-400 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-brand-500 shadow-xl ring-2 ring-brand-500/50'
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                        {dest.name}, {dest.country}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {dest.walkingDifficulty}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-xs rounded-lg border border-emerald-300 dark:border-emerald-800">
                      {dest.scores.overall}/100
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Destination Preview Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
              <img
                src={selected.heroImage}
                alt={selected.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div>
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selected.region} • Coordinates {selected.coordinates.lat.toFixed(2)}, {selected.coordinates.lng.toFixed(2)}</span>
                  </div>
                  <h3 className="text-3xl font-black">{selected.name}, {selected.country}</h3>
                  <p className="text-xs text-slate-200 mt-1 max-w-xl font-medium">{selected.tagline}</p>
                </div>

                <button
                  onClick={() => {
                    setActiveDestination(selected);
                    setActiveTab('explorer');
                  }}
                  className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-brand-400 transition-all"
                >
                  <span>Full Accessibility Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Granular Scores Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center space-y-0.5 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Transit Score</span>
                <p className="text-lg font-black text-brand-600 dark:text-brand-400">{selected.scores.transportation}/100</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center space-y-0.5 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Sidewalk Quality</span>
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">{selected.scores.sidewalkQuality}/100</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center space-y-0.5 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Elevator Uptime</span>
                <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{selected.scores.elevatorAvailability}%</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center space-y-0.5 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Medical Support</span>
                <p className="text-lg font-black text-rose-600 dark:text-rose-400">{selected.scores.medicalSupport}/100</p>
              </div>
            </div>

            {/* AI Summary Snippet */}
            <div className="p-4 bg-brand-50/60 dark:bg-brand-950/40 rounded-2xl border border-brand-200 dark:border-brand-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              <strong className="text-brand-700 dark:text-brand-300 block mb-1">AI Mobility Intelligence Briefing:</strong>
              {selected.aiSummary}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
