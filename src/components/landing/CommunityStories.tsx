import React from 'react';
import { useTrip } from '../../context/TripContext';
import { SafeImage } from '../common/SafeImage';

export const CommunityStories: React.FC = () => {
  const { setActiveTab } = useTrip();

  const stories = [
    {
      name: 'Emma R.',
      location: 'Sydney, Australia',
      disability: 'Wheelchair user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quote: '"AccessTrip helped me explore Rome without worrying about accessibility. The info was spot on!"',
      destination: 'Barcelona, Spain',
    },
    {
      name: 'Marcus V.',
      location: 'Toronto, Canada',
      disability: 'Service animal handler',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: '"Finally a platform that shows clear service animal policies. Game changer!"',
      destination: 'Lisbon, Portugal',
    },
    {
      name: 'Sophie L.',
      location: 'London, UK',
      disability: 'Low vision',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      quote: '"The accessibility filters and AI assistant made planning so much easier."',
      destination: 'Kyoto, Japan',
    },
    {
      name: 'Daniel K.',
      location: 'New York, USA',
      disability: 'Cane user',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      quote: '"I loved how detailed the reviews and photos were. Helped me book with confidence."',
      destination: 'Vancouver, Canada',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              From our community
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Real stories from real travelers.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('reviews')}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl focus:outline-none transition-all"
          >
            View all stories
          </button>
        </div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((s, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <SafeImage
                    src={s.avatar}
                    alt={s.name}
                    category="avatar"
                    className="w-11 h-11 rounded-2xl object-cover border-2 border-emerald-500"
                    containerClassName="w-11 h-11 rounded-2xl flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                      {s.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-semibold">{s.location}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-[9px] rounded-md">
                      {s.disability}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic">
                  {s.quote}
                </p>
              </div>

              <span className="text-[11px] text-slate-400 font-semibold block pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                Traveled to: <strong className="text-slate-700 dark:text-slate-200">{s.destination}</strong>
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
