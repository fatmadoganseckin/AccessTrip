import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-amber-400 focus:text-slate-950 focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-500 transition-all"
    >
      Skip to main content (Press Enter)
    </a>
  );
};
