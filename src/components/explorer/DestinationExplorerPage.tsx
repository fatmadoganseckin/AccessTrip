import React, { useState } from 'react';
import { Compass, LayoutGrid, Map, Home } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Destination } from '../../types/destination';
import { DestinationCard } from './DestinationCard';
import { DestinationFilters, FilterState } from './DestinationFilters';
import { DestinationDetailModal } from './DestinationDetailModal';
import { MOCK_STAYS } from '../../data/mockStays';
import { AccessibleStay } from '../../types/stay';
import { StayCard } from '../stays/StayCard';
import { StayDetailModal } from '../stays/StayDetailModal';

export const DestinationExplorerPage: React.FC = () => {
  const { destinations, setActiveDestination } = useTrip();

  const [tabMode, setTabMode] = useState<'stays' | 'destinations'>('stays');
  const [selectedDetailDest, setSelectedDetailDest] = useState<Destination | null>(null);
  const [selectedDetailStay, setSelectedDetailStay] = useState<AccessibleStay | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    minScore: 50,
    walkingDifficulty: 'All',
    budget: 'All',
    climate: 'All',
    minTransitScore: 50,
    serviceAnimalOnly: false,
    quietAreasOnly: false,
  });

  const handleResetFilters = () => {
    setFilters({
      search: '',
      minScore: 50,
      walkingDifficulty: 'All',
      budget: 'All',
      climate: 'All',
      minTransitScore: 50,
      serviceAnimalOnly: false,
      quietAreasOnly: false,
    });
  };

  const filteredDestinations = destinations.filter(d => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q);
      if (!matchName) return false;
    }
    if (d.scores.overall < filters.minScore) return false;
    if (filters.walkingDifficulty !== 'All' && d.walkingDifficulty !== filters.walkingDifficulty) return false;
    if (filters.climate !== 'All' && d.climate !== filters.climate) return false;
    if (filters.serviceAnimalOnly && !d.features.serviceAnimalFriendly) return false;
    if (filters.quietAreasOnly && !d.features.quietAreasAvailable) return false;
    return true;
  });

  const filteredStays = MOCK_STAYS.filter(s => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return s.title.toLowerCase().includes(q) || s.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 min-h-[85vh] transition-colors pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-brand-700 text-white rounded-3xl shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <Compass className="w-8 h-8 text-amber-300" />
              <h1 className="text-3xl font-black">Accessible Stays & Destination Marketplace</h1>
            </div>
            <p className="text-xs text-emerald-100 font-medium">
              Verified accommodations and audited global hubs with transparent accessibility metrics.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTabMode('stays')}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all ${
                tabMode === 'stays'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Stays ({MOCK_STAYS.length})</span>
            </button>

            <button
              onClick={() => setTabMode('destinations')}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all ${
                tabMode === 'destinations'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Destinations ({destinations.length})</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <DestinationFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
        />

        {/* View Mode Content */}
        {tabMode === 'stays' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Showing {filteredStays.length} verified accessible stays</span>
              <span>Matched to your active accessibility profile</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStays.map(stay => (
                <StayCard
                  key={stay.id}
                  stay={stay}
                  onSelect={(s) => setSelectedDetailStay(s)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Showing {filteredDestinations.length} verified global destination hubs</span>
              <span>Matched to your active accessibility profile</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map(dest => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onSelect={(d) => setSelectedDetailDest(d)}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      <DestinationDetailModal
        destination={selectedDetailDest}
        onClose={() => setSelectedDetailDest(null)}
      />

      <StayDetailModal
        stay={selectedDetailStay}
        onClose={() => setSelectedDetailStay(null)}
      />
    </section>
  );
};
