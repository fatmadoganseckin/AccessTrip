import { Organization, OrganizationMember } from '../types/organization';
import { Traveller } from '../types/traveller';
import { SupportCase } from '../types/case';
import { GrantFundingSource } from '../types/funding';
import { NeonStorageDocument } from '../types/document';
import { PropertyEnquiry } from '../types/enquiry';

export const SEEDED_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-spinal-injuries-01',
    name: 'Spinal Injuries Association Charity',
    slug: 'spinal-injuries-uk',
    logoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=150&q=80',
    orgType: 'charity',
    registrationNumber: 'UK-CHARITY-1092834',
    charityRegistrationNumber: '1092834',
    country: 'United Kingdom',
    address: 'SIA House, 2 London Road, Milton Keynes',
    website: 'https://spinal.co.uk',
    contactEmail: 'coordinators@spinal.co.uk',
    mission: 'Supporting spinal cord injured individuals and their families to travel and live without boundaries.',
    verificationStatus: 'verified',
    accountPlan: 'Enterprise Access',
  },
  {
    id: 'org-accesstrip-audit-02',
    name: 'AccessTrip Global Audit Organization',
    slug: 'accesstrip-audit-hq',
    logoUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=150&q=80',
    orgType: 'independent_auditor',
    registrationNumber: 'US-AUDIT-9921',
    country: 'United States',
    address: '500 Howard Street, San Francisco, CA',
    website: 'https://accesstrip.com/audit',
    contactEmail: 'audits@accesstrip.com',
    mission: 'Conducting physical audits and managing verified accessibility evidence globally.',
    verificationStatus: 'verified',
    accountPlan: 'Enterprise Access',
  },
  {
    id: 'org-caretravel-ngo-03',
    name: 'CareTravel Disability NGO',
    slug: 'caretravel-ngo',
    logoUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=150&q=80',
    orgType: 'ngo',
    registrationNumber: 'EU-NGO-440192',
    country: 'Spain',
    address: 'Passeig de Gràcia 45, Barcelona',
    website: 'https://caretravel.org',
    contactEmail: 'info@caretravel.org',
    mission: 'Organizing group accessible travel for neurodivergent and mobility-impaired youth.',
    verificationStatus: 'verified',
    accountPlan: 'Organization Pro',
  }
];

export const SEEDED_MEMBERS: OrganizationMember[] = [
  {
    id: 'mem-01',
    organizationId: 'org-spinal-injuries-01',
    profileId: 'prof-sarah-jenkins',
    fullName: 'Sarah Jenkins',
    email: 'sarah.j@spinal.co.uk',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    role: 'owner',
    title: 'Lead Travel Coordinator',
    isPrimary: true,
  },
  {
    id: 'mem-02',
    organizationId: 'org-spinal-injuries-01',
    profileId: 'prof-dr-marcus',
    fullName: 'Dr. Marcus Vance',
    email: 'marcus.v@spinal.co.uk',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'accessibility_specialist',
    title: 'Senior Physical Auditor',
    isPrimary: false,
  },
  {
    id: 'mem-03',
    organizationId: 'org-spinal-injuries-01',
    profileId: 'prof-elena-finance',
    fullName: 'Elena Rostova',
    email: 'elena.r@spinal.co.uk',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    role: 'finance_manager',
    title: 'Grants & Budget Manager',
    isPrimary: false,
  }
];

