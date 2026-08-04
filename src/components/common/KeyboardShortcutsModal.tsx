import React, { useEffect } from 'react';
import { X, Keyboard } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: '?', description: 'Open Keyboard Shortcuts Help' },
    { key: 'Tab', description: 'Navigate to next interactive element' },
    { key: 'Shift + Tab', description: 'Navigate to previous element' },
    { key: 'Alt + S', description: 'Jump to Skip Main Content' },
    { key: 'Alt + E', description: 'Trigger Emergency SOS Mode' },
    { key: 'Alt + A', description: 'Open AI Travel Assistant Drawer' },
    { key: 'Alt + T', description: 'Open Accessibility Toolbar Settings' },
    { key: 'Esc', description: 'Close any active modal or drawer' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-brand-600 dark:text-brand-400">
            <Keyboard className="w-7 h-7" aria-hidden="true" />
            <h2 id="keyboard-modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl"
            aria-label="Close shortcuts modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm">
          AccessTrip is engineered for 100% WCAG 2.2 AA keyboard navigation. Use the key combinations below for rapid navigation:
        </p>

        <div className="space-y-2">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
            >
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {sc.description}
              </span>
              <kbd className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs font-semibold rounded-lg shadow-sm border border-slate-300 dark:border-slate-600">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500 shadow-md"
          >
            Got it (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
