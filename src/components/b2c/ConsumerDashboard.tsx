import React from 'react';
import { Calendar, Heart, Sparkles, User, FileText, Download, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { MOCK_NORMALIZED_ACCOMMODATIONS } from '../../services/providerAdapter';
import { SafeImage } from '../common/SafeImage';

export const ConsumerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { profile } = useAccessibility();

  return (
    <div className="space-y-8 py-6">
      
      {/* User Header */}
      <div className="flex items-center space-x-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <SafeImage
          src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
          alt={user?.name || 'Traveler'}
          category="avatar"
          className="w-16 h-16 rounded-full border-2 border-emerald-500 object-cover"
          containerClassName="w-16 h-16 rounded-full flex-shrink-0"
        />
        <div>
          <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider">Consumer Traveler Account</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{user?.name || 'Emma Richardson'}</h1>
          <p className="text-xs text-slate-500 font-semibold">{user?.email || 'emma.richardson@example.com'}</p>
        </div>
      </div>

      {/* Grid: Upcoming Trips & Wishlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upcoming Trips */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center">
              <Calendar className="w-5 h-5 text-emerald-600 mr-2" /> Upcoming Trips (1)
            </h2>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Barcelona Step-Free Accessible Retreat</span>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">Sept 10 – Sept 17, 2026</span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">Stay: W Barcelona Accessible Suite • Confirmed booking via Booking.com</p>
          </div>
        </div>

        {/* Wishlist */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center">
              <Heart className="w-5 h-5 text-red-500 fill-red-500 mr-2" /> Saved Stays & Wishlist ({MOCK_NORMALIZED_ACCOMMODATIONS.length})
            </h2>
          </div>

          <div className="space-y-2">
            {MOCK_NORMALIZED_ACCOMMODATIONS.slice(0, 2).map((acc) => (
              <div key={acc.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <SafeImage
                    src={acc.heroImage}
                    alt={acc.name}
                    category="hotel"
                    className="w-12 h-12 rounded-xl object-cover"
                    containerClassName="w-12 h-12 rounded-xl flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">{acc.name}</h3>
                    <span className="text-[11px] text-slate-500 font-bold">${acc.pricePerNight}/night • {acc.city}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-600 text-white font-extrabold text-[10px] rounded">
                  {acc.verification.confidencePercent}% Match
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