export const SEEDED_TRAVELLERS: Traveller[] = [
  {
    id: 'trv-emma-richardson',
    organizationId: 'org-spinal-injuries-01',
    fullName: 'Emma Richardson',
    preferredName: 'Emma',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dateOfBirth: '1992-04-14',
    contactEmail: 'emma.richardson@example.com',
    contactPhone: '+44 7700 900123',
    emergencyContact: {
      name: 'Arthur Richardson',
      phone: '+44 7700 900999',
      relationship: 'Father',
    },
    assignedCaseManagerName: 'Sarah Jenkins',
    consentStatus: true,
    activeCasesCount: 1,
    accessibilityProfile: {
      requiresStepFreeRoutes: true,
      needsRollInShower: true,
      needsShowerChair: true,
      needsHoist: false,
      needsQuietRoom: false,
      usesPowerWheelchair: true,
      requiresWheelchairCharging: true,
      needsVisualAlerts: false,
      travelsWithServiceAnimal: true,
      needsCompanionRoom: true,
      maxContinuousWalkingMeters: 50,
      maxSlopeGradientPercent: 4,
      dietaryRequirements: ['Gluten-free'],
      assistanceNotes: 'Uses a Quantum Q6 Edge power wheelchair (72cm width). Requires ground floor or dual elevator redundancy.',
    }
  },
  {
    id: 'trv-daniel-kim',
    organizationId: 'org-spinal-injuries-01',
    fullName: 'Daniel Kim',
    preferredName: 'Dan',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    dateOfBirth: '1985-11-20',
    contactEmail: 'daniel.kim@example.com',
    contactPhone: '+1 212 555 0192',
    emergencyContact: {
      name: 'Grace Kim',
      phone: '+1 212 555 0199',
      relationship: 'Spouse',
    },
    assignedCaseManagerName: 'Sarah Jenkins',
    consentStatus: true,
    activeCasesCount: 1,
    accessibilityProfile: {
      requiresStepFreeRoutes: true,
      needsRollInShower: true,
      needsShowerChair: true,
      needsHoist: true,
      needsQuietRoom: true,
      usesPowerWheelchair: false,
      requiresWheelchairCharging: false,
      needsVisualAlerts: false,
      travelsWithServiceAnimal: false,
      needsCompanionRoom: false,
      maxContinuousWalkingMeters: 200,
      maxSlopeGradientPercent: 6,
      dietaryRequirements: [],
      assistanceNotes: 'C4-C5 spinal injury. Requires ceiling tracking hoist in bedroom and roll-in wet room.',
    }
  }
];

export const SEEDED_CASES: SupportCase[] = [
  {
    id: 'case-bcn-2026',
    organizationId: 'org-spinal-injuries-01',
    caseReference: 'CAS-2026-0891',
    travellerId: 'trv-emma-richardson',
    travellerName: 'Emma Richardson',
    travellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    assignedCoordinatorName: 'Sarah Jenkins',
    destinationName: 'Barcelona, Spain',
    proposedStartDate: '2026-09-10',
    proposedEndDate: '2026-09-17',
    purposeOfTravel: 'Attending European Spinal Rehabilitation Conference & Accessible City Exploration',
    status: 'contacting_properties',
    estimatedBudget: 3400,
    fundingSource: 'National Disability Mobility Fund',
    notes: 'Pre-flight assistance arranged at London Gatwick. W Barcelona suite requested for step-free beach access.',
    tasks: [
      { id: 't1', title: 'Verify W Barcelona shower chair stability', isCompleted: true, assignedToName: 'Dr. Marcus Vance', dueDate: '2026-08-01' },
      { id: 't2', title: 'Confirm airport accessible taxi transfer', isCompleted: false, assignedToName: 'Sarah Jenkins', dueDate: '2026-08-10' },
      { id: 't3', title: 'Dispatch hotel questionnaire to front desk', isCompleted: true, assignedToName: 'Sarah Jenkins', dueDate: '2026-08-03' }
    ],
    createdAt: '2026-07-25T10:00:00Z',
    updatedAt: '2026-08-04T16:20:00Z',
  },
  {
    id: 'case-tokyo-2026',
    organizationId: 'org-spinal-injuries-01',
    caseReference: 'CAS-2026-0902',
    travellerId: 'trv-daniel-kim',
    travellerName: 'Daniel Kim',
    travellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    assignedCoordinatorName: 'Sarah Jenkins',
    destinationName: 'Tokyo, Japan',
    proposedStartDate: '2026-10-05',
    proposedEndDate: '2026-10-15',
    purposeOfTravel: 'Para-Athletics Invitational & Accessible Transit Testing',
    status: 'awaiting_funding',
    estimatedBudget: 5200,
    fundingSource: 'Global Care Travel Grant',
    notes: 'Requires Keio Plaza Hotel Tokyo universal suite with hoist installation.',
    tasks: [
      { id: 't4', title: 'Submit grant reimbursement form', isCompleted: false, assignedToName: 'Elena Rostova', dueDate: '2026-08-15' }
    ],
    createdAt: '2026-08-01T09:00:00Z',
    updatedAt: '2026-08-04T11:00:00Z',
  }
];

