import React from 'react';
import { ShieldCheck, Compass, Sparkles, MapPin, CheckCircle2, Sliders, AlertTriangle, Users } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const FeatureGrid: React.FC = () => {
  const { setActiveTab } = useTrip();

  const features = [
    {
      title: 'No Generic "Accessible" Labels',
      description: 'We measure door widths in centimeters, sidewalk slope percentages, tactile block pathways, and exact elevator dimensions so you can make informed decisions.',
      icon: CheckCircle2,
      color: 'text-emerald-500',
    },
    {
      title: 'AI Step-Free Pathfinding',
      description: 'Our AI calculates walking energy budgets, elevation gain, rest stop frequency, and scheduled transit lift availability.',
      icon: Sparkles,
      color: 'text-brand-500',
    },
    {
      title: 'Real-Time Disruption Feeds',
      description: 'Instant notification alerts whenever subway station elevators break down, street construction creates step obstacles, or high tides steepen ferry gangways.',
      icon: AlertTriangle,
      color: 'text-amber-500',
    },
    {
      title: 'Structured Ground-Truth Reviews',
      description: 'Community reviews answer non-binary questions: Were grab bars sturdy? Did reality match the online description? Were staff trained?',
      icon: Users,
      color: 'text-indigo-500',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Engineered For Radical Inclusion
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Why AccessTrip Redefines Accessible Travel
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Built from the ground up to solve the uncertainty and anxiety of traveling with accessibility needs.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-4 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-md flex items-center justify-center">
                  <Icon className={`w-8 h-8 ${feat.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {feat.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Ready to plan your next worry-free adventure?</h3>
            <p className="text-brand-100 text-sm">Create your personalized accessibility profile in under 60 seconds.</p>
          </div>
          <button
            onClick={() => setActiveTab('explorer')}
            className="px-8 py-4 bg-white hover:bg-brand-50 text-brand-700 font-extrabold text-sm rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-400 transition-all hover:scale-105"
          >
            Explore Accessible Destinations
          </button>
        </div>
      </div>
    </section>
  );
};
