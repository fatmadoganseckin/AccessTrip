export type OrgType =
  | 'charity'
  | 'disability_association'
  | 'ngo'
  | 'care_organization'
  | 'municipality'
  | 'rehabilitation_center'
  | 'accessible_travel_agency'
  | 'hotel_group'
  | 'independent_auditor'
  | 'other';

export type OrgRole =
  | 'owner'
  | 'administrator'
  | 'travel_coordinator'
  | 'case_manager'
  | 'social_worker'
  | 'accessibility_specialist'
  | 'finance_manager'
  | 'volunteer'
  | 'viewer'
  | 'traveller'
  | 'caregiver';

export type PermissionKey =
  | 'travellers.read'
  | 'travellers.create'
  | 'travellers.update'
  | 'cases.read'
  | 'cases.assign'
  | 'cases.approve'
  | 'funding.read'
  | 'funding.approve'
  | 'documents.read_sensitive'
  | 'organization.manage_members'
  | 'accessibility.verify';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  orgType: OrgType;
  registrationNumber?: string;
  charityRegistrationNumber?: string;
  country: string;
  address?: string;
  website?: string;
  contactEmail: string;
  mission?: string;
  verificationStatus: 'verified' | 'partially_verified' | 'self_reported' | 'pending';
  accountPlan: 'Free Charity' | 'Organization Pro' | 'Enterprise Access';
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  profileId: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  role: OrgRole;
  title: string;
  isPrimary: boolean;
}
