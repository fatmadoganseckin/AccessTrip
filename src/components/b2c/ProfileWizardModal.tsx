import React from 'react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { ACCESSIBILITY_PROFILE_TAGS } from '../../types/b2c';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileWizardModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { profile, toggleDisability } = useAccessibility();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-xl">
              ♿
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
                Personalized Accessibility Profile
              </h2>
              <span className="text-xs text-slate-500 font-semibold">Select your accessibility needs for 1-click auto-matching</span>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Tag Selector Grid */}
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
            Quick Needs Tags ({profile.disabilities?.length || 0} selected)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACCESSIBILITY_PROFILE_TAGS.map((tag) => {
              const isSelected = profile.disabilities?.includes(tag.id as any);
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleDisability(tag.id as any)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-sm text-slate-900 dark:text-slate-100 font-black'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{tag.icon}</span>
                    <span className="text-xs leading-snug">{tag.label}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start space-x-3">
          <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            Your saved profile automatically calculates <strong className="text-emerald-600">Accessibility Match %</strong> for every hotel and destination as you search.
          </p>
        </div>

        {/* Save CTA Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all"
          >
            Save Profile & Personalize Searches
          </button>
        </div>

      </div>
    </div>
  );
};
