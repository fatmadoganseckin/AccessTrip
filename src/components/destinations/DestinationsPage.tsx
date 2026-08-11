import React, { useState } from 'react';
import { Compass, Search } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Destination } from '../../types/destination';
import { DestinationDetailModal } from '../explorer/DestinationDetailModal';
import { DestinationCard } from '../explorer/DestinationCard';
import { InteractiveMapView } from '../map/InteractiveMapView';

export const DestinationsPage: React.FC = () => {
  const { destinations } = useTrip();
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
      <div className="space-y-8 pb-12 max-w-[1440px] mx-auto">
        
        {/* Contextual Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Destinations — Accessible Travel Guides
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Spatial accessibility infrastructure, step-free transit, and verified places worldwide.
            </p>
          </div>

          <div className="w-full sm:w-64 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search destination city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* 1. Spatial Accessibility Map (First Focus: Immediately Visible Map Component) */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <InteractiveMapView />
        </div>

        {/* 2. Destination Cards Grid (Compact 35% height reduction, 4 columns on desktop) */}
        <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Top Audited Accessible Destinations
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              Showing {filtered.length} cities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={(d) => setSelectedDest(d)}
              />
            ))}
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
