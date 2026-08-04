import React, { useState } from 'react';
import { X, Star, Heart, Check, AlertTriangle, ShieldCheck, Calendar, Users, MapPin, Hospital, PhoneCall, Sparkles, MessageSquare } from 'lucide-react';
import { AccessibleStay } from '../../types/stay';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  stay: AccessibleStay | null;
  onClose: () => void;
}

export const StayDetailModal: React.FC<Props> = ({ stay, onClose }) => {
  const { profile, speakText } = useAccessibility();

  const [checkIn, setCheckIn] = useState('2026-09-10');
  const [checkOut, setCheckOut] = useState('2026-09-15');
  const [guestsCount, setGuestsCount] = useState(2);
  const [isReserved, setIsReserved] = useState(false);

  if (!stay) return null;

  const handleReserve = () => {
    setIsReserved(true);
    speakText(`Stay reservation submitted for ${stay.title}. Details sent to your account.`);
    setTimeout(() => {
      setIsReserved(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stay-detail-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 mb-1">
              <span>{stay.stayType}</span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{stay.verifiedBadge}</span>
              </span>
            </div>
            <h2 id="stay-detail-title" className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              {stay.title}
            </h2>
            <p className="text-xs text-slate-500 font-semibold flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>{stay.location}</span>
              <span>•</span>
              <span className="flex items-center text-slate-900 dark:text-slate-100 font-extrabold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                {stay.rating} ({stay.reviewCount} reviews)
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus:ring-4 focus:ring-brand-500 rounded-2xl border border-slate-200 dark:border-slate-800"
            aria-label="Close stay details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden h-72 sm:h-96 shadow-lg">
          <div className="md:col-span-2 h-full overflow-hidden">
            <img
              src={stay.images[0]}
              alt={stay.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="hidden md:flex flex-col gap-3 h-full">
            <img
              src={stay.images[1] || stay.images[0]}
              alt={`${stay.title} interior`}
              className="w-full h-1/2 object-cover rounded-tr-2xl hover:scale-105 transition-transform duration-500"
            />
            <img
              src={stay.images[2] || stay.images[0]}
              alt={`${stay.title} bathroom`}
              className="w-full h-1/2 object-cover rounded-br-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Main Content & Sticky Booking Card Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Property Specs & Granular Accessibility Match */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Host Profile Info */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center space-x-4">
              <img
                src={stay.hostAvatar}
                alt={stay.hostName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-500 shadow-md"
              />
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                  Hosted by {stay.hostName}
                </h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-bold">
                  {stay.hostBadge}
                </p>
              </div>
            </div>

            {/* Personalized Accessibility Match Breakdown */}
            <div className="p-6 bg-emerald-50/70 dark:bg-emerald-950/50 rounded-3xl border-2 border-emerald-500/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-emerald-900 dark:text-emerald-100 font-black text-lg">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <span>{stay.matchPercentage}% Match for Your Profile</span>
                </div>
                <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full">
                  Based on saved preferences
                </span>
              </div>

              <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed font-semibold">
                We evaluated this property against your active accessibility profile ({profile.disabilities.map(d => d.replace('_', ' ')).join(', ')}):
              </p>

              {/* Verified Checklist */}
              <div className="space-y-2 text-xs">
                {stay.matchChecklist.passed.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-emerald-900 dark:text-emerald-200 font-bold">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}

                {stay.matchChecklist.warnings.map((warn, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-amber-800 dark:text-amber-300 font-bold bg-amber-100/60 dark:bg-amber-950/60 p-2.5 rounded-xl border border-amber-300">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{warn}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">About this stay</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {stay.description}
              </p>
            </div>

            {/* Accessibility Highlights */}
            <div className="space-y-3">
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">Verified Accessibility Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stay.accessibilityHighlights.map((hl, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                    <span className="text-emerald-500">✓</span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Airbnb-Style Sticky Booking Card */}
          <div className="lg:sticky lg:top-6 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border-2 border-slate-200 dark:border-slate-800 space-y-6">
            
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100">${stay.pricePerNight}</span>
                <span className="text-xs text-slate-500 font-bold"> / night</span>
              </div>
              <div className="flex items-center space-x-1 text-xs font-bold text-slate-900 dark:text-slate-100">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{stay.rating}</span>
              </div>
            </div>

            {/* Date & Guests Box */}
            <div className="border border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden divide-y divide-slate-300 dark:divide-slate-700 text-xs font-bold">
              <div className="grid grid-cols-2 divide-x divide-slate-300 dark:divide-slate-700">
                <div className="p-3">
                  <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>
                <div className="p-3">
                  <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Checkout</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3">
                <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Guests & Accessibility Assistance</label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Guest (Wheelchair traveler)</option>
                  <option value={2}>2 Guests (Traveler + Companion)</option>
                  <option value={3}>3 Guests (Family access)</option>
                </select>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="flex justify-between">
                <span>${stay.pricePerNight} x 5 nights</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">${stay.pricePerNight * 5}</span>
              </div>
              <div className="flex justify-between">
                <span>Accessibility verification fee</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between font-black text-sm text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total Stay Price</span>
                <span className="text-brand-600 dark:text-brand-400">${stay.totalPriceForStay}</span>
              </div>
            </div>

            {/* Reserve CTA */}
            <button
              onClick={handleReserve}
              disabled={isReserved}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-all hover:scale-102 flex items-center justify-center space-x-2"
            >
              {isReserved ? (
                <>
                  <Check className="w-5 h-5 animate-bounce" />
                  <span>Stay Reserved! Confirming with Host...</span>
                </>
              ) : (
                <span>Reserve Verified Stay</span>
              )}
            </button>

            <p className="text-[11px] text-center text-slate-400 font-semibold">
              You won't be charged yet. Free cancellation up to 48h before check-in.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
