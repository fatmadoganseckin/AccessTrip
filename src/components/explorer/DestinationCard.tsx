import React from 'react';
import { MapPin, ShieldCheck, CheckCircle2, ArrowRight, Heart, Users, Activity } from 'lucide-react';
import { Destination } from '../../types/destination';
import { useTrip } from '../../context/TripContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SafeImage } from '../common/SafeImage';

interface Props {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}

export const DestinationCard: React.FC<Props> = ({ destination, onSelect }) => {
  const { profile } = useAccessibility();

  // Calculate personalized match % based on user profile preferences
  const totalPrefs = profile.preferences.length || 1;
  const matchedCount = profile.preferences.filter(p => destination.matchedPreferences.includes(p)).length;
  const matchPercent = Math.min(100, Math.round((matchedCount / totalPrefs) * 100 + 20));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
      
      {/* Top Image Container */}
      <div className="relative h-60 overflow-hidden">
        <SafeImage
          src={destination.heroImage}
          alt={`Accessible travel guide for ${destination.name}, ${destination.country}`}
          category="destination"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 bg-emerald-500 text-white font-extrabold text-xs rounded-full shadow-md flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{matchPercent}% Profile Match</span>
          </span>

          <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs rounded-full border border-white/20">
            {destination.budget}
          </span>
        </div>

        {/* Bottom Headline info */}
        <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
          <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{destination.region}</span>
          </div>
          <h3 className="text-2xl font-black text-white">{destination.name}, {destination.country}</h3>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
        
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
          {destination.tagline}
        </p>

        {/* Score Grid Chips */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Overall</span>
            <span className="text-sm font-extrabold">{destination.scores.overall}/100</span>
          </div>

          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Transit</span>
            <span className="text-sm font-extrabold">{destination.scores.transportation}/100</span>
          </div>

          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl border border-indigo-200 dark:border-indigo-900 text-indigo-900 dark:text-indigo-200">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Elevator Uptime</span>
            <span className="text-sm font-extrabold">{destination.scores.elevatorAvailability}%</span>
          </div>
        </div>

        {/* Mobility Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg">
            🚶 {destination.walkingDifficulty}
          </span>
          <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg">
            🌤️ {destination.weather.tempC}°C {destination.weather.condition}
          </span>
          <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg">
            🍃 {destination.airQualityIndex.label}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(destination)}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-all hover:scale-102"
        >
          <span>View Granular Specs</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
