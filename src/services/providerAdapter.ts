import { NormalizedAccommodation, AccommodationProviderAdapter } from '../types/provider';

export const MOCK_NORMALIZED_ACCOMMODATIONS: NormalizedAccommodation[] = [
  {
    id: 'acc-madrid-01',
    provider: 'access_trip_verified',
    providerPropertyId: 'atv-madrid-101',
    googlePlaceId: 'ChIJgTwrYluipBIRrN1A94P',
    name: 'Gran Vía Accessible Luxury Loft',
    description: 'Design luxury apartment featuring step-free level entrance, automated glass double doors, 95cm wide corridors, and private roll-in wet room.',
    address: 'Calle de la Gran Vía 28',
    city: 'Madrid',
    country: 'Spain',
    coordinates: { lat: 40.4198, lng: -3.7026 },
    propertyType: 'Apartment',
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.95,
    reviewCount: 142,
    pricePerNight: 165,
    totalPriceForStay: 825,
    sourceUrl: 'https://accesstrip.com/properties/madrid-gran-via',
    lastSyncedAt: '2026-08-04T12:00:00Z',
    accessibilityRecord: {
      hasStepFreeEntrance: true,
      entranceStepsCount: 0,
      entranceWidthCm: 98,
      hasAutomaticDoor: true,
      hasElevator: true,
      elevatorWidthCm: 92,
      hasRollInShower: true,
      hasShowerChair: true,
      hasToiletGrabRails: true,
      acceptsServiceAnimals: true,
      serviceAnimalFeeCharged: false,
      hasQuietSensoryRoom: true,
      hasWheelchairCharging: true,
    },
    verification: {
      status: 'verified',
      confidencePercent: 98,
      verifiedDate: '2026-08-01',
      verifiedBy: 'AccessTrip Physical Audit Team',
    }
  },
  {
    id: 'acc-barcelona-02',
    provider: 'booking',
    providerPropertyId: 'booking-bcn-881',
    googlePlaceId: 'ChIJ5TCOcNipuhIRrN2B',
    name: 'W Barcelona Accessible Suite',
    description: 'Iconic beachfront hotel offering oceanfront step-free boardwalk access, zero-threshold elevators, and spacious roll-in showers.',
    address: 'Plaça de la Rosa dels Vents 1',
    city: 'Barcelona',
    country: 'Spain',
    coordinates: { lat: 41.3686, lng: 2.1901 },
    propertyType: 'Hotel',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.88,
    reviewCount: 310,
    pricePerNight: 240,
    totalPriceForStay: 1200,
    sourceUrl: 'https://booking.com/hotel/es/w-barcelona',
    lastSyncedAt: '2026-08-04T15:30:00Z',
    accessibilityRecord: {
      hasStepFreeEntrance: true,
      entranceStepsCount: 0,
      entranceWidthCm: 110,
      hasAutomaticDoor: true,
      hasElevator: true,
      elevatorWidthCm: 100,
      hasRollInShower: true,
      hasShowerChair: true,
      hasToiletGrabRails: true,
      acceptsServiceAnimals: true,
      serviceAnimalFeeCharged: false,
      hasQuietSensoryRoom: true,
      hasWheelchairCharging: true,
    },
    verification: {
      status: 'verified',
      confidencePercent: 95,
      verifiedDate: '2026-07-28',
      verifiedBy: 'Booking.com Demand API + Verified Audit',
    }
  },
  {
    id: 'acc-tokyo-03',
    provider: 'google',
    providerPropertyId: 'google-tokyo-place-99',
    googlePlaceId: 'ChIJgTwrYtokyoBIR',
    name: 'Keio Plaza Hotel Tokyo Inclusive Suite',
    description: 'Shinjuku luxury hotel pioneering barrier-free tourism in Japan with universal design rooms and ceiling hoist systems.',
    address: '2-2-1 Nishi-Shinjuku',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { lat: 35.6895, lng: 139.6917 },
    propertyType: 'Hotel',
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.92,
    reviewCount: 420,
    pricePerNight: 195,
    totalPriceForStay: 975,
    sourceUrl: 'https://maps.google.com/?cid=102938475',
    lastSyncedAt: '2026-08-04T10:00:00Z',
    accessibilityRecord: {
      hasStepFreeEntrance: true,
      entranceStepsCount: 0,
      entranceWidthCm: 105,
      hasAutomaticDoor: true,
      hasElevator: true,
      elevatorWidthCm: 95,
      hasRollInShower: true,
      hasShowerChair: true,
      hasToiletGrabRails: true,
      acceptsServiceAnimals: true,
      serviceAnimalFeeCharged: false,
      hasQuietSensoryRoom: true,
      hasWheelchairCharging: true,
    },
    verification: {
      status: 'verified',
      confidencePercent: 96,
      verifiedDate: '2026-08-02',
      verifiedBy: 'Google Places API + AccessTrip Japan',
    }
  }
];

export class AccessTripProviderAdapter implements AccommodationProviderAdapter {
  async searchAccommodations(query: { destination: string; checkIn?: string; checkOut?: string; guests?: number }): Promise<NormalizedAccommodation[]> {
    if (!query.destination) return MOCK_NORMALIZED_ACCOMMODATIONS;
    const q = query.destination.toLowerCase();
    return MOCK_NORMALIZED_ACCOMMODATIONS.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
    );
  }

  async getAccommodationDetails(id: string): Promise<NormalizedAccommodation | null> {
    return MOCK_NORMALIZED_ACCOMMODATIONS.find(a => a.id === id) || MOCK_NORMALIZED_ACCOMMODATIONS[0];
  }

  async getAccommodationAvailability(id: string, dates: { checkIn: string; checkOut: string }): Promise<boolean> {
    return true;
  }
}

export const providerAdapter = new AccessTripProviderAdapter();
