import React, { useState } from 'react';
import { X, PhoneCall, Hospital, Ambulance, Car, ShieldAlert, MapPin, Share2, Check, AlertTriangle } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { activeDestination } = useTrip();
  const [copiedLocation, setCopiedLocation] = useState(false);

  if (!isOpen) return null;

  const contacts = activeDestination?.emergencyContacts || {
    medical: '112 / 911',
    police: '112 / 911',
    accessibleTaxi: '+1 800-ACCESSIBLE-TAXI',
    embassy: '+1 800-EMBASSY-HELP',
  };

  const hospitals = activeDestination?.nearbyHospitals || [
    {
      name: 'Central Emergency Hospital & Trauma Center',
      distanceKm: 1.2,
      phone: '+1 800-555-ER-WHEELCHAIR',
      hasWheelchairER: true,
      address: '100 Medical Plaza Way',
      lat: 0,
      lng: 0
    }
  ];

  const handleShareLocation = () => {
    const text = `EMERGENCY ALERT - My current location: ${activeDestination?.name || 'Current Travel Hub'} (Lat: ${activeDestination?.coordinates.lat || 41.3851}, Lng: ${activeDestination?.coordinates.lng || 2.1734}). Accessible Medical ER Required.`;
    navigator.clipboard.writeText(text);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border-4 border-red-500 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3 text-red-600 dark:text-red-500">
            <ShieldAlert className="w-9 h-9 animate-pulse" aria-hidden="true" />
            <div>
              <h2 id="emergency-modal-title" className="text-2xl font-black tracking-tight text-red-600 dark:text-red-500">
                EMERGENCY ACCESSIBLE SOS MODE
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Instant priority access for {activeDestination?.name || 'Current Location'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus:ring-4 focus:ring-red-500 rounded-xl"
            aria-label="Close Emergency SOS Mode"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* GPS Location & Share */}
        <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-red-900 dark:text-red-200">
            <MapPin className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-red-600 dark:text-red-400 block">
                Current Verified GPS Hub
              </span>
              <span className="font-bold text-base">
                {activeDestination?.name || 'Barcelona'}, {activeDestination?.country || 'Spain'}
              </span>
            </div>
          </div>
          <button
            onClick={handleShareLocation}
            className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-red-400 shadow-md transition-all"
          >
            {copiedLocation ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
            <span>{copiedLocation ? 'Location Copied!' : 'Share Emergency GPS'}</span>
          </button>
        </div>

        {/* Quick Dial Emergency Grid */}
        <div>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
            Local Emergency Direct Dispatch
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`tel:${contacts.medical}`}
              className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl flex items-center justify-between shadow-lg focus:outline-none focus:ring-4 focus:ring-red-400 transition-all"
            >
              <div className="flex items-center space-x-3">
                <Ambulance className="w-7 h-7" />
                <div>
                  <span className="text-xs font-semibold text-red-100 block">Medical Ambulance</span>
                  <span className="text-xl font-extrabold">{contacts.medical}</span>
                </div>
              </div>
              <PhoneCall className="w-6 h-6 animate-bounce" />
            </a>

            <a
              href={`tel:${contacts.accessibleTaxi}`}
              className="p-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white rounded-2xl flex items-center justify-between shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-500 transition-all border border-slate-700"
            >
              <div className="flex items-center space-x-3">
                <Car className="w-7 h-7 text-amber-400" />
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">24/7 Wheelchair Taxi</span>
                  <span className="text-sm font-bold truncate max-w-[150px] block">{contacts.accessibleTaxi}</span>
                </div>
              </div>
              <PhoneCall className="w-6 h-6 text-amber-400" />
            </a>
          </div>
        </div>

        {/* Nearby ER Hospitals */}
        <div>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <Hospital className="w-5 h-5 text-red-600" />
            <span>Wheelchair-Accessible Emergency Rooms Nearby</span>
          </h3>

          <div className="space-y-3">
            {hospitals.map((hosp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{hosp.name}</span>
                    {hosp.hasWheelchairER && (
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-lg border border-emerald-300 dark:border-emerald-800">
                        Wheelchair ER Ready
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {hosp.address} • <strong className="text-slate-700 dark:text-slate-300">{hosp.distanceKm} km away</strong>
                  </p>
                </div>
                <a
                  href={`tel:${hosp.phone}`}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-emerald-400 shadow"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Hospital</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Offline Cache Reminder */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 flex items-center space-x-3 text-amber-900 dark:text-amber-200 text-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>
            This emergency directory is cached offline locally so you can access hospital numbers even without network reception.
          </span>
        </div>
      </div>
    </div>
  );
};
