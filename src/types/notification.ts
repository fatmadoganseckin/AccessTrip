export type NotificationCategory =
  | 'accessibility_update'
  | 'review_flag'
  | 'emergency_sos'
  | 'itinerary_alert'
  | 'price_change';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  locationName?: string;
  severity?: 'info' | 'warning' | 'urgent' | 'critical';
  provider: 'google' | 'email' | 'neon';
}

export interface AccessibilityDisruptionAlert {
  id: string;
  destinationId?: string;
  type?: string;
  title: string;
  locationName: string;
  description?: string;
  message?: string;
  severity: 'info' | 'warning' | 'urgent' | 'critical';
  timestamp: string;
  isRead?: boolean;
  affectsWheelchair?: boolean;
  affectsLowVision?: boolean;
  affectsHearing?: boolean;
  reportedByCount?: number;
  verificationStatus?: 'verified' | 'unverified';
  affectedCoordinates?: { lat: number; lng: number };
}
