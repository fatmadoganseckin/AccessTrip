export type CaseStatus =
  | 'draft'
  | 'needs_assessment'
  | 'researching'
  | 'awaiting_traveller'
  | 'awaiting_org_approval'
  | 'awaiting_funding'
  | 'contacting_properties'
  | 'ready_to_book'
  | 'booked'
  | 'travelling'
  | 'completed'
  | 'cancelled';

export interface CaseTask {
  id: string;
  title: string;
  isCompleted: boolean;
  assignedToName: string;
  dueDate: string;
}

export interface SupportCase {
  id: string;
  organizationId: string;
  caseReference: string; // e.g. "CAS-2026-0891"
  travellerId: string;
  travellerName: string;
  travellerAvatar: string;
  assignedCoordinatorName: string;
  destinationName: string;
  proposedStartDate: string;
  proposedEndDate: string;
  purposeOfTravel: string;
  status: CaseStatus;
  estimatedBudget: number;
  fundingSource: string;
  notes: string;
  tasks: CaseTask[];
  createdAt: string;
  updatedAt: string;
}
