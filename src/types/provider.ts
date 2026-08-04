export type AccommodationProviderType = 'booking' | 'google' | 'access_trip_verified' | 'partner';

export interface NormalizedAccommodation {
  id: string;
  provider: AccommodationProviderType;
  providerPropertyId: string;
  googlePlaceId?: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  propertyType: string;
  heroImage: string;
  images: string[];
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  totalPriceForStay: number;
  sourceUrl?: string;
  lastSyncedAt: string;
  
  // AccessTrip Granular Layer
  accessibilityRecord: {
    hasStepFreeEntrance: boolean;
    entranceStepsCount: number;
    entranceWidthCm: number;
    hasAutomaticDoor: boolean;
    hasElevator: boolean;
    elevatorWidthCm: number;
    hasRollInShower: boolean;
    hasShowerChair: boolean;
    hasToiletGrabRails: boolean;
    acceptsServiceAnimals: boolean;
    serviceAnimalFeeCharged: boolean;
    hasQuietSensoryRoom: boolean;
    hasWheelchairCharging: boolean;
  };
  verification: {
    status: 'verified' | 'partially_verified' | 'self_reported' | 'community_reported' | 'outdated' | 'not_verified';
    confidencePercent: number;
    verifiedDate: string;
    verifiedBy: string;
  };
}

export interface AccommodationProviderAdapter {
  searchAccommodations(query: { destination: string; checkIn?: string; checkOut?: string; guests?: number }): Promise<NormalizedAccommodation[]>;
  getAccommodationDetails(id: string): Promise<NormalizedAccommodation | null>;
  getAccommodationAvailability(id: string, dates: { checkIn: string; checkOut: string }): Promise<boolean>;
}
