export interface ItineraryActivity {
  id: string;
  title: string;
  category: 'attraction' | 'dining' | 'transit' | 'rest_stop' | 'hotel';
  time: string;
  durationMinutes: number;
  locationName: string;
  address: string;
  accessibilityBadges: string[];
  stepFreeAccess: boolean;
  elevatorStatus: 'working' | 'maintenance' | 'n/a';
  restroomsAvailable: boolean;
  walkingDistanceMeters: number;
  elevationGainMeters: number;
  energyExpenditure: 'Low' | 'Moderate' | 'High';
  notes: string;
  lat: number;
  lng: number;
}

export interface ItineraryDay {
  dayNumber: number;
  dateStr: string;
  title: string;
  totalDistanceMeters: number;
  totalElevationGain: number;
  activities: ItineraryActivity[];
}

export interface TripItinerary {
  id: string;
  destinationId: string;
  destinationName: string;
  title: string;
  daysCount: number;
  mobilityFocus: string;
  days: ItineraryDay[];
  createdDate: string;
}
