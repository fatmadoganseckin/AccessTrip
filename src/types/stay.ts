export interface AccessibleStay {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  city: string;
  country: string;
  images: string[];
  rating: number; // e.g. 4.92
  reviewCount: number; // e.g. 128
  pricePerNight: number; // e.g. 132
  totalPriceForStay: number; // e.g. 660
  stayType: 'Apartment' | 'Loft' | 'Villa' | 'Hotel' | 'Townhouse' | 'Resort';
  verifiedBadge: string; // e.g. 'Service animal friendly' | 'Step-free stay' | 'Pet friendly - No pet fee' | 'Accessible hotel'
  hostName: string;
  hostAvatar: string;
  hostBadge: string;
  matchPercentage: number; // e.g. 92
  matchChecklist: {
    passed: string[];
    warnings: string[];
  };
  featureIcons: {
    icon: string;
    label: string;
  }[];
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  accessibilityHighlights: string[];
}
