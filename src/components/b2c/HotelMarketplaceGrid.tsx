import React, { useState } from 'react';
import { Star, Heart, CheckCircle2, AlertTriangle, ExternalLink, Sliders, ArrowRight } from 'lucide-react';
import { MOCK_NORMALIZED_ACCOMMODATIONS } from '../../services/providerAdapter';
import { NormalizedAccommodation } from '../../types/provider';
import { StayDetailModal } from '../stays/StayDetailModal';
import { MOCK_STAYS } from '../../data/mockStays';

export const HotelMarketplaceGrid: React.FC = () => {
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
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Verified Accessible Hotels & Stays
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Real accommodations with transparent accessibility metrics and verified feature checks.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-500">Auto-matched to your profile</span>
            </div>
          </div>

          {/* Stays Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_NORMALIZED_ACCOMMODATIONS.map((acc) => {
              const isWishlisted = wishlistIds.includes(acc.id);
              return (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccommodation(acc)}
                  className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    
                    {/* Cover Image & Badges */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={acc.heroImage}
                        alt={acc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Provider Badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/90 text-white font-extrabold text-[10px] rounded-xl uppercase tracking-wider backdrop-blur-md shadow">
                        {acc.provider.replace('_', ' ')}
                      </span>

                      {/* Wishlist Heart */}
                      <button
                        onClick={(e) => toggleWishlist(acc.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                          isWishlisted ? 'bg-white text-red-500 shadow-md' : 'bg-slate-900/40 text-white hover:bg-white hover:text-red-500'
                        }`}
                        aria-label="Add to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                      </button>

                      {/* Match % Badge */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-lg">
                        {acc.verification.confidencePercent}% Match
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="px-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-slate-900 dark:text-slate-100 text-base line-clamp-1">
                          {acc.name}
                        </h3>
                        <div className="flex items-center text-xs font-bold text-slate-900 dark:text-slate-100 flex-shrink-0 ml-2">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                          {acc.rating} ({acc.reviewCount})
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 font-medium line-clamp-1">
                        {acc.address}, {acc.city}
                      </p>

                      {/* Granular Match Breakdown */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-1.5 text-xs">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Accessibility Breakdown</span>
                        <div className="space-y-1 font-bold text-[11px]">
                          <div className="text-emerald-600 flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> Step-free entrance & elevator ({acc.accessibilityRecord.entranceWidthCm}cm width)
                          </div>
                          <div className="text-emerald-600 flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> Roll-in wet room shower with grab rails
                          </div>
                          <div className="text-amber-500 flex items-center">
                            <AlertTriangle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> Bed height unconfirmed (Contact hotel)
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Pricing & Booking Provider CTA */}
                  <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-4">
                    <div>
                      <span className="text-lg font-black text-slate-900 dark:text-slate-100">${acc.pricePerNight}</span>
                      <span className="text-xs text-slate-500 font-medium"> / night</span>
                    </div>

                    <a
                      href={acc.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md inline-flex items-center space-x-1.5 transition-all"
                    >
                      <span>Continue on Booking.com</span>
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
