import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, Twitter, Youtube, Globe, Check } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useTrip();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 pt-16 pb-12 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                ♿
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                AccessTrip
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Making the world more accessible, one trip at a time.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-200/70 dark:bg-slate-800 hover:bg-emerald-100 text-slate-600 dark:text-slate-300 rounded-full transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-200/70 dark:bg-slate-800 hover:bg-emerald-100 text-slate-600 dark:text-slate-300 rounded-full transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-200/70 dark:bg-slate-800 hover:bg-emerald-100 text-slate-600 dark:text-slate-300 rounded-full transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-200/70 dark:bg-slate-800 hover:bg-emerald-100 text-slate-600 dark:text-slate-300 rounded-full transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* Contact Email Links */}
            <div className="pt-2 space-y-1 text-xs font-semibold text-slate-500">
              <div>Inquiries: <a href="mailto:hello@accesstrip.com" className="text-emerald-600 hover:underline">hello@accesstrip.com</a></div>
              <div>Support: <a href="mailto:support@accesstrip.com" className="text-emerald-600 hover:underline">support@accesstrip.com</a></div>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveTab('explorer')} className="hover:text-emerald-600 transition-colors">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explorer')} className="hover:text-emerald-600 transition-colors">
                  Stays
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-emerald-600 transition-colors">
                  Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('assistant')} className="hover:text-emerald-600 transition-colors">
                  AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('planner')} className="hover:text-emerald-600 transition-colors">
                  Travel Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <li><a href="#about" className="hover:text-emerald-600 transition-colors">About us</a></li>
              <li><a href="#careers" className="hover:text-emerald-600 transition-colors">Careers</a></li>
              <li><a href="#press" className="hover:text-emerald-600 transition-colors">Press</a></li>
              <li><a href="#blog" className="hover:text-emerald-600 transition-colors">Blog</a></li>
              <li><a href="mailto:partners@accesstrip.com" className="hover:text-emerald-600 transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <li><a href="#accessibility-guide" className="hover:text-emerald-600 transition-colors">Accessibility guide</a></li>
              <li><a href="#help-center" className="hover:text-emerald-600 transition-colors">Help center</a></li>
              <li>
                <button onClick={() => setActiveTab('reviews')} className="hover:text-emerald-600 transition-colors">
                  Community
                </button>
              </li>
              <li><a href="#verify" className="hover:text-emerald-600 transition-colors">Verify your property</a></li>
              <li><a href="#terms" className="hover:text-emerald-600 transition-colors">Terms of service</a></li>
            </ul>
          </div>

          {/* Col 5: Stay in the loop */}
          <div className="space-y-4 lg:col-span-1">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Stay in the loop
            </h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Get accessible travel tips, stories, and updates.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-transform hover:scale-105 shadow-md"
                aria-label="Subscribe to newsletter"
              >
                {isSubscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div>
            © 2026 AccessTrip. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="mailto:privacy@accesstrip.com" className="hover:text-emerald-600 transition-colors">Privacy policy</a>
            <a href="#cookie" className="hover:text-emerald-600 transition-colors">Cookie policy</a>
            <a href="#accessibility-statement" className="hover:text-emerald-600 transition-colors">Accessibility statement</a>

            <div className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
              <span>English (US)</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
