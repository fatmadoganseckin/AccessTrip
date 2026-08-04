import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Filter, Layers, Sparkles, Navigation, Zap, Hospital, VolumeX, Car, Train } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { MapPoint } from '../../types/destination';

// Custom Leaflet Markers
const createCustomIcon = (emoji: string, color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 36px; height: 36px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white;">${emoji}</div>`,
    className: 'custom-leaflet-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

const iconMap = {
  elevator: createCustomIcon('🛗', '#0c8de4'),
  metro: createCustomIcon('🚇', '#4f46e5'),
  parking: createCustomIcon('🅿️', '#059669'),
  restroom: createCustomIcon('🚽', '#d97706'),
  medical: createCustomIcon('🏥', '#e11d48'),
  charging: createCustomIcon('⚡', '#eab308'),
  quiet: createCustomIcon('🎧', '#8b5cf6'),
  attraction: createCustomIcon('🏛️', '#ec4899'),
  hotel: createCustomIcon('🏨', '#0284c7'),
  restaurant: createCustomIcon('🍽️', '#f97316'),
};

export const InteractiveMapView: React.FC = () => {
  const { activeDestination, destinations } = useTrip();
  const destination = activeDestination || destinations[0];

  const [activeLayers, setActiveLayers] = useState<string[]>([
    'elevator', 'metro', 'parking', 'restroom', 'medical', 'charging', 'quiet', 'attraction'
  ]);

  const toggleLayer = (type: string) => {
    setActiveLayers(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const points = destination.mapPoints.filter(p => activeLayers.includes(p.type));

  // Simulated Step-Free Route Polyline
  const routeCoordinates: [number, number][] = destination.mapPoints.map(p => [p.lat, p.lng]);

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-8 bg-gradient-to-r from-brand-600 via-teal-600 to-brand-700 text-white rounded-3xl shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <Navigation className="w-8 h-8 text-amber-300" />
              <h1 className="text-3xl font-black">Interactive Accessible Route Map</h1>
            </div>
            <p className="text-xs text-brand-100 font-medium">
              Map layers for elevators, level metro entrances, universal toilets, charging points, and quiet zones in {destination.name}.
            </p>
          </div>

          <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-xs font-bold flex items-center space-x-2">
            <span>📍 {destination.name}, {destination.country}</span>
          </div>
        </div>

        {/* Map Layers Control Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Filter Map Layers:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => toggleLayer('elevator')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeLayers.includes('elevator') ? 'bg-brand-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              🛗 Elevators ({destination.mapPoints.filter(p => p.type === 'elevator').length})
            </button>
            <button
              onClick={() => toggleLayer('metro')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeLayers.includes('metro') ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              🚇 Metro Stations ({destination.mapPoints.filter(p => p.type === 'metro').length})
            </button>
            <button
              onClick={() => toggleLayer('restroom')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeLayers.includes('restroom') ? 'bg-amber-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              🚽 Accessible Restrooms ({destination.mapPoints.filter(p => p.type === 'restroom').length})
            </button>
            <button
              onClick={() => toggleLayer('charging')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeLayers.includes('charging') ? 'bg-yellow-500 text-slate-950 shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              ⚡ Wheelchair Fast Charging ({destination.mapPoints.filter(p => p.type === 'charging').length})
            </button>
            <button
              onClick={() => toggleLayer('quiet')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeLayers.includes('quiet') ? 'bg-purple-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              🎧 Quiet Sensory Zones ({destination.mapPoints.filter(p => p.type === 'quiet').length})
            </button>
          </div>
        </div>

        {/* Map Rendering Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 h-[600px] relative z-10">
          <MapContainer
            center={[destination.coordinates.lat, destination.coordinates.lng]}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Step-free path line */}
            {routeCoordinates.length > 1 && (
              <Polyline
                positions={routeCoordinates}
                color="#0c8de4"
                weight={4}
                dashArray="8, 8"
              />
            )}

            {/* Map Point Markers */}
            {points.map((pt) => {
              const icon = iconMap[pt.type] || iconMap.attraction;
              return (
                <Marker key={pt.id} position={[pt.lat, pt.lng]} icon={icon}>
                  <Popup className="custom-leaflet-popup">
                    <div className="p-2 space-y-2 max-w-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
                        <span>{pt.name}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded">
                          ✓ Accessible
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{pt.address}</p>
                      <p className="text-xs text-brand-700 font-semibold bg-brand-50 p-2 rounded-lg">{pt.notes}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

      </div>
    </section>
  );
};
