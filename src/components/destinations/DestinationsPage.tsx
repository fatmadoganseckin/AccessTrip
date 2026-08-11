import React, { useState } from 'react';
import { Compass, Search, ShieldCheck, Bus, Sun, ArrowRight } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Destination } from '../../types/destination';
import { DestinationDetailModal } from '../explorer/DestinationDetailModal';
import { InteractiveMapView } from '../map/InteractiveMapView';
import { SafeImage } from '../common/SafeImage';

export const DestinationsPage: React.FC = () => {
  const { destinations, setActiveDestination } = useTrip();
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const extraDestinations = [
    ...destinations,
    {
      id: 'vancouver-canada',
      name: 'Vancouver',
      country: 'Canada',
      region: 'North America',
      tagline: 'Nature and city with accessibility in mind',
      description: 'Vancouver features ocean boardwalks, barrier-free Stanley Park trails, and 100% accessible SkyTrain transit.',
      heroImage: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=600&q=80',
      galleryImages: [],
      coordinates: { lat: 49.2827, lng: -123.1207 },
      scores: { overall: 93, transportation: 95, accommodation: 92, restaurant: 90, attraction: 94, medicalSupport: 96, sidewalkQuality: 93, elevatorAvailability: 95, restroomAvailability: 92 },
      features: { serviceAnimalFriendly: true, quietAreasAvailable: true, brailleSignage: true, audioGuidesAvailable: true, tactilePaving: true, chargingStationsCount: 12 },
      climate: 'Oceanic' as const,
      budget: '$$$' as const,
      walkingDifficulty: 'Easy (Flat)' as const,
      crowdLevel: 'Moderate' as const,
      safetyRating: 4.9,
      weather: { tempC: 20, condition: 'Clear', humidity: 55 },
      airQualityIndex: { score: 1, label: 'Pristine' },
      crowdPredictionToday: [],
      emergencyContacts: { medical: '911', police: '911', accessibleTaxi: '+1 600-TAXIS', embassy: '+1 600-EMBASSY' },
      nearbyHospitals: [],
      mapPoints: [],
      matchedPreferences: [],
      verifiedStatus: true,
      lastUpdated: 'August 2026',
      aiSummary: 'Vancouver is an outdoor accessible paradise.'
    }
  ];

  const filtered = extraDestinations.filter(d => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <>
      <div className="space-y-6 pb-12 max-w-[1440px] mx-auto">
        
        {/* Contextual Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Destinations — Explore accessible cities around the world
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Spatial accessibility guides, step-free public transit ratings, and medical emergency hubs.
            </p>
          </div>

          <div className="w-full sm:w-64 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold focus:outline-none"
            />
          </div>
        </div>

        {/* 3-4 Column Desktop Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              onClick={() => setSelectedDest(dest)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <SafeImage
                    src={dest.heroImage}
                    alt={`Accessible destination: ${dest.name}, ${dest.country}`}
                    category="destination"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-emerald-600 text-white font-bold text-[10px] rounded shadow flex items-center space-x-1 z-10">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{dest.scores.overall} Score</span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 text-white drop-shadow-md z-10">
                    <h3 className="text-lg font-bold">{dest.name}, {dest.country}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="px-3.5 space-y-2">
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 leading-snug">
                    {dest.description}
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-semibold text-slate-500 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-1">
                      <Bus className="w-3 h-3 text-emerald-600" />
                      <span>{dest.scores.transportation}% Transit</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Sun className="w-3 h-3 text-amber-500" />
                      <span>{dest.weather.tempC}°C • {dest.weather.condition}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Footer */}
              <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                <span>Best: May–Sept</span>
                <span className="flex items-center group-hover:translate-x-0.5 transition-transform">
                  Explore <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Central Map Canvas */}
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-white space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold flex items-center">
                <Compass className="w-4 h-4 text-emerald-400 mr-1.5" /> Spatial Accessibility Map
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Step-free transit lines, wheelchair restrooms, and medical emergency ERs.
              </p>
            </div>
          </div>

          <div className="h-80 rounded-xl overflow-hidden border border-slate-800">
            <InteractiveMapView />
          </div>
        </div>

      </div>

      <DestinationDetailModal
        destination={selectedDest}
        onClose={() => setSelectedDest(null)}
      />
    </>
  );
};
