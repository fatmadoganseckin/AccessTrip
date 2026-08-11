import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Route,
  Camera,
  FileText,
  Hospital,
  Zap,
  Info
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { MapPoint } from '../../types/destination';
import { SafeImage } from '../common/SafeImage';

// Custom Leaflet Markers with sleek minimal floating pins
const createCustomIcon = (emoji: string, color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.18); border: 2px solid white;">${emoji}</div>`,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const iconMap: Record<string, L.DivIcon> = {
  elevator: createCustomIcon('🛗', '#0284c7'),
  metro: createCustomIcon('🚇', '#4f46e5'),
  parking: createCustomIcon('🅿️', '#059669'),
  restroom: createCustomIcon('🚽', '#d97706'),
  medical: createCustomIcon('🏥', '#e11d48'),
  charging: createCustomIcon('⚡', '#eab308'),
  quiet: createCustomIcon('🎧', '#7c3aed'),
  attraction: createCustomIcon('🏛️', '#db2777'),
  hotel: createCustomIcon('🏨', '#0284c7'),
  restaurant: createCustomIcon('🍽️', '#ea580c'),
};

// Map controller helper for zoom & location center
const MapControlsHandler: React.FC<{ zoomAction: 'in' | 'out' | null; resetZoom: () => void }> = ({ zoomAction, resetZoom }) => {
  const map = useMap();
  React.useEffect(() => {
    if (zoomAction === 'in') {
      map.zoomIn();
      resetZoom();
    } else if (zoomAction === 'out') {
      map.zoomOut();
      resetZoom();
    }
  }, [zoomAction, map, resetZoom]);
  return null;
};

