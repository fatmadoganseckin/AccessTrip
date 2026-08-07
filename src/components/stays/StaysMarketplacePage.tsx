import React, { useState } from 'react';
import {
  Search,
  Filter,
  Grid,
  Map as MapIcon,
  Star,
  Heart,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  SlidersHorizontal,
  X,
  Compass,
  Building2,
  Bed,
  Check
} from 'lucide-react';
import { MOCK_NORMALIZED_ACCOMMODATIONS } from '../../services/providerAdapter';
import { NormalizedAccommodation } from '../../types/provider';
import { StayDetailModal } from './StayDetailModal';
import { MOCK_STAYS } from '../../data/mockStays';
import { useAccessibility } from '../../context/AccessibilityContext';

export const StaysMarketplacePage: React.FC = () => {
  const { profile } = useAccessibility();
  const [selectedAccommodation, setSelectedAccommodation] = useState<NormalizedAccommodation | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'split'>('grid');
  const [wishlistIds, setWishlistIds] = useState<string[]>(['acc-madrid-01']);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Search Panel State
  const [searchDestination, setSearchDestination] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(300);

  // Advanced Filters State
  const [filterRollInShower, setFilterRollInShower] = useState(false);
  const [filterElevator, setFilterElevator] = useState(false);
  const [filterServiceAnimal, setFilterServiceAnimal] = useState(false);
  const [filterWheelchairCharging, setFilterWheelchairCharging] = useState(false);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlistIds.includes(id)) {
      setWishlistIds(wishlistIds.filter(item => item !== id));
    } else {
      setWishlistIds([...wishlistIds, id]);
    }
  };

  const filteredAccommodations = MOCK_NORMALIZED_ACCOMMODATIONS.filter(acc => {
    if (searchDestination) {
      const q = searchDestination.toLowerCase();
      const matchLoc = acc.name.toLowerCase().includes(q) || acc.city.toLowerCase().includes(q) || acc.country.toLowerCase().includes(q);
      if (!matchLoc) return false;
    }
    if (selectedPropertyType !== 'All' && acc.propertyType !== selectedPropertyType) return false;
    if (acc.pricePerNight > maxPrice) return false;
    if (filterRollInShower && !acc.accessibilityRecord.hasRollInShower) return false;
    if (filterElevator && !acc.accessibilityRecord.hasElevator) return false;
    if (filterServiceAnimal && !acc.accessibilityRecord.acceptsServiceAnimals) return false;
    if (filterWheelchairCharging && !acc.accessibilityRecord.hasWheelchairCharging) return false;
    return true;
  });

  return (
    <>
      <div className="space-y-6 pb-12">
        
        {/* Contextual Page Header (No heavy green marketing banner!) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Stays — Find verified accessible accommodation
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Live pricing, instant room availability, and granular accessibility door measurements.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>4-5 Col Grid</span>
              </button>

              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
                  viewMode === 'split'
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>List / Map Split</span>
              </button>
            </div>

            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-extrabold text-xs text-slate-800 dark:text-slate-200 rounded-xl shadow-sm flex items-center space-x-1.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Sticky Search & Filter Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Destination */}
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400">Destination</label>
              <input
                type="text"
                placeholder="City, region, or hotel name..."
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                className="w-full bg-transparent text-xs font-extrabold text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            {/* Property Type */}
            <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400">Property Type</label>
              <select
                value={selectedPropertyType}
                onChange={(e) => setSelectedPropertyType(e.target.value)}
                className="w-full bg-transparent text-xs font-extrabold text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                <option value="All">All Types (Hotel, Apartment, Villa)</option>
                <option value="Hotel">Hotel</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Resort">Resort</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <div className="flex items-center justify-between text-[10px] font-extrabold uppercase text-slate-400">
                <span>Max Price / Night</span>
                <span className="text-emerald-600 font-bold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-1"
              />
            </div>

            {/* Search Submit CTA */}
            <div className="lg:col-span-2 flex justify-end">
              <button
                type="button"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center space-x-1.5 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Search Stays</span>
              </button>
            </div>

          </div>
        </div>

        {/* Stays Output Section */}
        {viewMode === 'grid' ? (
          /* Responsive 4-5 Column Desktop Grid */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Showing {filteredAccommodations.length} verified accessible stays</span>
              <span>Matched to active accessibility profile ({profile.disabilities?.length || 0} needs set)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredAccommodations.map((acc) => {
                const isWishlisted = wishlistIds.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => setSelectedAccommodation(acc)}
                    className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      
                      {/* Image & Badges */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={acc.heroImage}
                          alt={acc.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Provider Badge */}
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-900/90 text-white font-extrabold text-[9px] rounded-lg uppercase tracking-wider backdrop-blur-md">
                          {acc.provider.replace('_', ' ')}
                        </span>

                        {/* Wishlist Heart */}
                        <button
                          onClick={(e) => toggleWishlist(acc.id, e)}
                          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
                            isWishlisted ? 'bg-white text-red-500 shadow-md' : 'bg-slate-900/40 text-white hover:bg-white hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                        </button>

                        {/* Match % Badge */}
                        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 bg-emerald-600 text-white font-extrabold text-[10px] rounded-lg shadow">
                          {acc.verification.confidencePercent}% Match
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs line-clamp-1">
                            {acc.name}
                          </h3>
                          <div className="flex items-center text-[10px] font-bold text-slate-900 dark:text-slate-100 flex-shrink-0">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                            {acc.rating}
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 font-semibold line-clamp-1">
                          0.4 km from city center • {acc.city}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-1 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                          <div className="text-emerald-600 flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1 flex-shrink-0" /> Step-free entrance ({acc.accessibilityRecord.entranceWidthCm}cm)
                          </div>
                          <div className="text-emerald-600 flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1 flex-shrink-0" /> Roll-in wet room shower
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Price & Booking Button */}
                    <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-3">
                      <div>
                        <span className="text-base font-black text-slate-900 dark:text-slate-100">${acc.pricePerNight}</span>
                        <span className="text-[10px] text-slate-500 font-medium"> / night</span>
                      </div>

                      <a
                        href={acc.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-lg inline-flex items-center space-x-1 shadow"
                      >
                        <span>Reserve</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List / Map Split View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[680px]">
            {/* Left List */}
            <div className="lg:col-span-6 overflow-y-auto space-y-4 pr-1">
              {filteredAccommodations.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccommodation(acc)}
                  className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4 cursor-pointer hover:border-emerald-500 transition-all"
                >
                  <img src={acc.heroImage} alt={acc.name} className="w-28 h-24 rounded-2xl object-cover" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{acc.name}</h3>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded">
                        {acc.verification.confidencePercent}% Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{acc.address}, {acc.city}</p>
                    <div className="text-xs font-black text-slate-900 dark:text-slate-100">${acc.pricePerNight} / night</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Map Canvas Placeholder */}
            <div className="lg:col-span-6 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center p-6 text-center text-white">
              <div className="space-y-2">
                <MapIcon className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-black">Interactive Stays Map Canvas</h3>
                <p className="text-xs text-slate-400 max-w-xs">Viewing pins for {filteredAccommodations.length} verified stays with spatial step-free routes.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      <StayDetailModal
        stay={selectedAccommodation ? MOCK_STAYS[0] : null}
        onClose={() => setSelectedAccommodation(null)}
      />
    </>
  );
};
