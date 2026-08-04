import React, { useState } from 'react';
import { Bell, AlertTriangle, AlertCircle, Info, X, Filter } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notifications } = useTrip();
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'warning'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter(n => {
    if (filterSeverity === 'critical') return n.severity === 'critical';
    if (filterSeverity === 'warning') return n.severity === 'warning';
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-center-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3 text-brand-600 dark:text-brand-400">
            <Bell className="w-6 h-6" />
            <h2 id="notification-center-title" className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Live Accessibility Alerts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Close live alerts"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 flex items-center space-x-1 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              filterSeverity === 'all'
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setFilterSeverity('critical')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              filterSeverity === 'critical'
                ? 'bg-red-600 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilterSeverity('warning')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              filterSeverity === 'warning'
                ? 'bg-amber-500 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Warnings
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto space-y-3 pr-1 flex-1">
          {filtered.map(notif => {
            const isCritical = notif.severity === 'critical';
            const isWarning = notif.severity === 'warning';

            return (
              <div
                key={notif.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCritical
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-950 dark:text-red-100'
                    : isWarning
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-950 dark:text-amber-100'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 font-bold text-sm">
                    {isCritical ? (
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    ) : (
                      <Info className="w-5 h-5 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                    )}
                    <span>{notif.title}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                    {notif.timestamp}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                  {notif.locationName}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {notif.message}
                </p>

                <div className="mt-3 flex items-center space-x-2">
                  {notif.affectsWheelchair && (
                    <span className="px-2 py-0.5 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-semibold text-[10px] rounded-md border border-brand-300 dark:border-brand-800">
                      ♿ Affects Wheelchairs
                    </span>
                  )}
                  {notif.affectsLowVision && (
                    <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold text-[10px] rounded-md border border-indigo-300 dark:border-indigo-800">
                      👁️ Affects Vision
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
