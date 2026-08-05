import React from 'react';
import { Star, Compass, ArrowRight, Sun, Bus, ShieldCheck } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const TrendingDestinations: React.FC = () => {
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
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Trending Accessible Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Top-rated global cities audited for step-free transit, barrier-free stays, and medical support.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('explorer')}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all"
          >
            Explore all destinations
          </button>
        </div>

        {/* Destination Cards Grid (Google Travel Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {extraDestinations.slice(0, 3).map((dest) => (
            <div
              key={dest.id}
              onClick={() => {
                setActiveDestination(dest);
                setActiveTab('explorer');
              }}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Score Pill */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{dest.scores.overall} Accessibility Score</span>
                </div>

                {/* City & Country */}
                <div className="absolute bottom-3 left-3 right-3 text-white drop-shadow-md">
                  <h3 className="text-2xl font-black">{dest.name}, {dest.country}</h3>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                {/* Highlights Row */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-1.5">
                    <Bus className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Excellent Public Transit</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>{dest.weather.tempC}°C • {dest.weather.condition}</span>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-2 flex items-center justify-between text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  <span>246 verified stays</span>
                  <span className="flex items-center group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
