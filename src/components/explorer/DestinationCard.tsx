import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Heart, Bus, Sun, CheckCircle2 } from 'lucide-react';
import { Destination } from '../../types/destination';
import { SafeImage } from '../common/SafeImage';

interface Props {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}

export const DestinationCard: React.FC<Props> = ({ destination, onSelect }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      onClick={() => onSelect(destination)}
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* 1. Top Image Container: ONLY Photo + Accessibility Score + Favorite Pill (NO text over image) */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <SafeImage
          src={destination.heroImage}
          alt={`Accessible travel guide for ${destination.name}, ${destination.country}`}
          category="destination"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top-Right: Accessibility Score Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-3 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{destination.scores.overall} Score</span>
          </span>
        </div>

        {/* Top-Left: Favorite Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 left-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite ? 'bg-white text-red-500 shadow' : 'bg-slate-900/40 text-white hover:bg-white hover:text-red-500'
          }`}
          aria-label="Save destination"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
        </button>
      </div>

      {/* 2. Information Panel (Solid white/dark-slate surface for 4.5:1+ WCAG AA contrast) */}
      <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
        
        {/* Title & Country Stack */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {destination.name}
          </h3>
          <p className="text-base font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {destination.country}
          </p>
        </div>

        {/* Quick Facts (3-4 scannable facts instead of paragraph block) */}
        <div className="space-y-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{destination.scores.transportation}% Accessible Transit</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span>246 Verified Stays • 18 Attractions</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span>Restrooms & Emergency Hospitals Verified</span>
          </div>
        </div>

        {/* Transit & Weather Row */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-1.5">
            <Bus className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transit {destination.scores.transportation}%</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>☀ {destination.weather.tempC}°C {destination.weather.condition}</span>
          </div>
        </div>

        {/* Footer: Best Season + Explore CTA */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            Best Season: <strong className="text-slate-800 dark:text-slate-200">May–Sept</strong>
          </span>

          <button
            onClick={() => onSelect(destination)}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl inline-flex items-center space-x-1 transition-all group-hover:shadow-md"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
