export interface PredefinedAccessibilityQuestion {
  id: string;
  question: string;
  category: 'Entrance' | 'Elevator' | 'Bedroom' | 'Bathroom' | 'Service Animals' | 'Charging';
}

export const PREDEFINED_QUESTIONS: PredefinedAccessibilityQuestion[] = [
  { id: 'q1', question: 'What is the exact width of the main entrance doorway in cm?', category: 'Entrance' },
  { id: 'q2', question: 'Are there any steps between reception and the elevator/room?', category: 'Entrance' },
  { id: 'q3', question: 'What are the elevator interior dimensions and door width?', category: 'Elevator' },
  { id: 'q4', question: 'What is the bed height from floor to top of mattress?', category: 'Bedroom' },
  { id: 'q5', question: 'Is there clear wheelchair transfer space of at least 90cm beside the bed?', category: 'Bedroom' },
  { id: 'q6', question: 'Is the shower completely step-free with a roll-in entrance?', category: 'Bathroom' },
  { id: 'q7', question: 'Are grab rails permanently installed beside the toilet and shower?', category: 'Bathroom' },
  { id: 'q8', question: 'Are trained service animals accepted without an extra pet fee?', category: 'Service Animals' },
  { id: 'q9', question: 'Is overnight power wheelchair charging available in the room?', category: 'Charging' },
];

export interface PropertyEnquiry {
  id: string;
  organizationId: string;
  caseId?: string;
  propertyName: string;
  recipientEmail: string;
  subject: string;
  questions: string[];
  status: 'delivered' | 'replied' | 'verified';
  replyContent?: string;
  sentAt: string;
}
