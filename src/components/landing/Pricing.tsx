import React from 'react';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const Pricing: React.FC = () => {
  const { setActiveTab } = useTrip();

  const plans = [
    {
      name: 'Free Explorer',
      price: '$0',
      period: 'forever free',
      description: 'Essential accessibility scores & search for travelers worldwide.',
      features: [
        'Worldwide Destination Explorer & Maps',
        'Granular Accessibility & Sidewalk Scores',
        'Personalized Accessibility Profile',
        'Standard AI Assistant Queries (5/day)',
        'Basic Emergency SOS Directory Access',
      ],
      cta: 'Start Free Planning',
      highlighted: false,
    },
    {
      name: 'AccessTrip Pass',
      price: '$12',
      period: 'per month',
      description: 'Unlimited AI step-free itineraries, live elevator alert feeds & offline maps.',
      features: [
        'Everything in Free Explorer',
        'Unlimited Conversational AI Itinerary Builder',
        'Real-Time Transit & Elevator Disruption Alerts',
        'Drag & Drop Custom Itinerary Planner + PDF Export',
        'Offline Map Caching for Remote Areas',
        'Priority 24/7 Accessible Taxi & ER Dispatch',
      ],
      cta: 'Upgrade to AccessTrip Pass',
      highlighted: true,
    },
    {
      name: 'Enterprise Transit Access',
      price: 'Custom',
      period: 'annual licensing',
      description: 'For municipal transit authorities, tourism boards, and hotels.',
      features: [
        'Full API access to Granular Sidewalk & Elevator datasets',
        'Custom Webhooks for Real-Time Transit Disruption Sync',
        'White-labeled Accessibility Widget for City Portals',
        'Dedicated WCAG 2.2 AA Audit Consulting',
      ],
      cta: 'Contact Enterprise Team',
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Simple Plans for Every Traveler
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Empowering everyone to explore freely with zero hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl space-y-6 flex flex-col justify-between transition-all ${
                plan.highlighted
                  ? 'bg-white dark:bg-slate-900 border-2 border-brand-500 shadow-2xl ring-4 ring-brand-500/20 relative'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-extrabold text-xs rounded-full shadow-md uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-slate-900 dark:text-slate-100">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-semibold">{plan.period}</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActiveTab('explorer')}
                className={`w-full py-3.5 rounded-2xl font-extrabold text-sm focus:outline-none focus:ring-4 focus:ring-brand-400 transition-all ${
                  plan.highlighted
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
