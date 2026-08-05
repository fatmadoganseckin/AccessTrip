import React, { useState } from 'react';
import { Search, Mic, Calendar, Users, Sliders, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ProfileWizardModal } from './ProfileWizardModal';

export const B2CHero: React.FC = () => {
  const { setActiveTab, setActiveDestination, destinations } = useTrip();
  const { profile, speakText, isVoiceListening, startVoiceListening } = useAccessibility();

  const [whereInput, setWhereInput] = useState('');
  const [datesInput, setDatesInput] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [isProfileWizardOpen, setIsProfileWizardOpen] = useState(false);

  const suggestedTrips = [
    'Barcelona Step-Free',
    'Tokyo Barrier-Free',
    'Lisbon Accessible Lofts',
    'London Quiet Retreats',
  ];

  const handleVoiceSearch = () => {
    startVoiceListening((transcript) => {
      setWhereInput(transcript);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (whereInput) {
      const match = destinations.find(d =>
        d.name.toLowerCase().includes(whereInput.toLowerCase()) ||
        d.country.toLowerCase().includes(whereInput.toLowerCase())
      );
      if (match) setActiveDestination(match);
    }
    setActiveTab('explorer');
  };

  return (
    <>
      <section
        className="relative min-h-[580px] pt-12 pb-20 sm:pt-16 sm:pb-24 bg-cover bg-center flex items-center justify-center transition-colors"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-8">
          
          {/* Main Title & Subtitle */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 bg-white/20 backdrop-blur-md text-white font-extrabold text-xs rounded-full border border-white/30 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI-Powered Travel Planning with Verified Accessibility</span>
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Plan your next trip without accessibility surprises.
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-semibold max-w-2xl mx-auto leading-relaxed">
              Find verified accessible hotels, attractions, transportation, and personalized itineraries—all in one place.
            </p>
          </div>

          {/* Airbnb-Style Floating Glass Search Experience */}
          <div className="max-w-4xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/40 dark:border-slate-800 space-y-3">
            <form
              onSubmit={handleSearchSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 items-center text-left"
            >
              {/* Where to? */}
              <div className="lg:col-span-4 p-2 sm:px-4">
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  Where to?
                </label>
                <input
                  type="text"
                  placeholder="Search Barcelona, Tokyo, London..."
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
                  placeholder="Add travel dates"
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

              {/* Accessibility Profile Pill */}
              <div className="lg:col-span-2 p-2 sm:px-4">
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  Accessibility
                </label>
                <button
                  type="button"
                  onClick={() => setIsProfileWizardOpen(true)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <span>♿ {profile.disabilities?.length ? `${profile.disabilities.length} Needs Set` : 'Add Profile'}</span>
                </button>
              </div>

              {/* Search & Voice Buttons */}
              <div className="lg:col-span-1 p-1 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  className={`p-3 rounded-full transition-all focus:outline-none ${
                    isVoiceListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                  title="Voice Search"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-all hover:scale-105"
                  aria-label="Search accessible trips"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </form>

            {/* Suggested Search Chips */}
            <div className="flex flex-wrap items-center justify-center space-x-2 text-xs pt-1">
              <span className="text-slate-400 font-bold text-[11px] mr-1">Suggested:</span>
              {suggestedTrips.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setWhereInput(tag.split(' ')[0]);
                    setActiveTab('explorer');
                  }}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full border border-slate-200 dark:border-slate-700 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      <ProfileWizardModal
        isOpen={isProfileWizardOpen}
        onClose={() => setIsProfileWizardOpen(false)}
      />
    </>
  );
};