export const SEEDED_FUNDING: GrantFundingSource[] = [
  {
    id: 'fund-ndmf-50k',
    organizationId: 'org-spinal-injuries-01',
    grantName: 'National Disability Mobility Grant 2026',
    funderName: 'UK Department for Accessible Transport',
    approvedAmount: 50000,
    remainingAmount: 38400,
    currency: 'GBP (£)',
    expirationDate: '2026-12-31',
    spendingCategories: [
      { category: 'Accommodation', allocated: 25000, spent: 7800 },
      { category: 'Transportation', allocated: 12000, spent: 2400 },
      { category: 'Accessibility Equipment', allocated: 8000, spent: 1000 },
      { category: 'Companion Costs', allocated: 5000, spent: 400 },
    ]
  }
];

export const SEEDED_DOCUMENTS: NeonStorageDocument[] = [
  {
    id: 'doc-01',
    organizationId: 'org-spinal-injuries-01',
    caseId: 'case-bcn-2026',
    travellerId: 'trv-emma-richardson',
    originalFilename: 'Passport_Consent_E_Richardson.pdf',
    storageKey: 'neon-storage/org-01/consent_e_richardson.pdf',
    mimeType: 'application/pdf',
    sizeBytes: 1024800,
    classification: 'confidential',
    uploadedByName: 'Sarah Jenkins',
    createdAt: '2026-07-26T11:00:00Z',
    signedUrl: 'https://accesstrip-storage.neon.tech/signed/consent_e_richardson.pdf?token=exp2026',
  },
  {
    id: 'doc-02',
    organizationId: 'org-spinal-injuries-01',
    caseId: 'case-bcn-2026',
    originalFilename: 'W_Barcelona_Physical_Audit_Evidence.pdf',
    storageKey: 'neon-storage/org-01/w_barcelona_audit.pdf',
    mimeType: 'application/pdf',
    sizeBytes: 4500120,
    classification: 'internal',
    uploadedByName: 'Dr. Marcus Vance',
    createdAt: '2026-08-01T14:30:00Z',
    signedUrl: 'https://accesstrip-storage.neon.tech/signed/w_barcelona_audit.pdf?token=exp2026',
  }
];

export const SEEDED_ENQUIRIES: PropertyEnquiry[] = [
  {
    id: 'enq-01',
    organizationId: 'org-spinal-injuries-01',
    caseId: 'case-bcn-2026',
    propertyName: 'W Barcelona Accessible Suite',
    recipientEmail: 'accessibility@wbarcelona.com',
    subject: 'AccessTrip Accessibility Verification: Entrance Width & Roll-In Wet Room',
    questions: [
      'What is the exact width of the main entrance doorway in cm?',
      'Is the shower completely step-free with a roll-in entrance?',
      'Are trained service animals accepted without an extra pet fee?'
    ],
    status: 'replied',
    replyContent: 'Verified by Front Office Director: Entrance width is 110cm with automatic glass doors. Roll-in shower has zero threshold with wall grab rails. Service animals welcome with no fees.',
    sentAt: '2026-08-03T10:15:00Z',
  }
];
