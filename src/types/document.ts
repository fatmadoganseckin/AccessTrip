export type DocumentClassification = 'public' | 'internal' | 'confidential' | 'restricted';

export interface NeonStorageDocument {
  id: string;
  organizationId: string;
  caseId?: string;
  travellerId?: string;
  originalFilename: string;
  storageKey: string;
  mimeType: string;
  sizeBytes: number;
  classification: DocumentClassification;
  uploadedByName: string;
  createdAt: string;
  signedUrl?: string;
}
