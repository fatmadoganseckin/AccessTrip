import React, { useState } from 'react';
import { Calendar, MoveUp, MoveDown, Trash2, Plus, Clock, MapPin, ShieldCheck, AlertTriangle, Sparkles, Printer, Download, Share2 } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ItineraryActivity } from '../../types/itinerary';

export const DragDropItineraryPlanner: React.FC = () => {
  const { activeItinerary, reorderItineraryActivities, removeActivityFromItinerary, addActivityToItinerary } = useTrip();
  const { profile, speakText } = useAccessibility();
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  if (!activeItinerary) {
    return (
      <div className="py-20 text-center space-y-4">
        <Calendar className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">No active itinerary loaded</h2>
        <p className="text-xs text-slate-400">Use the AI Travel Assistant or Destination Explorer to generate a trip itinerary.</p>
      </div>
    );
  }

  const currentDay = activeItinerary.days[activeDayIdx] || activeItinerary.days[0];
  const maxWalkingLimit = profile.maxWalkingMeters || 800;
  const isDistanceWarning = currentDay.totalDistanceMeters > maxWalkingLimit;

  const handleMoveUp = (idx: number) => {
    if (idx > 0) {
      reorderItineraryActivities(activeDayIdx, idx, idx - 1);
      speakText('Activity moved up in itinerary.');
    }
  };

  const handleMoveDown = (idx: number) => {
    if (idx < currentDay.activities.length - 1) {
      reorderItineraryActivities(activeDayIdx, idx, idx + 1);
      speakText('Activity moved down in itinerary.');
    }
  };

  const handleAddSampleActivity = () => {
    const newAct: ItineraryActivity = {
      id: `act-add-${Date.now()}`,
      title: 'Rest & Refreshment at Accessible Waterfront Café',
      category: 'rest_stop',
      time: '04:30 PM',
      durationMinutes: 45,
      locationName: 'Accessible Café Hub',
      address: 'Passeig de Colom',
      accessibilityBadges: ['Step-Free Entry', 'Accessible Toilet'],
      stepFreeAccess: true,
      elevatorStatus: 'n/a',
      restroomsAvailable: true,
      walkingDistanceMeters: 150,
      elevationGainMeters: 0,
      energyExpenditure: 'Low',
      notes: 'Shaded seating with zero threshold entry.',
      lat: 41.3790,
      lng: 2.1780
    };
    addActivityToItinerary(activeDayIdx, newAct);
    speakText('Rest stop activity added to itinerary.');
  };

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-8 bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 text-white rounded-3xl shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-amber-300" />
              <h1 className="text-3xl font-black">{activeItinerary.title}</h1>
            </div>
            <p className="text-xs text-brand-100 font-medium">
              Destination: <strong className="text-white">{activeItinerary.destinationName}</strong> • Optimized for: <strong className="text-amber-300">{activeItinerary.mobilityFocus}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl border border-white/30 flex items-center space-x-1.5 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
          {activeItinerary.days.map((day, idx) => {
            const isActive = activeDayIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveDayIdx(idx)}
                className={`px-5 py-3 rounded-2xl font-extrabold text-xs flex-shrink-0 transition-all flex items-center space-x-2 focus:outline-none focus:ring-4 focus:ring-brand-400 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>{day.dateStr}</span>
                <span className="px-2 py-0.5 bg-white/20 text-white rounded font-mono text-[10px]">
                  {day.activities.length} stops
                </span>
              </button>
            );
          })}
        </div>

        {/* Energy & Physical Summary Card for Active Day */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Walking Distance</span>
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-black ${isDistanceWarning ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {currentDay.totalDistanceMeters} m
              </span>
              <span className="text-xs text-slate-400">Limit: {maxWalkingLimit}m</span>
            </div>
            {isDistanceWarning && (
              <p className="text-[11px] font-bold text-amber-600 flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Exceeds max preferred walking distance! Add rest stop.</span>
              </p>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Elevation Gain</span>
            <p className="text-2xl font-black text-brand-600 dark:text-brand-400">
              +{currentDay.totalElevationGain} m (Gentle Slope)
            </p>
            <p className="text-[11px] text-slate-400 font-medium">All paths step-free sloped</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Daily Energy Expenditure</span>
            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs rounded-xl border border-emerald-300 dark:border-emerald-800">
              Low-Energy Budget Matched
            </span>
          </div>
        </div>

        {/* Activities List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Activities Timeline for {currentDay.dateStr}
            </h3>

            <button
              onClick={handleAddSampleActivity}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 focus:outline-none focus:ring-4 focus:ring-emerald-400 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Rest Stop / Venue</span>
            </button>
          </div>

          <div className="space-y-3">
            {currentDay.activities.map((act, idx) => (
              <div
                key={act.id}
                className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                
                {/* Time & Drag Reorder Handle */}
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => handleMoveUp(idx)}
                      disabled={idx === 0}
                      className="p-1 text-slate-400 hover:text-brand-600 disabled:opacity-30 rounded"
                      title="Move activity up"
                      aria-label="Move activity up"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(idx)}
                      disabled={idx === currentDay.activities.length - 1}
                      className="p-1 text-slate-400 hover:text-brand-600 disabled:opacity-30 rounded"
                      title="Move activity down"
                      aria-label="Move activity down"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-black text-xs flex flex-col items-center justify-center border border-brand-200 dark:border-brand-900">
                    <span>Stop</span>
                    <span className="text-sm">#{idx + 1}</span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{act.time} ({act.durationMinutes} min)</span>
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] rounded uppercase">
                        {act.category.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                      {act.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>{act.address} • <strong>{act.walkingDistanceMeters}m walk</strong></span>
                    </p>
                  </div>
                </div>

                {/* Badges & Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {act.accessibilityBadges.map((badge, bidx) => (
                    <span
                      key={bidx}
                      className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold text-[10px] rounded-lg border border-emerald-200 dark:border-emerald-900"
                    >
                      ✓ {badge}
                    </span>
                  ))}

                  <button
                    onClick={() => removeActivityFromItinerary(activeDayIdx, act.id)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Remove from itinerary"
                    aria-label="Remove activity"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
