import React from 'react';
import { Star, ShieldCheck, Compass } from 'lucide-react';
import { AccessibleExperience } from '../../types/b2c';

export const PopularExperiences: React.FC = () => {
  const experiences: AccessibleExperience[] = [
    {
      id: 'exp-bcn-gothic',
      title: 'Barcelona Step-Free Gothic Quarter & Tapas Trail',
      city: 'Barcelona',
      country: 'Spain',
      heroImage: 'https://images.unsplash.com/photo-1583422409516-2895a771deda?auto=format&fit=crop&w=600&q=80',
      duration: '3 hours',
      pricePerPerson: 45,
      accessibilityHighlights: ['100% Flat terrain', 'Accessible restrooms verified', 'Audio guides available'],
      rating: 4.96,
      reviewCount: 88,
    },
    {
      id: 'exp-tokyo-shrine',
      title: 'Tokyo Meiji Shrine & Harajuku Barrier-Free Walk',
      city: 'Tokyo',
      country: 'Japan',
      heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      duration: '4 hours',
      pricePerPerson: 60,
      accessibilityHighlights: ['Smooth gravel pathways', 'Tactile paving', 'Wheelchair rental on site'],
      rating: 4.92,
      reviewCount: 112,
    },
    {
      id: 'exp-london-museums',
      title: 'London Quiet Sensory Museum & Gallery Pass',
      city: 'London',
      country: 'UK',
      heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
      duration: 'Full Day',
      pricePerPerson: 35,
      accessibilityHighlights: ['Elevator priority access', 'Quiet sensory rooms', 'Service animals welcome'],
      rating: 4.98,
      reviewCount: 140,
    },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Popular Accessible Travel Experiences
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Curated tours and activities verified for step-free access, sensory comfort, and assistance.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={exp.heroImage}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-600 text-white font-extrabold text-[10px] rounded-xl shadow">
                    Verified Accessible
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-900 dark:text-slate-100">
                    <span className="truncate">{exp.city}, {exp.country}</span>
                    <span className="flex items-center text-amber-500 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {exp.rating} ({exp.reviewCount})
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm leading-snug">
                    {exp.title}
                  </h3>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.accessibilityHighlights.map((h, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[10px] rounded">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">Duration: {exp.duration}</span>
                <span className="text-base font-black text-slate-900 dark:text-slate-100">${exp.pricePerPerson} <span className="text-xs font-medium text-slate-500">/ person</span></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
