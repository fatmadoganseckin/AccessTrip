import React, { useState } from 'react';
import { Sparkles, Compass, ShieldCheck, ArrowRight, Volume2, Mic, MapPin, Search } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const Hero: React.FC = () => {
  const { setActiveTab, setActiveDestination, destinations } = useTrip();
  const { profile, speakText, startVoiceListening, isVoiceListening } = useAccessibility();
  const [searchQuery, setSearchQuery] = useState('');

  const presetQueries = [
    'Plan a 5-day wheelchair-friendly trip to Barcelona',
    'Find quiet museums in Paris',
    'Which London metro stations have elevators?',
    'Build a low-energy itinerary with step-free transit',
    'Avoid steep hills in San Francisco',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    const match = destinations.find(d =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      setActiveDestination(match);
    }
    setActiveTab('explorer');
  };

  const handlePresetClick = (query: string) => {
    setSearchQuery(query);
    setActiveTab('assistant');
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 bg-gradient-to-b from-brand-50/50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-400/10 via-accessible-teal/10 to-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* WCAG Compliance Badge Header */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/80 border border-brand-300 dark:border-brand-800 text-brand-800 dark:text-brand-200 text-xs font-bold flex items-center space-x-2 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>WCAG 2.2 Level AA Accessible Platform</span>
          </div>

          <div className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center space-x-2">
            <span>✨ AI-Powered Granular Intelligence</span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15]">
            Travel the World with Total{' '}
            <span className="bg-gradient-to-r from-brand-600 via-accessible-teal to-indigo-600 dark:from-brand-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Accessibility Confidence
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-3xl mx-auto">
            Never guess if a location is accessible. AccessTrip provides detailed elevator status, slope inclines, tactile guidance, quiet sensory zones, and AI step-free itineraries customized to your profile.
          </p>
        </div>

        {/* Search & AI Query Bar */}
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="p-2 sm:p-3 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-brand-500/80 dark:border-brand-500/60 flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative flex-1 w-full">
              <Search className="w-6 h-6 text-brand-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Where would you like to explore? (e.g. Barcelona, Tokyo, London)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 text-base font-semibold focus:outline-none"
                aria-label="Search destinations worldwide"
              />
              
              {/* Voice Search Trigger */}
              <button
                type="button"
                onClick={() => startVoiceListening((txt) => setSearchQuery(txt))}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                  isVoiceListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
                title="Voice Input Mode"
                aria-label="Voice input mode"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-2xl flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-brand-400 shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Now</span>
            </button>
          </form>

          {/* Quick AI Presets */}
          <div className="mt-4 space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block text-center uppercase tracking-wider">
              Try asking the AI Assistant:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {presetQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(query)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-300 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-2xs flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>"{query}"</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-6">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
            <span className="text-3xl">🛗</span>
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">Live Elevator Status</h3>
            <p className="text-[11px] text-slate-500">Real-time outage tracking for transit lifts</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
            <span className="text-3xl">♿</span>
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">Granular Scores</h3>
            <p className="text-[11px] text-slate-500">Sidewalk quality, slopes & bathroom dimensions</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
            <span className="text-3xl">🎧</span>
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">Quiet Sensory Zones</h3>
            <p className="text-[11px] text-slate-500">Low-stimulus itineraries for autism & ADHD</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
            <span className="text-3xl">🚨</span>
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">1-Click SOS Mode</h3>
            <p className="text-[11px] text-slate-500">Emergency hospital & wheelchair taxi dispatch</p>
          </div>
        </div>

      </div>
    </section>
  );
};
