import React from 'react';

export const TrustFeaturesBar: React.FC = () => {
  const pillars = [
    {
      icon: '📍',
      title: 'Personalized for you',
      desc: 'Built around your accessibility profile and preferences.',
    },
    {
      icon: '📋',
      title: 'Verified information',
      desc: 'Data confirmed by our team and traveler community.',
    },
    {
      icon: '🪄',
      title: 'AI trip planner',
      desc: 'Smart itineraries that consider energy, distance & comfort.',
    },
    {
      icon: '🛡️',
      title: 'Travel with confidence',
      desc: 'Real reviews, real photos, real experiences.',
    },
  ];

  return (
    <section className="py-12 bg-slate-50/80 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-start space-x-4"
            >
              <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-xl flex-shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
