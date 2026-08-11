import React from 'react';
import { X, ShieldCheck, MapPin, PhoneCall, Hospital, Wind, CloudSun, Users, CheckCircle, Calendar, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';
import { Destination } from '../../types/destination';
import { useTrip } from '../../context/TripContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SafeImage } from '../common/SafeImage';

interface Props {
  destination: Destination | null;
  onClose: () => void;
}

export const DestinationDetailModal: React.FC<Props> = ({ destination, onClose }) => {
  const { setActiveTab, setActiveDestination } = useTrip();
  const { speakText } = useAccessibility();

  if (!destination) return null;

  const handlePlanTrip = () => {
    setActiveDestination(destination);
    setActiveTab('planner');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="destination-detail-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-8">
        
        {/* Header Hero Image */}
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
          <SafeImage
            src={destination.heroImage}
            alt={`Detailed view of ${destination.name}`}
            category="destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full focus:outline-none focus:ring-4 focus:ring-brand-400 border border-white/20 transition-transform hover:scale-110"
            aria-label="Close destination details"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 z-10">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-emerald-500 text-white font-extrabold text-xs rounded-full shadow flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Inspection</span>
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white font-bold text-xs rounded-full">
                {destination.walkingDifficulty}
              </span>
            </div>

            <h2 id="destination-detail-title" className="text-3xl sm:text-5xl font-black">
              {destination.name}, {destination.country}
            </h2>
            <p className="text-sm text-slate-200 max-w-2xl font-medium">{destination.tagline}</p>
          </div>
        </div>

        {/* AI Intelligence Briefing */}
        <div className="p-5 bg-brand-50/80 dark:bg-brand-950/60 rounded-2xl border border-brand-200 dark:border-brand-900 space-y-2">
          <div className="flex items-center space-x-2 text-brand-700 dark:text-brand-300 font-extrabold text-sm">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>AI Granular Accessibility Summary</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {destination.aiSummary}
          </p>
          <span className="text-[10px] text-slate-400 font-semibold block pt-1">
            Last Updated: {destination.lastUpdated}
          </span>
        </div>

        {/* Granular Scores Dashboard Grid */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Verified Granular Accessibility Scores
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Overall Index</span>
              <span className="text-2xl font-black text-brand-600 dark:text-brand-400">{destination.scores.overall}/100</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Public Transit</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{destination.scores.transportation}/100</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Sidewalk Smoothness</span>
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{destination.scores.sidewalkQuality}/100</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Elevator Uptime</span>
              <span className="text-2xl font-black text-teal-600 dark:text-teal-400">{destination.scores.elevatorAvailability}%</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Accessible Restrooms</span>
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{destination.scores.restroomAvailability}/100</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Dining & Restaurants</span>
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400">{destination.scores.restaurant}/100</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Attraction Access</span>
              <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{destination.scores.attraction}/100</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Medical ER Proximity</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{destination.scores.medicalSupport}/100</span>
            </div>
          </div>
        </div>

        {/* Environmental & Crowd Prediction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Weather & Air Quality */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span>Real-Time Environmental Conditions</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block font-semibold">Temperature & Weather</span>
                <span className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  {destination.weather.tempC}°C • {destination.weather.condition}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block font-semibold">Air Quality Index (AQI)</span>
                <span className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                  {destination.airQualityIndex.label}
                </span>
              </div>
            </div>
          </div>

          {/* Crowd Hourly Prediction */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
              <Users className="w-4 h-4 text-indigo-500" />
              <span>Today's Crowd Density Forecast</span>
            </h4>

            <div className="flex items-end justify-between h-20 pt-2 px-2">
              {destination.crowdPredictionToday.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-1 flex-1">
                  <div
                    style={{ height: `${item.level}%` }}
                    className="w-4 bg-indigo-500 rounded-t-sm transition-all"
                  />
                  <span className="text-[9px] font-bold text-slate-500">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nearby Emergency ER Hospitals */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center space-x-2">
            <Hospital className="w-4 h-4 text-red-600" />
            <span>Nearby Wheelchair-Equipped Hospitals</span>
          </h3>

          <div className="space-y-2">
            {destination.nearbyHospitals.map((hosp, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{hosp.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{hosp.address} • <strong>{hosp.distanceKm} km away</strong></p>
                </div>
                <a
                  href={`tel:${hosp.phone}`}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call ER</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Action Bar */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={() => speakText(`Destination ${destination.name}. Accessibility score is ${destination.scores.overall} out of 100. Sidewalk quality is ${destination.scores.sidewalkQuality} percent.`)}
            className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            🔊 Listen to Audio Overview
          </button>

          <button
            onClick={handlePlanTrip}
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg flex items-center space-x-2 focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-all hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            <span>Create Step-Free Itinerary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
