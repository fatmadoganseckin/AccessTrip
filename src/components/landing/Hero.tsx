import React, { useState } from 'react';
import { Search, Calendar, Users, Sliders, CheckCircle, Sparkles, MapPin, Compass } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  onOpenProfile: () => void;
}

export const Hero: React.FC<Props> = ({ onOpenProfile }) => {
  const { setActiveTab, setActiveDestination, destinations } = useTrip();
  const { profile } = useAccessibility();

  const [activeSearchTab, setActiveSearchTab] = useState<'places' | 'stays' | 'ai'>('stays');
  const [whereInput, setWhereInput] = useState('');
  const [datesInput, setDatesInput] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);

  const popularSearches = [
    'Wheelchair friendly',
    'Service animal friendly',
    'Step-free stays',
    'Quiet places',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSearchTab === 'ai') {
      setActiveTab('assistant');
      return;
    }

    if (whereInput) {
      const match = destinations.find(d =>
        d.name.toLowerCase().includes(whereInput.toLowerCase()) ||
        d.country.toLowerCase().includes(whereInput.toLowerCase())
      );
      if (match) setActiveDestination(match);
    }

    setActiveTab('explorer');
  };

  const handleTagClick = (tag: string) => {
    if (tag.includes('AI') || tag.includes('Quiet')) {
      setActiveTab('assistant');
    } else {
      setActiveTab('explorer');
    }
  };

  return (
    <section className="relative min-h-[620px] pt-12 pb-20 sm:pt-16 sm:pb-24 bg-cover bg-center flex items-center justify-center transition-colors"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(248, 250, 252, 0.75), rgba(248, 250, 252, 0.95)), url('https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=80')`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-10">
        
        {/* Top Headline & Floating Badge Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          
          {/* Main Title */}
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Travel the world with total accessibility{' '}
              <span className="text-emerald-600">confidence.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Find accessible destinations, book inclusive stays, and plan every detail of your trip with AI-powered support and verified accessibility information.
            </p>
          </div>

          {/* Floating Personalization Badge */}
          <div className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xl flex items-center space-x-3 self-start max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0 font-bold">
              📍
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">Personalized for you</span>
              <p className="text-[11px] text-slate-500 font-semibold leading-snug">
                We match trips to your accessibility needs <span className="text-emerald-600 font-bold">✓</span>
              </p>
            </div>
          </div>

        </div>

        {/* Floating Search Widget Component */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
          
          {/* Search Tabs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSearchTab('places')}
              className={`px-4 py-2 rounded-full font-bold text-xs flex items-center space-x-2 transition-all ${
                activeSearchTab === 'places'
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Places</span>
            </button>

            <button
              onClick={() => setActiveSearchTab('stays')}
              className={`px-4 py-2 rounded-full font-bold text-xs flex items-center space-x-2 transition-all ${
                activeSearchTab === 'stays'
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span>🏡 Stays</span>
            </button>

            <button
              onClick={() => setActiveSearchTab('ai')}
              className={`px-4 py-2 rounded-full font-bold text-xs flex items-center space-x-2 transition-all ${
                activeSearchTab === 'ai'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Assistant</span>
            </button>
          </div>

          {/* Floating Search Inputs Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 bg-slate-50/50 dark:bg-slate-800/40 items-center"
          >
            {/* Where to? */}
            <div className="lg:col-span-4 p-2 sm:px-4">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                Where to?
              </label>
              <input
                type="text"
                placeholder="Destination, city, or place"
                value={whereInput}
                onChange={(e) => setWhereInput(e.target.value)}
                className="w-full bg-transparent text-sm font-extrabold text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Check in - Check out */}
            <div className="lg:col-span-3 p-2 sm:px-4">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                Check in – Check out
              </label>
              <input
                type="text"
                placeholder="Add dates"
                value={datesInput}
                onChange={(e) => setDatesInput(e.target.value)}
                className="w-full bg-transparent text-sm font-extrabold text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Guests */}
            <div className="lg:col-span-2 p-2 sm:px-4">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                Guests
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full bg-transparent text-sm font-extrabold text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                <option value={1}>1 guest</option>
                <option value={2}>2 guests</option>
                <option value={3}>3+ guests</option>
              </select>
            </div>

            {/* Accessibility Profile */}
            <div className="lg:col-span-2 p-2 sm:px-4">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                Accessibility
              </label>
              <button
                type="button"
                onClick={onOpenProfile}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <span>♿ {profile.disabilities[0]?.replace('_', ' ') || 'My profile'}</span>
              </button>
            </div>

            {/* Green Circular Search Button */}
            <div className="lg:col-span-1 p-1 flex justify-center sm:justify-end">
              <button
                type="submit"
                className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-all hover:scale-105"
                aria-label="Search accessible stays"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {/* Popular Search Tags */}
          <div className="flex flex-wrap items-center space-x-2 text-xs pt-1">
            <span className="text-slate-400 font-bold text-[11px] mr-1">Popular searches:</span>
            {popularSearches.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full border border-slate-200 dark:border-slate-700 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
