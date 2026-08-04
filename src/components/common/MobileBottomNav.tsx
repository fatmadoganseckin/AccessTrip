import React from 'react';
import { Compass, Map, Sparkles, User, Calendar } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

interface Props {
  onOpenProfile: () => void;
}

export const MobileBottomNav: React.FC<Props> = ({ onOpenProfile }) => {
  const { activeTab, setActiveTab } = useTrip();

  const items = [
    { id: 'landing', label: 'Explore', icon: Compass },
    { id: 'explorer', label: 'Stays', icon: Calendar },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles },
  ] as const;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex items-center justify-around shadow-2xl"
      aria-label="Mobile Navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${
              isActive
                ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 font-semibold'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}

      <button
        onClick={onOpenProfile}
        className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400 font-semibold rounded-xl"
        aria-label="Open profile settings"
      >
        <span className="text-base">♿</span>
        <span className="text-[10px] mt-0.5">Profile</span>
      </button>
    </nav>
  );
};
