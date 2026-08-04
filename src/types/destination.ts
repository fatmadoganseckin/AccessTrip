import { PreferenceKey } from './accessibility';

export interface AccessibilityScoreBreakdown {
  overall: number; // 0 - 100
  transportation: number;
  accommodation: number;
  restaurant: number;
  attraction: number;
  medicalSupport: number;
  sidewalkQuality: number; // 0 - 100
  elevatorAvailability: number; // 0 - 100
  restroomAvailability: number; // 0 - 100
}

export interface NearbyHospital {
  name: string;
  distanceKm: number;
  phone: string;
  hasWheelchairER: boolean;
  address: string;
  lat: number;
  lng: number;
}

export interface MapPoint {
  id: string;
  name: string;
  type: 'elevator' | 'metro' | 'parking' | 'restroom' | 'medical' | 'charging' | 'quiet' | 'attraction' | 'hotel' | 'restaurant';
  lat: number;
  lng: number;
  address: string;
  isAccessible: boolean;
  notes: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  scores: AccessibilityScoreBreakdown;
  features: {
    serviceAnimalFriendly: boolean;
    quietAreasAvailable: boolean;
    brailleSignage: boolean;
    audioGuidesAvailable: boolean;
    tactilePaving: boolean;
    chargingStationsCount: number;
  };
  climate: 'Mediterranean' | 'Temperate' | 'Subtropical' | 'Oceanic' | 'Alpine';
  budget: '$' | '$$' | '$$$' | '$$$$';
  walkingDifficulty: 'Easy (Flat)' | 'Moderate (Mild Slopes)' | 'Challenging (Steep)';
  crowdLevel: 'Low' | 'Moderate' | 'High';
  safetyRating: number; // 1-5
  weather: {
    tempC: number;
    condition: string;
    humidity: number;
  };
  airQualityIndex: {
    score: number; // 1 (Good) to 5 (Hazardous)
    label: string;
  };
  crowdPredictionToday: { time: string; level: number }[]; // 24h timeline
  emergencyContacts: {
    medical: string;
    police: string;
    accessibleTaxi: string;
    embassy: string;
  };
  nearbyHospitals: NearbyHospital[];
  mapPoints: MapPoint[];
  matchedPreferences: PreferenceKey[];
  verifiedStatus: boolean;
  lastUpdated: string;
  aiSummary: string;
}
