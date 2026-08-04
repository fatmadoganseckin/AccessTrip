import React, { useState } from 'react';
import { Heart, Star, ShieldCheck, Check } from 'lucide-react';
import { AccessibleStay } from '../../types/stay';

interface Props {
  stay: AccessibleStay;
  onSelect: (stay: AccessibleStay) => void;
}

export const StayCard: React.FC<Props> = ({ stay, onSelect }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      onClick={() => onSelect(stay)}
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative h-64 overflow-hidden rounded-t-3xl">
        <img
          src={stay.images[0]}
          alt={stay.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-Left Verified Badge Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3.5 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-slate-100 font-extrabold text-xs rounded-full shadow-md border border-white/40 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{stay.verifiedBadge}</span>
          </span>
        </div>

        {/* Top-Right Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 dark:bg-slate-900/80 hover:bg-white backdrop-blur-md rounded-full text-slate-700 dark:text-slate-200 transition-transform hover:scale-110 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600 dark:text-slate-300'
            }`}
          />
        </button>

        {/* Gradient Overlay for bottom text read */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Card Content Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        
        {/* Title & Rating Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {stay.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
              {stay.location}
            </p>
          </div>

          <div className="flex items-center space-x-1 font-extrabold text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{stay.rating}</span>
            <span className="text-slate-400 font-normal">({stay.reviewCount})</span>
          </div>
        </div>

        {/* Feature Icons Row */}
        <div className="flex flex-wrap items-center gap-3 py-1 border-y border-slate-100 dark:border-slate-800/80 text-xs">
          {stay.featureIcons.map((feat, idx) => (
            <div key={idx} className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 font-semibold">
              <span className="text-sm">{feat.icon}</span>
              <span className="text-[11px]">{feat.label}</span>
            </div>
          ))}
        </div>

        {/* Footer: Price & Match Badge */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-lg font-black text-slate-900 dark:text-slate-100">
              ${stay.pricePerNight}
            </span>
            <span className="text-xs font-bold text-slate-500"> / night</span>
            <span className="text-[10px] text-slate-400 block font-semibold">
              Total ${stay.totalPriceForStay}
            </span>
          </div>

          <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-xs rounded-xl border border-emerald-300 dark:border-emerald-800 flex items-center space-x-1 shadow-xs">
            <span>{stay.matchPercentage}% match</span>
          </span>
        </div>

      </div>
    </div>
  );
};
