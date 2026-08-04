import React from 'react';
import { SlidersHorizontal, Search, RotateCcw, Filter } from 'lucide-react';

export interface FilterState {
  search: string;
  minScore: number;
  walkingDifficulty: string;
  budget: string;
  climate: string;
  minTransitScore: number;
  serviceAnimalOnly: boolean;
  quietAreasOnly: boolean;
}

interface Props {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
}

export const DestinationFilters: React.FC<Props> = ({ filters, onChange, onReset }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 font-bold">
          <SlidersHorizontal className="w-5 h-5" />
          <h3 className="text-base text-slate-900 dark:text-slate-100">Advanced Accessibility Filters</h3>
        </div>

        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center space-x-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Filter Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Search */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Destination / Country
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Min Accessibility Score Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Min Accessibility Score</span>
            <span className="text-brand-600 dark:text-brand-400">{filters.minScore}/100</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            step="5"
            value={filters.minScore}
            onChange={(e) => onChange({ ...filters, minScore: Number(e.target.value) })}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />
        </div>

        {/* Walking Difficulty */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Walking / Slope Difficulty
          </label>
          <select
            value={filters.walkingDifficulty}
            onChange={(e) => onChange({ ...filters, walkingDifficulty: e.target.value })}
            className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="All">All Incline Types</option>
            <option value="Easy (Flat)">Easy (Flat / 0° Slope)</option>
            <option value="Moderate (Mild Slopes)">Moderate Slopes</option>
            <option value="Challenging (Steep)">Steep Hills</option>
          </select>
        </div>

        {/* Climate */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Preferred Climate
          </label>
          <select
            value={filters.climate}
            onChange={(e) => onChange({ ...filters, climate: e.target.value })}
            className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="All">All Climates</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Temperate">Temperate</option>
            <option value="Subtropical">Subtropical</option>
            <option value="Oceanic">Oceanic</option>
          </select>
        </div>

      </div>

      {/* Checkboxes Row */}
      <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.serviceAnimalOnly}
            onChange={(e) => onChange({ ...filters, serviceAnimalOnly: e.target.checked })}
            className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 accent-brand-600"
          />
          <span className="font-bold text-slate-700 dark:text-slate-300">🐕‍🦺 Service Animal Friendly Only</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.quietAreasOnly}
            onChange={(e) => onChange({ ...filters, quietAreasOnly: e.target.checked })}
            className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 accent-brand-600"
          />
          <span className="font-bold text-slate-700 dark:text-slate-300">🎧 Quiet Sensory Zones Available</span>
        </label>
      </div>

    </div>
  );
};
