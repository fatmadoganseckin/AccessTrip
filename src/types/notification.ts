export type DisruptionSeverity = 'info' | 'warning' | 'critical';

export interface AccessibilityDisruptionAlert {
  id: string;
  destinationId: string;
  locationName: string;
  title: string;
  message: string;
  type: 'elevator_outage' | 'transit_delay' | 'construction' | 'weather' | 'closure';
  severity: DisruptionSeverity;
  timestamp: string;
  affectsWheelchair: boolean;
  affectsLowVision: boolean;
  affectedCoordinates?: { lat: number; lng: number };
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  provider: 'google' | 'email' | 'supabase';
}
