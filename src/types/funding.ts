export interface GrantFundingSource {
  id: string;
  organizationId: string;
  grantName: string;
  funderName: string;
  approvedAmount: number;
  remainingAmount: number;
  currency: string;
  expirationDate: string;
  spendingCategories: {
    category: 'Accommodation' | 'Transportation' | 'Accessibility Equipment' | 'Companion Costs' | 'Care Support' | 'Emergency Reserve';
    allocated: number;
    spent: number;
  }[];
}

export interface ExpenseItem {
  id: string;
  fundingSourceId: string;
  caseId?: string;
  description: string;
  amount: number;
  category: string;
  submittedBy: string;
  date: string;
  receiptAttached: boolean;
}
