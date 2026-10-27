import { LegalReference, NoticeDraft, PropertyRecord, TenantRecord, UserSubscription } from '../types';

export const INITIAL_SUBSCRIPTION: UserSubscription = {
  planId: 'starter',
  planName: 'Starter Plan',
  priceINR: 299,
  noticesLimit: 10,
  noticesUsed: 3,
  renewalDate: '2026-11-27',
  status: 'Active'
};

export const MOCK_LEGAL_REFERENCES: LegalReference[] = [
  {
    id: 'ref-1',
    title: 'Notice to Quit / Termination of Tenancy',
    act: 'Transfer of Property Act, 1882',
    section: 'Section 106',
    jurisdiction: 'Central Law (All India)',
    description: 'Mandates 15 days notice for monthly leases (ending with the month of tenancy) and 6 months notice for agricultural/manufacturing leases, unless contract specifies otherwise.',
    noticePeriod: '15 Days (Monthly Lease)',
    verifiedDate: '2026-01-15',
    source: 'India Code / Supreme Court Precedents'
  },
  {
    id: 'ref-2',
    title: 'Default in Rent & Eviction Grounds',
    act: 'Maharashtra Rent Control Act, 1999',
    section: 'Section 15',
    jurisdiction: 'Maharashtra (Mumbai, Pune, Nagpur, etc.)',
    description: 'Landlord cannot recover possession for non-payment of rent unless a formal demand notice is served and rent remains unpaid for 90 days thereafter.',
    noticePeriod: '90 Days Demand Period',
    verifiedDate: '2026-01-10',
    source: 'Government of Maharashtra / Bombay High Court'
  },
  {
    id: 'ref-3',
    title: 'Eviction on Ground of Default',
    act: 'Delhi Rent Control Act, 1958',
    section: 'Section 14(1)(a)',
    jurisdiction: 'National Capital Territory of Delhi',
    description: 'Tenant in arrears of rent for 2 months must be served a notice of demand. If rent is not paid within 2 months of service, eviction petition is maintainable.',
    noticePeriod: '2 Months',
    verifiedDate: '2026-02-01',
    source: 'Delhi High Court & Legislative Department'
  },
  {
    id: 'ref-4',
    title: 'Compensation for Breach of Contract',
    act: 'Indian Contract Act, 1872',
    section: 'Section 73 & 74',
    jurisdiction: 'Central Law (All India)',
    description: 'Provides for compensation for loss or damage which naturally arose in the usual course of things from breach of rental agreement terms or premature termination.',
    noticePeriod: 'As specified in contract',
    verifiedDate: '2026-01-20',
    source: 'India Code'
  },
  {
    id: 'ref-5',
    title: 'Karnataka Rent Act, 1999',
    act: 'Karnataka Rent Act, 1999',
    section: 'Section 27',
    jurisdiction: 'Karnataka (Bengaluru, Mysuru, etc.)',
    description: 'Governs eviction grounds including non-payment of rent for 2 months, misuse of premises, and bona fide requirement by the landlord.',
    noticePeriod: '2 Months Notice',
    verifiedDate: '2026-01-18',
    source: 'Government of Karnataka'
  }
];

export const MOCK_PROPERTIES: PropertyRecord[] = [
  {
    id: 'prop-1',
    name: 'Sunshine Apartments 402',
    address: 'Flat No. 402, Sunshine Apartments, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053',
    type: 'Residential',
    tenantName: 'Amit Patel'
  },
  {
    id: 'prop-2',
    name: 'Greenwood Commercial Plaza 201',
    address: 'Shop No. 201, Greenwood Plaza, MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    type: 'Commercial',
    tenantName: 'Suresh Rao'
  },
  {
    id: 'prop-3',
    name: 'DLF Phase 3 Independent Builder Floor',
    address: 'House No. 128, Sector 24, DLF Phase 3',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122002',
    type: 'Residential',
    tenantName: 'Neha Sharma'
  }
];

export const MOCK_TENANTS: TenantRecord[] = [
  {
    id: 'ten-1',
    name: 'Amit Patel',
    phone: '+91 98765 43210',
    email: 'amit.patel@example.com',
    propertyId: 'prop-1',
    propertyName: 'Sunshine Apartments 402',
    rentAmount: 35000,
    depositAmount: 100000,
    leaseStart: '2025-01-01',
    leaseEnd: '2025-12-31',
    status: 'Notice Served'
  },
  {
    id: 'ten-2',
    name: 'Suresh Rao',
    phone: '+91 91234 56789',
    email: 'suresh.rao@example.com',
    propertyId: 'prop-2',
    propertyName: 'Greenwood Commercial Plaza 201',
    rentAmount: 75000,
    depositAmount: 300000,
    leaseStart: '2024-06-01',
    leaseEnd: '2027-05-31',
    status: 'Active'
  }
];

