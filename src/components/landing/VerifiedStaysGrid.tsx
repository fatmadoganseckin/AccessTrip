import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { MOCK_STAYS } from '../../data/mockStays';
import { AccessibleStay } from '../../types/stay';
import { StayCard } from '../stays/StayCard';
import { StayDetailModal } from '../stays/StayDetailModal';
import { useTrip } from '../../context/TripContext';

export const VerifiedStaysGrid: React.FC = () => {
  const { setActiveTab } = useTrip();
  const [selectedStay, setSelectedStay] = useState<AccessibleStay | null>(null);

  return (
    <>
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Stays that welcome everyone
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                Verified accessible stays with transparent accessibility details.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('explorer')}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              >
                View all stays
              </button>
            </div>
          </div>

          {/* Stays Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_STAYS.map((stay) => (
              <StayCard
                key={stay.id}
                stay={stay}
                onSelect={(s) => setSelectedStay(s)}
              />
            ))}
          </div>

        </div>
      </section>

      <StayDetailModal
        stay={selectedStay}
        onClose={() => setSelectedStay(null)}
      />
    </>
  );
};
