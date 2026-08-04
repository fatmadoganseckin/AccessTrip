export interface NeedsBasedAccessibilityProfile {
  requiresStepFreeRoutes: boolean;
  needsRollInShower: boolean;
  needsShowerChair: boolean;
  needsHoist: boolean;
  needsQuietRoom: boolean;
  usesPowerWheelchair: boolean;
  requiresWheelchairCharging: boolean;
  needsVisualAlerts: boolean;
  travelsWithServiceAnimal: boolean;
  needsCompanionRoom: boolean;
  maxContinuousWalkingMeters: number; // e.g. 300
  maxSlopeGradientPercent: number; // e.g. 5
  dietaryRequirements: string[];
  assistanceNotes: string;
}

export interface Traveller {
  id: string;
  organizationId: string;
  fullName: string;
  preferredName?: string;
  avatarUrl: string;
  dateOfBirth?: string;
  contactEmail?: string;
  contactPhone?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  assignedCaseManagerName?: string;
  consentStatus: boolean;
  accessibilityProfile: NeedsBasedAccessibilityProfile;
  activeCasesCount: number;
}
