import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Heart } from 'lucide-react';
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
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
    >
      {/* 1. Image: Fixed 16:9 aspect ratio, edge-to-edge, rounded top corners */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <SafeImage
          src={destination.heroImage}
          alt={`Accessible travel guide for ${destination.name}, ${destination.country}`}
          category="destination"
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />

        {/* Floating Badge: Accessibility Score */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-2.5 py-1 bg-emerald-600/95 backdrop-blur-md text-white font-extrabold text-[11px] rounded-lg shadow-sm flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{destination.scores.overall} Score</span>
          </span>
        </div>

        {/* Floating Heart: Save */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-2.5 left-2.5 z-10 p-1.5 rounded-full backdrop-blur-md transition-all ${
            isFavorite ? 'bg-white text-red-500 shadow' : 'bg-slate-900/40 text-white hover:bg-white hover:text-red-500'
          }`}
          aria-label="Save destination"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-500' : ''}`} />
        </button>
      </div>

      {/* 2. White/Dark-Slate Content Panel (Compact & Scannable) */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        
        {/* City & Country */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {destination.name}
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {destination.country}
          </p>
        </div>

        {/* 3 Concise Scannable Statistics Only */}
        <div className="space-y-1 text-xs font-medium text-slate-600 dark:text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Accessibility Score</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{destination.scores.overall} / 100</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Accessible Transit</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{destination.scores.transportation}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Verified Places</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">246 Places</span>
          </div>
        </div>

        {/* Primary CTA Row */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 flex items-center space-x-1">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

      </div>
    </div>
  );
};
