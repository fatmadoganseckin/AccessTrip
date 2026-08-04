import { pgTable, uuid, text, timestamp, boolean, integer, numeric, jsonb, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const orgTypeEnum = pgEnum('org_type', [
  'charity',
  'disability_association',
  'ngo',
  'care_organization',
  'municipality',
  'rehabilitation_center',
  'accessible_travel_agency',
  'hotel_group',
  'independent_auditor',
  'other'
]);

export const roleEnum = pgEnum('org_role', [
  'owner',
  'administrator',
  'travel_coordinator',
  'case_manager',
  'social_worker',
  'accessibility_specialist',
  'finance_manager',
  'volunteer',
  'viewer',
  'traveller',
  'caregiver'
]);

export const caseStatusEnum = pgEnum('case_status', [
  'draft',
  'needs_assessment',
  'researching',
  'awaiting_traveller',
  'awaiting_org_approval',
  'awaiting_funding',
  'contacting_properties',
  'ready_to_book',
  'booked',
  'travelling',
  'completed',
  'cancelled'
]);

export const verificationStatusEnum = pgEnum('verification_status', [
  'verified',
  'partially_verified',
  'self_reported',
  'community_reported',
  'outdated',
  'conflicting',
  'not_verified'
]);

export const docClassificationEnum = pgEnum('doc_classification', [
  'public',
  'internal',
  'confidential',
  'restricted'
]);

// 1. User Profiles
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull().unique(),
  email: text('email').notNull(),
  fullName: text('full_name').notNull(),
  avatarUrl: text('avatar_url'),
  preferredLanguage: text('preferred_language').default('en'),
  isSuperAdmin: boolean('is_super_admin').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 2. Organizations
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logoUrl: text('logo_url'),
  orgType: orgTypeEnum('org_type').notNull(),
  registrationNumber: text('registration_number'),
  charityRegistrationNumber: text('charity_registration_number'),
  country: text('country').notNull(),
  address: text('address'),
  website: text('website'),
  contactEmail: text('contact_email').notNull(),
  mission: text('mission'),
  verificationStatus: verificationStatusEnum('verification_status').default('verified'),
  accountPlan: text('account_plan').default('enterprise_access'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 3. Organization Members & Roles
export const organizationMembers = pgTable('organization_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  profileId: uuid('profile_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  role: roleEnum('role').default('travel_coordinator').notNull(),
  title: text('title'),
  isPrimary: boolean('is_primary').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. Permissions & Role-Permissions
export const permissions = pgTable('permissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: text('key').notNull().unique(),
  description: text('description'),
});

export const rolePermissions = pgTable('role_permissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  role: roleEnum('role').notNull(),
  permissionKey: text('permission_key').references(() => permissions.key, { onDelete: 'cascade' }).notNull(),
});

// 5. Travellers
export const travellers = pgTable('travellers', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  fullName: text('full_name').notNull(),
  preferredName: text('preferred_name'),
  avatarUrl: text('avatar_url'),
  dateOfBirth: text('date_of_birth'),
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  emergencyContactName: text('emergency_contact_name'),
  emergencyContactPhone: text('emergency_contact_phone'),
  emergencyContactRelation: text('emergency_contact_relation'),
  assignedCaseManagerId: uuid('assigned_case_manager_id').references(() => profiles.id),
  consentStatus: boolean('consent_status').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 6. Traveller Accessibility Profiles (Needs-based)
export const travellerAccessibilityProfiles = pgTable('traveller_accessibility_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  travellerId: uuid('traveller_id').references(() => travellers.id, { onDelete: 'cascade' }).notNull().unique(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  requiresStepFreeRoutes: boolean('requires_step_free_routes').default(true),
  needsRollInShower: boolean('needs_roll_in_shower').default(true),
  needsShowerChair: boolean('needs_shower_chair').default(true),
  needsHoist: boolean('needs_hoist').default(false),
  needsQuietRoom: boolean('needs_quiet_room').default(false),
  usesPowerWheelchair: boolean('uses_power_wheelchair').default(true),
  requiresWheelchairCharging: boolean('requires_wheelchair_charging').default(true),
  needsVisualAlerts: boolean('needs_visual_alerts').default(false),
  travelsWithServiceAnimal: boolean('travels_with_service_animal').default(false),
  needsCompanionRoom: boolean('needs_companion_room').default(false),
  maxContinuousWalkingMeters: integer('max_continuous_walking_meters').default(300),
  maxSlopeGradientPercent: integer('max_slope_gradient_percent').default(5),
  dietaryRequirements: jsonb('dietary_requirements'),
  assistanceNotes: text('assistance_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 7. Cases
export const cases = pgTable('cases', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  caseReference: text('case_reference').notNull().unique(),
  travellerId: uuid('traveller_id').references(() => travellers.id, { onDelete: 'cascade' }).notNull(),
  assignedCoordinatorId: uuid('assigned_coordinator_id').references(() => profiles.id),
  destinationName: text('destination_name').notNull(),
  proposedStartDate: text('proposed_start_date'),
  proposedEndDate: text('proposed_end_date'),
  purposeOfTravel: text('purpose_of_travel'),
  status: caseStatusEnum('status').default('researching').notNull(),
  estimatedBudget: numeric('estimated_budget', { precision: 10, scale: 2 }),
  fundingSource: text('funding_source'),
  notes: text('notes'),
  createdBy: uuid('created_by').references(() => profiles.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 8. Case Tasks
export const caseTasks = pgTable('case_tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').references(() => cases.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  title: text('title').notNull(),
  isCompleted: boolean('is_completed').default(false),
  assignedToId: uuid('assigned_to_id').references(() => profiles.id),
  dueDate: text('due_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 9. Accommodation Properties (Normalized internal model)
export const accommodationProperties = pgTable('accommodation_properties', {
  id: uuid('id').primaryKey().defaultRandom(),
  provider: text('provider').default('access_trip_verified').notNull(), // booking | google | access_trip_verified
  providerPropertyId: text('provider_property_id').notNull(),
  googlePlaceId: text('google_place_id'),
  name: text('name').notNull(),
  description: text('description'),
  address: text('address').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
  latitude: numeric('latitude', { precision: 10, scale: 6 }).notNull(),
  longitude: numeric('longitude', { precision: 10, scale: 6 }).notNull(),
  propertyType: text('property_type').default('Hotel'),
  heroImage: text('hero_image'),
  images: jsonb('images'),
  rating: numeric('rating', { precision: 3, scale: 2 }),
  reviewCount: integer('review_count'),
  pricePerNight: numeric('price_per_night', { precision: 10, scale: 2 }),
  verificationStatus: verificationStatusEnum('verification_status').default('verified'),
  lastSyncedAt: timestamp('last_synced_at').defaultNow().notNull(),
});

// 10. Property Accessibility Features (Granular AccessTrip layer)
export const propertyAccessibilityFeatures = pgTable('property_accessibility_features', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').references(() => accommodationProperties.id, { onDelete: 'cascade' }).notNull(),
  hasStepFreeEntrance: boolean('has_step_free_entrance').default(true),
  entranceStepsCount: integer('entrance_steps_count').default(0),
  entranceWidthCm: integer('entrance_width_cm').default(95),
  hasAutomaticDoor: boolean('has_automatic_door').default(true),
  hasElevator: boolean('has_elevator').default(true),
  elevatorWidthCm: integer('elevator_width_cm').default(90),
  hasRollInShower: boolean('has_roll_in_shower').default(true),
  hasShowerChair: boolean('has_shower_chair').default(true),
  hasToiletGrabRails: boolean('has_toilet_grab_rails').default(true),
  acceptsServiceAnimals: boolean('accepts_service_animals').default(true),
  serviceAnimalFeeCharged: boolean('service_animal_fee_charged').default(false),
  hasQuietSensoryRoom: boolean('has_quiet_sensory_room').default(true),
  hasWheelchairCharging: boolean('has_wheelchair_charging').default(true),
  verificationConfidencePercent: integer('verification_confidence_percent').default(95),
  verifiedDate: text('verified_date').default('2026-08-04'),
});

// 11. Property Enquiries (Hotel Questionnaire Email Engine)
export const propertyEnquiries = pgTable('property_enquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  caseId: uuid('case_id').references(() => cases.id, { onDelete: 'cascade' }),
  propertyId: uuid('property_id').references(() => accommodationProperties.id, { onDelete: 'cascade' }).notNull(),
  senderProfileId: uuid('sender_profile_id').references(() => profiles.id).notNull(),
  recipientEmail: text('recipient_email').notNull(),
  subject: text('subject').notNull(),
  questionsAsked: jsonb('questions_asked').notNull(),
  status: text('status').default('delivered').notNull(), // delivered | replied | verified
  replyContent: text('reply_content'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 12. Trip Plans & Itineraries
export const tripPlans = pgTable('trip_plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  caseId: uuid('case_id').references(() => cases.id, { onDelete: 'cascade' }),
  travellerId: uuid('traveller_id').references(() => travellers.id).notNull(),
  title: text('title').notNull(),
  destinationName: text('destination_name').notNull(),
  startDate: text('start_date'),
  endDate: text('end_date'),
  totalDistanceMeters: integer('total_distance_meters').default(0),
  totalElevationGainMeters: integer('total_elevation_gain_meters').default(0),
  createdBy: uuid('created_by').references(() => profiles.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 13. Funding Sources & Grants
export const fundingSources = pgTable('funding_sources', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  grantName: text('grant_name').notNull(),
  funderName: text('funder_name').notNull(),
  approvedAmount: numeric('approved_amount', { precision: 10, scale: 2 }).notNull(),
  remainingAmount: numeric('remaining_amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD'),
  expirationDate: text('expiration_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 14. Documents (Neon Object Storage metadata)
export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  caseId: uuid('case_id').references(() => cases.id),
  travellerId: uuid('traveller_id').references(() => travellers.id),
  originalFilename: text('original_filename').notNull(),
  storageKey: text('storage_key').notNull(),
  mimeType: text('mime_type').notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  classification: docClassificationEnum('classification').default('confidential').notNull(),
  uploadedById: uuid('uploaded_by_id').references(() => profiles.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 15. Audit Logs
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  actorUserId: text('actor_user_id').notNull(),
  action: text('action').notNull(), // e.g. travellers.read_sensitive, funding.approve
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
