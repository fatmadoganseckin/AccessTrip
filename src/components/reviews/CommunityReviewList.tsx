import React, { useState } from 'react';
import { MessageSquareQuote, Plus, ThumbsUp, CheckCircle, Filter, Star, ShieldCheck } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { ReviewSubmissionModal } from './ReviewSubmissionModal';

export const CommunityReviewList: React.FC = () => {
  const { reviews, markHelpful } = useTrip();
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [filterDisability, setFilterDisability] = useState<string>('all');

  const filtered = reviews.filter(r => {
    if (filterDisability === 'all') return true;
    return r.authorDisability === filterDisability;
  });

  return (
    <>
      <section className="py-10 bg-slate-50 dark:bg-slate-950 min-h-[85vh] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-8 bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 text-white rounded-3xl shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <MessageSquareQuote className="w-8 h-8 text-amber-300" />
                <h1 className="text-3xl font-black">Community Ground-Truth Reviews</h1>
              </div>
              <p className="text-sm text-brand-100 font-medium">
                Non-binary accessibility verification submitted by travelers with real lived experiences.
              </p>
            </div>

            <button
              onClick={() => setIsSubmitOpen(true)}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center space-x-2 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Submit Accessibility Review</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 text-xs overflow-x-auto pb-2 scrollbar-none">
            <span className="text-slate-500 flex items-center space-x-1 font-bold flex-shrink-0">
              <Filter className="w-4 h-4" />
              <span>Filter by Mobility Profile:</span>
            </span>
            <button
              onClick={() => setFilterDisability('all')}
              className={`px-4 py-2 rounded-xl font-extrabold flex-shrink-0 transition-all ${
                filterDisability === 'all'
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              All Travelers ({reviews.length})
            </button>
            <button
              onClick={() => setFilterDisability('power_wheelchair')}
              className={`px-4 py-2 rounded-xl font-extrabold flex-shrink-0 transition-all ${
                filterDisability === 'power_wheelchair'
                  ? 'bg-brand-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              👩‍🦼 Power Wheelchair
            </button>
            <button
              onClick={() => setFilterDisability('manual_wheelchair')}
              className={`px-4 py-2 rounded-xl font-extrabold flex-shrink-0 transition-all ${
                filterDisability === 'manual_wheelchair'
                  ? 'bg-brand-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              👨‍🦽 Manual Wheelchair
            </button>
            <button
              onClick={() => setFilterDisability('low_vision')}
              className={`px-4 py-2 rounded-xl font-extrabold flex-shrink-0 transition-all ${
                filterDisability === 'low_vision'
                  ? 'bg-brand-600 text-white shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              👁️ Low Vision
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map(rev => (
              <div
                key={rev.id}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={rev.authorAvatar}
                        alt={rev.authorName}
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-500 shadow-sm"
                      />
                      <div>
                        <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                          {rev.authorName}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {rev.destinationName} • {rev.date}
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-extrabold text-xs rounded-full border border-brand-200 dark:border-brand-900 capitalize">
                      ♿ {rev.authorDisability.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Verification Metric Chips */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-2">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 block uppercase">Ramps</span>
                      <span className="text-brand-600 dark:text-brand-400 font-black">{rev.rampsAvailable}</span>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 block uppercase">Elevators</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-black">{rev.elevatorsWorking}</span>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 block uppercase">Toilets</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-black">{rev.accessibleToiletsUsable}</span>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-normal">
                    "{rev.comments}"
                  </p>

                  {/* Staff Rating & Online Match */}
                  <div className="flex items-center justify-between text-xs pt-2">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-slate-600 dark:text-slate-400">Staff Support:</span>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.staffHelpfulnessRating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{rev.matchedOnlineDescription ? 'Matched Online Description' : 'Discrepancy Reported'}</span>
                    </div>
                  </div>

                </div>

                {/* Upvote Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified On-Site Audit</span>
                  </span>

                  <button
                    onClick={() => markHelpful(rev.id)}
                    className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 text-slate-700 dark:text-slate-300 hover:text-brand-600 font-bold rounded-xl flex items-center space-x-1.5 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      <ReviewSubmissionModal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} />
    </>
  );
};
