export type NoticeType = 
  | 'unpaid_rent'
  | 'termination'
  | 'tenancy_expiry'
  | 'security_deposit'
  | 'tenant_breach'
  | 'vacate_request'
  | 'property_damage';

export interface NoticeContent {
  subject: string;
  senderRecipientBlock: string;
  factualBackground: string;
  contractualProvisions: string;
  legalProvisions: string;
  requestedAction: string;
  responseDeadline: string;
  reservationOfRights: string;
  signatureBlock: string;
  aiReviewFlags?: string[];
}

export interface NoticeDraft {
  id: string;
  title: string;
  noticeType: NoticeType;
  landlordName: string;
  landlordAddress: string;
  tenantName: string;
  tenantAddress: string;
  propertyAddress: string;
  state: string;
  monthlyRent: number;
  amountOverdue: number;
  securityDeposit: number;
  dueDate: string;
  reason: string;
  desiredResolution: string;
  clauses: string;
  responseDays: number;
  status: 'draft' | 'reviewed' | 'sent' | 'archived';
  createdAt: string;
  updatedAt: string;
  content: NoticeContent;
}

export interface PropertyRecord {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  type: 'Residential' | 'Commercial' | 'Industrial';
  tenantName?: string;
}

export interface TenantRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyId: string;
  propertyName: string;
  rentAmount: number;
  depositAmount: number;
  leaseStart: string;
  leaseEnd: string;
  status: 'Active' | 'Notice Served' | 'Vacated';
}

export interface LegalReference {
  id: string;
  title: string;
  act: string;
  section: string;
  jurisdiction: string;
  description: string;
  noticePeriod: string;
  verifiedDate: string;
  source: string;
}

export interface UserSubscription {
  planId: 'free' | 'starter' | 'professional' | 'legal_pro';
  planName: string;
  priceINR: number;
  noticesLimit: number;
  noticesUsed: number;
  renewalDate: string;
  status: 'Active' | 'Trial' | 'Expired';
}

export interface AuditLog {
  id: string;
  action: string;
  timestamp: string;
  details: string;
}
