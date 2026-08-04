import React from 'react';
import { Database, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ModeBanner: React.FC = () => {
  const { envMode, setEnvMode } = useApp();

  return (
    <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs border-b border-slate-800 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {envMode === 'mock' && (
          <>
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-amber-300">DEMO / MOCK DATA MODE</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">— Realistic seeded organizations, travellers, cases & verification records.</span>
          </>
        )}

        {envMode === 'sandbox' && (
          <>
            <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold text-blue-300">SANDBOX INTEGRATION MODE</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">— Connected to Booking.com Demand API Sandbox & Google Places test environment.</span>
          </>
        )}

        {envMode === 'production' && (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold text-emerald-300">PRODUCTION MODE</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">— Live Neon Postgres DB, Row-Level Security & Booking.com production environment.</span>
          </>
        )}
      </div>

      <div className="flex items-center space-x-1.5 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
        <button
          onClick={() => setEnvMode('mock')}
          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
            envMode === 'mock' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Mock
        </button>

        <button
          onClick={() => setEnvMode('sandbox')}
          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
            envMode === 'sandbox' ? 'bg-blue-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Sandbox
        </button>

        <button
          onClick={() => setEnvMode('production')}
          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
            envMode === 'production' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Production
        </button>
      </div>
    </div>
  );
};
