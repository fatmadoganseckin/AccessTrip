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
  severity?: 'info' | 'warning' | 'urgent';
  provider: 'google' | 'email' | 'neon';
}
