import { DisabilityType } from './accessibility';

export interface StructuredAccessibilityReview {
  id: string;
  destinationId: string;
  destinationName: string;
  authorName: string;
  authorDisability: DisabilityType;
  authorAvatar: string;
  date: string;
  rampsAvailable: 'Yes' | 'Partial' | 'No' | 'Not Needed';
  elevatorsWorking: 'Yes' | 'Some Outages' | 'No Elevators' | 'N/A';
  accessibleToiletsUsable: 'Yes - Great' | 'Tight Space' | 'Out of Order' | 'None';
  staffHelpfulnessRating: number; // 1-5
  matchedOnlineDescription: boolean;
  comments: string;
  photos?: string[];
  helpfulCount: number;
  verifiedVisit: boolean;
}
