import React, { useState } from 'react';
import { Compass, LayoutGrid, Map, SlidersHorizontal } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Destination } from '../../types/destination';
import { DestinationCard } from './DestinationCard';
import { DestinationFilters, FilterState } from './DestinationFilters';
import { DestinationDetailModal } from './DestinationDetailModal';

export const DestinationExplorerPage: React.FC = () => {
  const { destinations, activeDestination, setActiveDestination } = useTrip();

  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedDetailDest, setSelectedDetailDest] = useState<Destination | null>(null);

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
    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.region.toLowerCase().includes(q);
      if (!matchName) return false;
    }

    // Min Score
    if (d.scores.overall < filters.minScore) return false;

    // Walking Difficulty
    if (filters.walkingDifficulty !== 'All' && d.walkingDifficulty !== filters.walkingDifficulty) return false;

    // Climate
    if (filters.climate !== 'All' && d.climate !== filters.climate) return false;

    // Service Animal
    if (filters.serviceAnimalOnly && !d.features.serviceAnimalFriendly) return false;

    // Quiet Areas
    if (filters.quietAreasOnly && !d.features.quietAreasAvailable) return false;

    return true;
  });

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-8 bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 text-white rounded-3xl shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <Compass className="w-8 h-8 text-amber-300" />
              <h1 className="text-3xl font-black">Worldwide Destination Explorer</h1>
            </div>
            <p className="text-xs text-brand-100 font-medium">
              Audited cities with non-binary accessibility ratings, sidewalk quality metrics, and elevator uptime feeds.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-brand-700 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Card Grid</span>
            </button>
          </div>
        </div>

        {/* Filters Drawer */}
        <DestinationFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
        />

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Showing {filteredDestinations.length} verified accessible cities</span>
          <span>Filtered by active accessibility profile</span>
        </div>

        {/* Destination Cards Grid */}
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

      <DestinationDetailModal
        destination={selectedDetailDest}
        onClose={() => setSelectedDetailDest(null)}
      />
    </section>
  );
};
