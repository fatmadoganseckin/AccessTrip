import React from 'react';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useTrip();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                ♿
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                AccessTrip
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering travelers with disabilities to explore the world with absolute confidence through AI-driven granular accessibility intelligence.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>WCAG 2.2 Level AA Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setActiveTab('explorer')} className="hover:text-brand-400 transition-colors">
                  Destination Explorer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('assistant')} className="hover:text-brand-400 transition-colors">
                  Conversational AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-brand-400 transition-colors">
                  Interactive Accessible Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('planner')} className="hover:text-brand-400 transition-colors">
                  Drag & Drop Itinerary Planner
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-brand-400 transition-colors">
                  Accessibility Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reviews')} className="hover:text-brand-400 transition-colors">
                  Community Verified Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Accessibility Standards */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Accessibility First
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>• Keyboard Navigation Enabled</li>
              <li>• Screen Reader Live Region Support</li>
              <li>• OpenDyslexic & High Contrast Themes</li>
              <li>• 100% Granular Non-Binary Verification</li>
              <li>• Real-Time Elevator Disruption Feeds</li>
              <li>• One-Click Emergency SOS Mode</li>
            </ul>
          </div>

          {/* Global Accessible Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Global Support
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              AccessTrip partners with municipal transit authorities and disability advocacy groups globally.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 block">
                24/7 Accessibility Support Line
              </span>
              <a href="tel:+18005550199" className="text-sm font-extrabold text-white hover:text-brand-400">
                +1 (800) 555-ACCESS
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for universal inclusion worldwide. © 2026 AccessTrip.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
