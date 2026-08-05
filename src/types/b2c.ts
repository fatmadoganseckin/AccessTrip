export interface AccessibilityTagOption {
  id: string;
  label: string;
  icon: string;
  category: 'mobility' | 'sensory' | 'service_animal' | 'walking';
}

export const ACCESSIBILITY_PROFILE_TAGS: AccessibilityTagOption[] = [
  { id: 'wheelchair', label: 'I use a wheelchair', icon: '♿', category: 'mobility' },
  { id: 'service_animal', label: 'I travel with a service animal', icon: '🐕‍🦺', category: 'service_animal' },
  { id: 'quiet_environment', label: 'I prefer quiet environments', icon: '🎧', category: 'sensory' },
  { id: 'elevator_access', label: 'I need elevator access', icon: '🛗', category: 'mobility' },
  { id: 'roll_in_shower', label: 'I need a roll-in shower', icon: '🚿', category: 'mobility' },
  { id: 'limited_walking', label: 'I have limited walking distance (<300m)', icon: '🚶‍♂️', category: 'walking' },
];

export interface VerifiedCommunityReport {
  id: string;
  propertyName: string;
  locationName: string;
  verifiedDate: string;
  verifiedBy: string;
  avatarUrl: string;
  photos: string[];
  findings: {
    rampCondition: string;
    elevatorStatus: string;
    showerAccess: string;
    doorWidthCm: number;
    serviceAnimalExperience: string;
  };
  upvotesCount: number;
}

export interface AccessibleExperience {
  id: string;
  title: string;
  city: string;
  country: string;
  heroImage: string;
  duration: string;
  pricePerPerson: number;
  accessibilityHighlights: string[];
  rating: number;
  reviewCount: number;
}