export const MOCK_DRAFTS: NoticeDraft[] = [
  {
    id: 'draft-1',
    title: 'Demand for Rent Arrears - Amit Patel',
    noticeType: 'unpaid_rent',
    landlordName: 'Rajesh Sharma',
    landlordAddress: '101, Ocean View, Juhu, Mumbai - 400049',
    tenantName: 'Amit Patel',
    tenantAddress: 'Flat No. 402, Sunshine Apartments, Andheri West, Mumbai - 400053',
    propertyAddress: 'Flat No. 402, Sunshine Apartments, Andheri West, Mumbai - 400053',
    state: 'Maharashtra',
    monthlyRent: 35000,
    amountOverdue: 105000,
    securityDeposit: 100000,
    dueDate: '7th of every month',
    reason: 'Non-payment of rent for July, August, and September 2026.',
    desiredResolution: 'Clear dues of ₹1,05,000 within 15 days.',
    clauses: 'Clause 4 & 7 of Leave and License Agreement',
    responseDays: 15,
    status: 'reviewed',
    createdAt: '2026-10-10',
    updatedAt: '2026-10-12',
    content: {
      subject: "LEGAL NOTICE UNDER SECTION 106 OF THE TRANSFER OF PROPERTY ACT, 1882 FOR DEMAND OF ARREARS OF RENT AND TERMINATION OF TENANCY",
      senderRecipientBlock: `FROM:\nAdvocate Rajesh Verma (Counsel for Landlord)\nChamber No. 12, High Court Chambers, Mumbai\n\nTO:\nMr. Amit Patel\nFlat No. 402, Sunshine Apartments, Andheri West, Mumbai - 400053`,
      factualBackground: `1. That my client, Rajesh Sharma, is the lawful owner and lessor of the residential property bearing address Flat No. 402, Sunshine Apartments, Andheri West, Mumbai - 400053.\n2. That vide Registered Leave and License Agreement dated 01.01.2025, the Demised Premises was licensed to you for a monthly rent of ₹35,000/- payable on or before the 7th day of each calendar month.\n3. That you have defaulted in the payment of rent for July, August, and September 2026, totaling ₹1,05,000/-.`,
      contractualProvisions: `4. That as per Clause 4 of the said agreement, timely payment of monthly rent is an essential condition. Default for over 60 days entitles the Licensor to terminate the agreement.`,
      legalProvisions: `5. That your failure to pay rent constitutes a breach under Section 108(l) of the Transfer of Property Act, 1882 and Section 15 of the Maharashtra Rent Control Act, 1999.`,
      requestedAction: `6. You are hereby called upon to pay ₹1,05,000/- along with interest @ 18% p.a. within 15 days of receipt of this notice.`,
      responseDeadline: `7. If you fail to comply within 15 days, legal proceedings for eviction and recovery will be initiated.`,
      reservationOfRights: `8. This notice is issued without prejudice to all legal rights and remedies.`,
      signatureBlock: `Date: 12-10-2026\nPlace: Mumbai\n\n(Advocate Rajesh Verma)\nCounsel for Landlord`,
      aiReviewFlags: [
        "Verify whether the Leave and License agreement was duly stamped and registered.",
        "Ensure notice is served via Registered Post Acknowledgment Due (RPAD)."
      ]
    }
  },
  {
    id: 'draft-2',
    title: 'Notice of Tenancy Expiry & Vacate Request',
    noticeType: 'tenancy_expiry',
    landlordName: 'Meenakshi Sundaram',
    landlordAddress: '45, Boat Club Road, Chennai - 600028',
    tenantName: 'Karthik Balaji',
    tenantAddress: 'Villa 3, Palm Grove, Adyar, Chennai - 600020',
    propertyAddress: 'Villa 3, Palm Grove, Adyar, Chennai - 600020',
    state: 'Tamil Nadu',
    monthlyRent: 50000,
    amountOverdue: 0,
    securityDeposit: 200000,
    dueDate: '30-11-2026',
    reason: 'Expiry of 11-month lease tenure without renewal option.',
    desiredResolution: 'Handover vacant possession upon lease expiry on 30.11.2026.',
    clauses: 'Clause 2 (Tenancy Period)',
    responseDays: 30,
    status: 'draft',
    createdAt: '2026-10-20',
    updatedAt: '2026-10-20',
    content: {
      subject: "NOTICE OF EXPIRY OF LEASE AND REQUIREMENT OF VACANT POSSESSION",
      senderRecipientBlock: `FROM:\nMeenakshi Sundaram (Landlord)\n\nTO:\nKarthik Balaji (Tenant)`,
      factualBackground: `1. That your lease agreement dated 01.12.2025 for Villa 3, Palm Grove, Adyar, Chennai expires by efflux of time on 30.11.2026.\n2. That the landlord does not intend to renew the lease.`,
      contractualProvisions: `3. That as per Clause 2, the tenancy terminates automatically on 30.11.2026.`,
      legalProvisions: `4. Under Section 111(a) of the Transfer of Property Act, 1882, a lease of immovable property determines by efflux of time limited thereby.`,
      requestedAction: `5. You are required to hand over peaceful possession on or before 30.11.2026.`,
      responseDeadline: `6. Please confirm handing over schedule within 15 days.`,
      reservationOfRights: `7. All rights reserved for claiming mesne profits for unauthorized occupation post expiry.`,
      signatureBlock: `Date: 20-10-2026\n(Meenakshi Sundaram)\nLandlord`,
      aiReviewFlags: ["Confirm no renewal negotiations are ongoing."]
    }
  }
];
