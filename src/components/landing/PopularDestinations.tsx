import React from 'react';
import { useTrip } from '../../context/TripContext';
import { DestinationCard } from '../explorer/DestinationCard';

export const PopularDestinations: React.FC = () => {
  const { destinations, setActiveDestination, setActiveTab } = useTrip();

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

  return (
    <section className="py-14 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Popular accessible destinations
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('explorer')}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-full transition-all"
          >
            View all
          </button>
        </div>

        {/* 4 Column Desktop Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {extraDestinations.slice(0, 4).map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onSelect={(d) => {
                setActiveDestination(d);
                setActiveTab('explorer');
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