export const InteractiveMapView: React.FC = () => {
  const { activeDestination, destinations } = useTrip();
  const destination = activeDestination || destinations[0];

  const [activeLayers, setActiveLayers] = useState<string[]>([
    'elevator', 'metro', 'parking', 'restroom', 'medical', 'charging', 'quiet', 'attraction'
  ]);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [activeSideTab, setActiveSideTab] = useState<'places' | 'details' | 'route' | 'photos'>('places');
  const [zoomAction, setZoomAction] = useState<'in' | 'out' | null>(null);

  const toggleLayer = (type: string) => {
    setActiveLayers(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const points = destination.mapPoints.filter(p => activeLayers.includes(p.type));
  const routeCoordinates: [number, number][] = destination.mapPoints.map(p => [p.lat, p.lng]);

  return (
    <div className="w-full flex flex-col bg-white dark:bg-slate-950 transition-colors">
      
      {/* 1. Compact Header (Max Height ~60px) */}
      <div className="px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 max-h-[70px]">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2 tracking-tight">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Spatial Accessibility Map</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Explore verified accessibility infrastructure for {destination.name}, {destination.country}.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            📍 {destination.name} Center
          </span>
          <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-lg font-bold">
            ✓ {points.length} Verified Nodes
          </span>
        </div>
      </div>

      {/* 2. Compact Horizontal Filters Toolbar (Max Height ~48px) */}
      <div className="px-6 py-2 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-2 overflow-x-auto max-h-[48px] scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
          Layers:
        </span>

        {[
          { id: 'elevator', label: 'Elevators 🛗' },
          { id: 'metro', label: 'Metro 🚇' },
          { id: 'restroom', label: 'Restrooms 🚽' },
          { id: 'charging', label: 'Charging ⚡' },
          { id: 'quiet', label: 'Quiet Zones 🎧' },
          { id: 'medical', label: 'Hospitals 🏥' },
          { id: 'parking', label: 'Parking 🅿️' },
        ].map((layer) => {
          const isActive = activeLayers.includes(layer.id);
          return (
            <button
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg flex-shrink-0 transition-all ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {layer.label}
            </button>
          );
        })}
      </div>

      {/* 3. Interactive Map Section (75-80% Viewport Height) */}
      <div className="relative w-full h-[calc(78vh-115px)] min-h-[580px] bg-slate-100 dark:bg-slate-900 overflow-hidden">
        
        {/* Leaflet Map */}
        <MapContainer
          center={[destination.coordinates.lat, destination.coordinates.lng]}
          zoom={13}
          zoomControl={false}
          className="w-full h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapControlsHandler zoomAction={zoomAction} resetZoom={() => setZoomAction(null)} />

          {/* Step-free path line */}
          {routeCoordinates.length > 1 && (
            <Polyline
              positions={routeCoordinates}
              color="#10b981"
              weight={4}
              dashArray="6, 8"
            />
          )}

          {/* Map Point Markers */}
          {points.map((pt) => {
            const icon = iconMap[pt.type] || iconMap.attraction;
            return (
              <Marker
                key={pt.id}
                position={[pt.lat, pt.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => {
                    setSelectedPoint(pt);
                    setActiveSideTab('details');
                    setIsSidePanelOpen(true);
                  }
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-2 space-y-1.5 max-w-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                      <span>{pt.name}</span>
                      <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] rounded font-extrabold">
                        ✓ Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">{pt.address}</p>
                    <p className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-1.5 rounded">{pt.notes}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* 4. Google Maps / Apple Maps Style Floating Map Controls (Top-Right) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg p-1 flex flex-col space-y-1">
            <button
              onClick={() => setZoomAction('in')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
            <button
              onClick={() => setZoomAction('out')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg p-1">
            <button
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200 transition-colors"
              title="Current Location"
            >
              <Crosshair className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5. Floating Bottom-Left Legend */}
        <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center space-x-3 px-3.5 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span className="text-slate-400 font-extrabold uppercase text-[10px]">Legend:</span>
          <span>🛗 Elevators</span>
          <span>🚇 Metro</span>
          <span>🚽 Restrooms</span>
          <span>⚡ Charging</span>
          <span>🏥 ER Hospitals</span>
        </div>

        {/* 6. Collapsible Side Panel (Floating Apple/Google Maps style) */}
        <div
          className={`absolute top-4 left-4 bottom-4 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 flex flex-col ${
            isSidePanelOpen ? 'w-80 sm:w-96' : 'w-12 overflow-hidden'
          }`}
        >
          {/* Side Panel Toggle Header */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {isSidePanelOpen ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                    Nearby Accessible Infrastructure
                  </span>
                </div>
                <button
                  onClick={() => setIsSidePanelOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                  title="Collapse panel"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsSidePanelOpen(true)}
                className="w-full py-2 flex items-center justify-center text-slate-600 dark:text-slate-300"
                title="Expand panel"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Side Panel Content Tabs */}
          {isSidePanelOpen && (
            <>
              <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500">
                <button
                  onClick={() => setActiveSideTab('places')}
                  className={`flex-1 py-2 text-center transition-colors ${
                    activeSideTab === 'places' ? 'border-b-2 border-emerald-600 text-emerald-600 font-bold' : 'hover:text-slate-800'
                  }`}
                >
                  Places
                </button>
                <button
                  onClick={() => setActiveSideTab('details')}
                  className={`flex-1 py-2 text-center transition-colors ${
                    activeSideTab === 'details' ? 'border-b-2 border-emerald-600 text-emerald-600 font-bold' : 'hover:text-slate-800'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveSideTab('route')}
                  className={`flex-1 py-2 text-center transition-colors ${
                    activeSideTab === 'route' ? 'border-b-2 border-emerald-600 text-emerald-600 font-bold' : 'hover:text-slate-800'
                  }`}
                >
                  Route
                </button>
              </div>

              {/* Side Panel Body List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
                {activeSideTab === 'places' && (
                  <div className="space-y-2">
                    {points.map((pt) => (
                      <div
                        key={pt.id}
                        onClick={() => {
                          setSelectedPoint(pt);
                          setActiveSideTab('details');
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1 ${
                          selectedPoint?.id === pt.id
                            ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                            : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                          <span>{pt.name}</span>
                          <span className="text-[10px] text-emerald-600 font-extrabold uppercase">✓ Verified</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{pt.address}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeSideTab === 'details' && (
                  selectedPoint ? (
                    <div className="space-y-3 p-1">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{selectedPoint.name}</h4>
                        <p className="text-xs text-slate-500">{selectedPoint.address}</p>
                      </div>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs text-slate-700 dark:text-slate-200 font-medium">
                        <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">Accessibility Audit Notes:</strong>
                        {selectedPoint.notes}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 p-4 text-center">Select a pin on the map to inspect details</div>
                  )
                )}

                {activeSideTab === 'route' && (
                  <div className="space-y-2 p-1 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">Continuous Step-Free Trail</span>
                      <p className="text-slate-500">1.8 km continuous flat pavement connected to level SkyTrain stations.</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  );
};
