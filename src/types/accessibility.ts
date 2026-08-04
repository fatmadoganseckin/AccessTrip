export type DisabilityType =
  | 'manual_wheelchair'
  | 'power_wheelchair'
  | 'cane'
  | 'walker'
  | 'blind'
  | 'low_vision'
  | 'hearing_impairment'
  | 'deaf'
  | 'autism'
  | 'adhd'
  | 'sensory_sensitivity'
  | 'elderly_traveler'
  | 'temporary_injury';

export type PreferenceKey =
  | 'elevator_required'
  | 'step_free_access'
  | 'accessible_bathroom'
  | 'quiet_environments'
  | 'low_walking_distance'
  | 'accessible_transportation'
  | 'braille'
  | 'audio_assistance'
  | 'service_animal_support'
  | 'accessible_parking'
  | 'rest_areas'
  | 'medical_facilities_nearby';

export interface UserAccessibilityProfile {
  disabilities: DisabilityType[];
  preferences: PreferenceKey[];
  maxWalkingMeters?: number;
  maxSlopePercent?: number;
  preferredLanguage?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export type HighContrastMode = 'none' | 'contrast-light' | 'contrast-dark' | 'yellow-on-black';

export interface AccessibilitySettings {
  fontScale: number; // 100 to 200 percentage
  highContrast: HighContrastMode;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  screenReaderMode: boolean;
  voiceMode: boolean;
  darkMode: boolean;
}
