import React, { useState } from 'react';
import { Eye, Type, Contrast, Volume2, Sparkles, X, Sun, Moon, RotateCcw } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { HighContrastMode } from '../../types/accessibility';

export const AccessibilityToolbar: React.FC = () => {
  const { settings, updateSettings, resetAccessibility, speakText } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const handleContrastChange = (mode: HighContrastMode) => {
    updateSettings({ highContrast: mode });
    speakText(`Contrast mode changed to ${mode}`);
  };

  const handleScaleChange = (scale: number) => {
    updateSettings({ fontScale: scale });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-400 flex items-center space-x-2 border-2 border-white dark:border-slate-800 transition-all hover:scale-105"
        aria-label="Open Accessibility Toolbar (WCAG Controls)"
        aria-expanded={isOpen}
      >
        <Eye className="w-6 h-6 animate-pulse" />
        <span className="font-bold text-sm hidden sm:inline">WCAG Controls</span>
      </button>

      {/* Toolbar Modal / Drawer */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border-2 border-brand-500 space-y-5 animate-slide-up"
          role="region"
          aria-label="Accessibility Customization Panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 font-bold">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg text-slate-900 dark:text-slate-100">Accessibility Toolbar</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={resetAccessibility}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg text-xs font-semibold flex items-center space-x-1"
                title="Reset to default"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label="Close accessibility controls"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Font Scaling Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center space-x-2">
                <Type className="w-4 h-4 text-brand-500" />
                <span>Text Size Scale</span>
              </span>
              <span className="px-2 py-0.5 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 rounded font-mono">
                {settings.fontScale}%
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="200"
              step="10"
              value={settings.fontScale}
              onChange={(e) => handleScaleChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Font scale percentage slider"
            />
          </div>

          {/* Contrast Mode Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-2">
              <Contrast className="w-4 h-4 text-brand-500" />
              <span>High Contrast Theme</span>
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleContrastChange('none')}
                className={`py-2 px-3 rounded-xl border font-bold transition-all ${
                  settings.highContrast === 'none'
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => handleContrastChange('contrast-light')}
                className={`py-2 px-3 rounded-xl border font-bold transition-all bg-white text-black border-slate-900 ${
                  settings.highContrast === 'contrast-light' ? 'ring-2 ring-brand-500' : ''
                }`}
              >
                High-Contrast White
              </button>
              <button
                onClick={() => handleContrastChange('contrast-dark')}
                className={`py-2 px-3 rounded-xl border font-bold transition-all bg-slate-950 text-white border-slate-100 ${
                  settings.highContrast === 'contrast-dark' ? 'ring-2 ring-brand-500' : ''
                }`}
              >
                High-Contrast Black
              </button>
              <button
                onClick={() => handleContrastChange('yellow-on-black')}
                className={`py-2 px-3 rounded-xl border font-bold transition-all bg-black text-amber-300 border-amber-300 ${
                  settings.highContrast === 'yellow-on-black' ? 'ring-2 ring-amber-400' : ''
                }`}
              >
                Yellow on Black
              </button>
            </div>
          </div>

          {/* Toggles Grid */}
          <div className="space-y-3 pt-2">
            {/* OpenDyslexic Font */}
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Dyslexia-Friendly Font
              </span>
              <input
                type="checkbox"
                checked={settings.dyslexiaFont}
                onChange={(e) => updateSettings({ dyslexiaFont: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 accent-brand-600"
              />
            </label>

            {/* Reduced Motion */}
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Reduce Animations & Motion
              </span>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 accent-brand-600"
              />
            </label>

            {/* Dark Mode */}
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                {settings.darkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>Dark Theme</span>
              </span>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => updateSettings({ darkMode: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 accent-brand-600"
              />
            </label>
          </div>

          {/* Screen Reader Announcement Test */}
          <button
            onClick={() => speakText("AccessTrip screen reader assistance mode active. All maps, scores, and itineraries are described verbally.")}
            className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <Volume2 className="w-4 h-4 text-brand-500" />
            <span>Test Audio Announcement</span>
          </button>
        </div>
      )}
    </>
  );
};
