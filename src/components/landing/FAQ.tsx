import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does AccessTrip verify elevator and transit accessibility in real-time?',
      answer: 'We aggregate official APIs from municipal transit authorities (such as TfL, RATP, Tokyo Metro, and SFMTA) combined with on-the-ground crowd verification from localized disability advocates. If an elevator goes down for maintenance, our live alert feed updates immediately.',
    },
    {
      question: 'Why doesn\'t AccessTrip just label places as "accessible"?',
      answer: 'A simple "accessible" badge is often misleading — a location might have a step-free entrance but lack an accessible bathroom, or have steep interior ramps. AccessTrip breaks down exact measurements, slope gradients, elevator availability, and quiet zones so you can decide based on your specific needs.',
    },
    {
      question: 'What accessibility standards does the website follow?',
      answer: 'AccessTrip strictly complies with WCAG 2.2 Level AA guidelines. The entire application is fully navigable via keyboard, provides high-contrast color themes, supports text scaling up to 200%, features OpenDyslexic font options, includes ARIA live regions for screen readers, and respects reduced motion settings.',
    },
    {
      question: 'Can I use AccessTrip offline while traveling?',
      answer: 'Yes! AccessTrip automatically caches your active trip itineraries, emergency hospital contacts, and local offline maps on your device so you can access crucial details even without a cellular data connection.',
    },
    {
      question: 'How does the AI Assistant generate step-free itineraries?',
      answer: 'The AI assistant cross-references your personalized Accessibility Profile (e.g. power wheelchair user with max 5% slope tolerance) against topological elevation data, level boarding transit lines, and verified step-free venues to craft realistic, low-energy daily schedules with scheduled rest breaks.',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center justify-center space-x-1">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Everything you need to know about our data accuracy, WCAG standards, and AI itinerary generation.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/40 transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center justify-between space-x-4 focus:outline-none focus:ring-4 focus:ring-brand-400"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal border-t border-slate-200/50 dark:border-slate-700/50 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
