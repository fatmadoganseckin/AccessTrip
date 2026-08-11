import React, { useState } from 'react';
import {
  Heart,
  FolderPlus,
  Share2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Compass,
  Home,
  Plus,
  ArrowUpDown,
  CheckCircle2
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useApp } from '../../context/AppContext';
import { MOCK_NORMALIZED_ACCOMMODATIONS } from '../../services/providerAdapter';
import { SafeImage } from '../common/SafeImage';

export const SavedCollectionsPage: React.FC = () => {
  const { setActiveTab } = useTrip();
  const { setActiveView } = useApp();

  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [activeTabType, setActiveTabType] = useState<'stays' | 'destinations' | 'experiences'>('stays');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const collections = [
    { id: 'all', name: 'All Saved', count: 12 },
    { id: 'summer_2027', name: 'Summer 2027', count: 4 },
    { id: 'europe', name: 'Europe', count: 6 },
    { id: 'japan_dream', name: 'Japan Dream Trip', count: 3 },
    { id: 'weekend_escapes', name: 'Weekend Escapes', count: 2 },
    { id: 'beaches', name: 'Accessible Beaches', count: 5 },
    { id: 'family', name: 'Family Trips', count: 4 },
  ];

  const savedStays = MOCK_NORMALIZED_ACCOMMODATIONS;

  const savedDestinations = [
    {
      id: 'barcelona',
      name: 'Barcelona',
      country: 'Spain',
      score: 94,
      placesCount: 246,
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'vancouver',
      name: 'Vancouver',
      country: 'Canada',
      score: 93,
      placesCount: 180,
      image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const savedExperiences = [
    {
      id: 'exp-1',
      title: 'Sagrada Família Priority Step-Free Audio Tour',
      city: 'Barcelona, Spain',
      tag: 'Museum & Heritage',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'exp-2',
      title: 'Nova Icaria Accessible Wheelchair Beach & Boardwalk',
      city: 'Barcelona, Spain',
      tag: 'Wheelchair Beach',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  if (showEmptyState) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-red-50 dark:bg-red-950/40 text-red-500 flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 fill-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Nothing saved yet</h2>
        <p className="text-xs text-slate-500 font-medium">
          Save destinations, hotels and experiences to build your next accessible adventure.
        </p>
        <button
          onClick={() => setActiveView('destinations')}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all inline-flex items-center space-x-2"
        >
          <span>Explore Destinations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <div className="pt-4">
          <button
            onClick={() => setShowEmptyState(false)}
            className="text-[11px] font-semibold text-slate-400 underline hover:text-slate-600"
          >
            Switch to populated wishlist mode
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-[1440px] mx-auto">
      
      {/* 1. Page Header & Quick Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center">
            <Heart className="w-6 h-6 text-red-500 fill-red-500 mr-2.5" />
            <span>Saved Collections & Wishlists</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Collect accessible hotels, destination cities, and experiences for future travel inspiration.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center space-x-1.5 transition-all">
            <FolderPlus className="w-4 h-4" />
            <span>New Collection</span>
          </button>
          <button
            onClick={() => setShowEmptyState(true)}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700"
            title="Preview Empty State"
          >
            Demo Empty
          </button>
        </div>
      </div>

      {/* 2. Collection Folders (Pinterest / Airbnb Wishlists style) */}
      <div className="space-y-3">
        <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
          Wishlist Folders:
        </span>
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {collections.map((col) => {
            const isActive = activeFolder === col.id;
            return (
              <button
                key={col.id}
                onClick={() => setActiveFolder(col.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-all flex items-center space-x-2 ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>{col.name}</span>
                <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-extrabold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {col.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Category Tabs: Stays | Destinations | Experiences */}
      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500">
        <button
          onClick={() => setActiveTabType('stays')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center space-x-1.5 ${
            activeTabType === 'stays' ? 'border-emerald-600 text-emerald-600 font-black' : 'border-transparent hover:text-slate-800'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Saved Stays ({savedStays.length})</span>
        </button>

        <button
          onClick={() => setActiveTabType('destinations')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center space-x-1.5 ${
            activeTabType === 'destinations' ? 'border-emerald-600 text-emerald-600 font-black' : 'border-transparent hover:text-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Saved Destinations ({savedDestinations.length})</span>
        </button>

        <button
          onClick={() => setActiveTabType('experiences')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center space-x-1.5 ${
            activeTabType === 'experiences' ? 'border-emerald-600 text-emerald-600 font-black' : 'border-transparent hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Saved Experiences ({savedExperiences.length})</span>
        </button>
      </div>

      {/* 4. SAVED STAYS GRID */}
      {activeTabType === 'stays' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedStays.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden">
                <SafeImage
                  src={hotel.heroImage}
                  alt={hotel.name}
                  category="hotel"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Score Pill */}
                <div className="absolute top-2.5 right-2.5 z-10">
                  <span className="px-2.5 py-1 bg-emerald-600 text-white font-extrabold text-[11px] rounded-lg shadow-sm flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{hotel.verification.confidencePercent}% Match</span>
                  </span>
                </div>

                {/* Saved Date Badge */}
                <div className="absolute bottom-2.5 left-2.5 z-10">
                  <span className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-md text-white font-semibold text-[10px] rounded">
                    Saved Aug 10
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 line-clamp-1">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{hotel.city}, {hotel.country}</p>
                  <div className="text-sm font-black text-slate-900 dark:text-slate-100 mt-1">
                    ${hotel.pricePerNight} <span className="text-xs font-semibold text-slate-500">/ night</span>
                  </div>
                </div>

                {/* Quick Actions (Move to Trip, Share, Compare, Remove) */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveView('trips')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center space-x-1 transition-all"
                  >
                    <span>Move to Trip</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title="Share">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title="Remove">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. SAVED DESTINATIONS GRID */}
      {activeTabType === 'destinations' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <SafeImage
                  src={dest.image}
                  alt={dest.name}
                  category="destination"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-emerald-600 text-white font-extrabold text-[10px] rounded shadow">
                  {dest.score} Score
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">{dest.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{dest.country} • {dest.placesCount} Verified Places</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setActiveView('destinations')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
                <button
                  onClick={() => setActiveView('trips')}
                  className="px-3 py-1 bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold rounded-lg"
                >
                  Move to Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. SAVED EXPERIENCES GRID */}
      {activeTabType === 'experiences' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-sm"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <SafeImage
                  src={exp.image}
                  alt={exp.title}
                  category="experience"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white font-bold text-[10px] rounded">
                  {exp.tag}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">{exp.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{exp.city}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setActiveView('trips')}
                  className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                >
                  Move to Trip
                </button>
                <button className="text-xs text-red-500 font-bold hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 7. AI SUGGESTIONS ("You Saved Barcelona, You Might Also Like") */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            AI Recommendations Based on Your Saved Collection
          </h2>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Because you saved <strong>Barcelona</strong>, you might also like these top accessible global cities with similar step-free transit scores:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-900 dark:text-slate-100 font-extrabold block">Valencia, Spain</span>
              <span className="text-[10px] text-emerald-600 font-bold">92% Match • Flat Boardwalks</span>
            </div>
            <button onClick={() => setActiveView('destinations')} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition-all">
              Save
            </button>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-900 dark:text-slate-100 font-extrabold block">Lisbon, Portugal</span>
              <span className="text-[10px] text-emerald-600 font-bold">90% Match • Step-Free Trams</span>
            </div>
            <button onClick={() => setActiveView('destinations')} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition-all">
              Save
            </button>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-900 dark:text-slate-100 font-extrabold block">Amsterdam, NL</span>
              <span className="text-[10px] text-emerald-600 font-bold">95% Match • Level Canals</span>
            </div>
            <button onClick={() => setActiveView('destinations')} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition-all">
              Save
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
