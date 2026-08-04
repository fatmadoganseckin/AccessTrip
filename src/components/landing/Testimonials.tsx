import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const Testimonials: React.FC = () => {
  const { reviews } = useTrip();

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Real Traveler Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Verified Community Stories
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Read authentic experiences from power wheelchair users, low-vision explorers, and sensory-sensitive travelers around the globe.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Author Info & Disability Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-500"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                        {rev.authorName}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Traveled to {rev.destinationName} • {rev.date}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-extrabold text-xs rounded-full border border-brand-300 dark:border-brand-800 capitalize">
                    ♿ {rev.authorDisability.replace('_', ' ')}
                  </span>
                </div>

                {/* Structured Verification Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                  <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-semibold rounded-lg">
                    Ramps: {rev.rampsAvailable}
                  </span>
                  <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 font-semibold rounded-lg">
                    Lifts: {rev.elevatorsWorking}
                  </span>
                  <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 font-semibold rounded-lg">
                    Toilets: {rev.accessibleToiletsUsable}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                  "{rev.comments}"
                </p>
              </div>

              {/* Helpful footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified On-Site Visit</span>
                </span>
                <span>{rev.helpfulCount} travelers found this helpful</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
