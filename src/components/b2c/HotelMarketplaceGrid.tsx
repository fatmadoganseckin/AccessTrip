import React, { useState } from 'react';
import { Star, Heart, CheckCircle2, AlertTriangle, ExternalLink, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { MOCK_NORMALIZED_ACCOMMODATIONS } from '../../services/providerAdapter';
import { NormalizedAccommodation } from '../../types/provider';
import { StayDetailModal } from '../stays/StayDetailModal';
import { MOCK_STAYS } from '../../data/mockStays';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SafeImage } from '../common/SafeImage';

export const HotelMarketplaceGrid: React.FC = () => {
  const { profile } = useAccessibility();
  const [selectedAccommodation, setSelectedAccommodation] = useState<NormalizedAccommodation | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['acc-madrid-01']);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlistIds.includes(id)) {
      setWishlistIds(wishlistIds.filter(item => item !== id));
    } else {
      setWishlistIds([...wishlistIds, id]);
    }
  };

  return (
    <>
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider block mb-1">
                Airbnb-Style Hotel Marketplace
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Verified Accessible Stays & Hotels
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Real photos, verified door widths, roll-in showers, and instant availability via Booking.com & official sites.
              </p>
            </div>
          </div>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_NORMALIZED_ACCOMMODATIONS.map((acc) => {
              const isWishlisted = wishlistIds.includes(acc.id);

              return (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccommodation(acc)}
                  className="group cursor-pointer bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    
                    {/* Image Carousel Mock with Badges */}
                    <div className="relative h-52 overflow-hidden">
                      <SafeImage
                        src={acc.heroImage}
                        alt={`Accessible stay: ${acc.name} in ${acc.city}`}
                        category="hotel"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Provider Badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/90 text-white font-extrabold text-[10px] rounded-xl uppercase tracking-wider backdrop-blur-md z-10">
                        {acc.provider.replace('_', ' ')}
                      </span>

                      {/* Wishlist Heart */}
                      <button
                        onClick={(e) => toggleWishlist(acc.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
                          isWishlisted ? 'bg-white text-red-500 shadow-md' : 'bg-slate-900/40 text-white hover:bg-white hover:text-red-500'
                        }`}
                        aria-label="Save to wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                      </button>

                      {/* Match Badge */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-lg z-10">
                        {acc.verification.confidencePercent}% Match
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-extrabold">
                        <h3 className="text-slate-900 dark:text-slate-100 font-extrabold truncate text-sm">
                          {acc.name}
                        </h3>
                        <div className="flex items-center text-slate-900 dark:text-slate-100 flex-shrink-0 ml-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                          {acc.rating}
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 font-semibold truncate">
                        {acc.address}, {acc.city}
                      </p>

                      {/* Granular Match Breakdown (AccessTrip Core Feature) */}
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-[11px] font-bold">
                        <div className="text-emerald-700 dark:text-emerald-400 flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                          <span>Step-free entrance ({acc.accessibilityRecord.entranceWidthCm}cm)</span>
                        </div>
                        <div className="text-emerald-700 dark:text-emerald-400 flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                          <span>Roll-in shower with grab rails</span>
                        </div>
                        <div className="text-amber-600 dark:text-amber-400 flex items-center">
                          <AlertTriangle className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                          <span>Bed height unconfirmed</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Pricing & Affiliate CTA Footer */}
                  <div className="p-5 pt-0 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-slate-900 dark:text-slate-100">${acc.pricePerNight}</span>
                      <span className="text-xs text-slate-500 font-medium"> / night</span>
                    </div>

                    <a
                      href={acc.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl inline-flex items-center space-x-1 shadow-md transition-all"
                    >
                      <span>Reserve</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      <StayDetailModal
        stay={selectedAccommodation ? MOCK_STAYS[0] : null}
        onClose={() => setSelectedAccommodation(null)}
      />
    </>
  );
};
