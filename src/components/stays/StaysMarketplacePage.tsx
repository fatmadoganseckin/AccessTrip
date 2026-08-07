import React, { useState } from 'react';
import {
  Search,
  Grid,
  Map as MapIcon,
  Star,
  Heart,
  CheckCircle2,
  ExternalLink,
  SlidersHorizontal
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

  // Search State
  const [searchDestination, setSearchDestination] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(300);

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
    return true;
  });

  return (
    <>
      <div className="space-y-6 pb-12 max-w-[1440px] mx-auto">
        
        {/* Contextual Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Stays — Find verified accessible accommodation
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Live pricing, instant room availability, and verified accessibility door measurements.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>4-5 Col Grid</span>
              </button>

              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
                  viewMode === 'split'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>List / Map Split</span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Search Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Destination */}
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <label className="block text-[10px] font-bold uppercase text-slate-400">Destination</label>
              <input
                type="text"
                placeholder="City or hotel name..."
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            {/* Property Type */}
            <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <label className="block text-[10px] font-bold uppercase text-slate-400">Property Type</label>
              <select
                value={selectedPropertyType}
                onChange={(e) => setSelectedPropertyType(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Hotel">Hotel</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            {/* Max Price */}
            <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400">
                <span>Max Price</span>
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

            {/* Submit */}
            <div className="lg:col-span-2 flex justify-end">
              <button
                type="button"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-1 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

          </div>
        </div>

        {/* 4-5 Column Desktop Hotel Grid */}
        {viewMode === 'grid' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-500">
              Showing {filteredAccommodations.length} verified accessible stays
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredAccommodations.map((acc) => {
                const isWishlisted = wishlistIds.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => setSelectedAccommodation(acc)}
                    className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={acc.heroImage}
                          alt={acc.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Provider Badge */}
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/90 text-white font-bold text-[9px] rounded uppercase">
                          {acc.provider.replace('_', ' ')}
                        </span>

                        {/* Wishlist */}
                        <button
                          onClick={(e) => toggleWishlist(acc.id, e)}
                          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
                            isWishlisted ? 'bg-white text-red-500' : 'bg-slate-900/40 text-white hover:bg-white hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                        </button>

                        {/* Match % */}
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-emerald-600 text-white font-bold text-[10px] rounded">
                          {acc.verification.confidencePercent}% Match
                        </div>
                      </div>

                      {/* Info Body */}
                      <div className="px-3 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs truncate">
                            {acc.name}
                          </h3>
                          <div className="flex items-center text-[10px] font-bold text-slate-900 dark:text-slate-100 flex-shrink-0">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                            {acc.rating}
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 font-medium truncate">
                          0.4 km center • {acc.city}
                        </p>

                        {/* Max 3 Accessibility Highlights */}
                        <div className="space-y-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                          <div className="text-emerald-600 flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1 flex-shrink-0 text-emerald-600" /> Step-free entrance ({acc.accessibilityRecord.entranceWidthCm}cm)
                          </div>
                          <div className="text-emerald-600 flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1 flex-shrink-0 text-emerald-600" /> Roll-in wet room shower
                          </div>
                          <div className="text-emerald-600 flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1 flex-shrink-0 text-emerald-600" /> Elevator access
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Price & Primary Action */}
                    <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-2">
                      <div>
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">${acc.pricePerNight}</span>
                        <span className="text-[10px] text-slate-500 font-medium"> / night</span>
                      </div>

                      <a
                        href={acc.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg inline-flex items-center space-x-1 shadow-sm"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[640px]">
            <div className="lg:col-span-6 overflow-y-auto space-y-3 pr-1">
              {filteredAccommodations.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccommodation(acc)}
                  className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3 cursor-pointer hover:border-emerald-500 transition-all"
                >
                  <img src={acc.heroImage} alt={acc.name} className="w-24 h-20 rounded-xl object-cover" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">{acc.name}</h3>
                      <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded">
                        {acc.verification.confidencePercent}% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{acc.address}, {acc.city}</p>
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100">${acc.pricePerNight} / night</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center p-6 text-center text-white">
              <div className="space-y-2">
                <MapIcon className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-bold">Interactive Map Canvas</h3>
                <p className="text-xs text-slate-400">Viewing pins for {filteredAccommodations.length} verified stays.</p>
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
