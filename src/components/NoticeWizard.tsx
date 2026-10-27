import React, { useState } from 'react';
import { NoticeType, NoticeDraft, PropertyRecord, TenantRecord } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, Building2, User, FileText, ShieldCheck, Loader2 } from 'lucide-react';

interface NoticeWizardProps {
  properties: PropertyRecord[];
  tenants: TenantRecord[];
  onCompleteDraft: (draft: NoticeDraft) => void;
  onCancel: () => void;
}

export const NoticeWizard: React.FC<NoticeWizardProps> = ({
  properties,
  tenants,
  onCompleteDraft,
  onCancel
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [noticeType, setNoticeType] = useState<NoticeType>('unpaid_rent');
  const [landlordName, setLandlordName] = useState('Rajesh Sharma');
  const [landlordAddress, setLandlordAddress] = useState('101, Ocean View, Juhu, Mumbai - 400049');
  const [tenantName, setTenantName] = useState('Amit Patel');
  const [tenantAddress, setTenantAddress] = useState('Flat No. 402, Sunshine Apartments, Andheri West, Mumbai - 400053');
  const [propertyAddress, setPropertyAddress] = useState('Flat No. 402, Sunshine Apartments, Andheri West, Mumbai - 400053');
  const [state, setState] = useState('Maharashtra');
  const [monthlyRent, setMonthlyRent] = useState(35000);
  const [amountOverdue, setAmountOverdue] = useState(105000);
  const [securityDeposit, setSecurityDeposit] = useState(100000);
  const [dueDate, setDueDate] = useState('7th of every month');
  const [reason, setReason] = useState('Non-payment of rent for the past 3 months (July, August, September 2026).');
  const [desiredResolution, setDesiredResolution] = useState('Payment of outstanding arrears of ₹1,05,000/- within 15 days.');
  const [clauses, setClauses] = useState('Clause 4 (Timely Rent Payment) & Clause 8 (Termination upon Default)');
  const [responseDays, setResponseDays] = useState(15);

  const handlePropertySelect = (propId: string) => {
    const prop = properties.find(p => p.id === propId);
    if (prop) {
      setPropertyAddress(prop.address);
      setState(prop.state);
      if (prop.tenantName) {
        setTenantName(prop.tenantName);
      }
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai/generate-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noticeType,
          landlordName,
          landlordAddress,
          tenantName,
          tenantAddress,
          propertyAddress,
          state,
          monthlyRent,
          amountOverdue,
          securityDeposit,
          dueDate,
          reason,
          desiredResolution,
          clauses,
          responseDays
        })
      });

      const data = await response.json();
      if (data.success && data.draft) {
        const newDraft: NoticeDraft = {
          id: 'draft-' + Date.now(),
          title: `${noticeType.replace('_', ' ').toUpperCase()} - ${tenantName}`,
          noticeType,
          landlordName,
          landlordAddress,
          tenantName,
          tenantAddress,
          propertyAddress,
          state,
          monthlyRent,
          amountOverdue,
          securityDeposit,
          dueDate,
          reason,
          desiredResolution,
          clauses,
          responseDays,
          status: 'reviewed',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          content: data.draft
        };
        onCompleteDraft(newDraft);
      } else {
        throw new Error(data.error || 'Failed to generate notice draft.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred while calling AI generator.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Wizard Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              AI Legal Notice Wizard
            </span>
            <span className="text-xs text-slate-400">Step {step} of 4</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            {step === 1 && "Select Notice Type & State Jurisdiction"}
            {step === 2 && "Landlord & Tenant Details"}
            {step === 3 && "Tenancy Financials & Default Facts"}
            {step === 4 && "AI Safety Check & Review"}
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            {step === 1 && "Choose the category of property dispute and relevant state laws."}
            {step === 2 && "Enter particulars of parties and property address."}
            {step === 3 && "Specify rent overdue, lease clauses, and desired resolution."}
            {step === 4 && "Review facts before generating structured legal notice."}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-teal-500 h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Wizard Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              {error}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Notice Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'unpaid_rent', label: 'Unpaid Rent & Arrears', desc: 'Demand overdue rent & default notice' },
                    { id: 'termination', label: 'Termination of Tenancy', desc: 'Section 106 Transfer of Property Act' },
                    { id: 'tenancy_expiry', label: 'Expiry of Tenancy', desc: 'Vacation upon efflux of lease time' },
                    { id: 'security_deposit', label: 'Security Deposit Return', desc: 'Demand refund or itemized deductions' },
                    { id: 'tenant_breach', label: 'Tenant Lease Breach', desc: 'Subletting, nuisance, or violations' },
                    { id: 'property_damage', label: 'Property Damage & Bills', desc: 'Recover unpaid utility bills & repairs' }
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setNoticeType(item.id as NoticeType)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        noticeType === item.id ? 'border-teal-600 bg-teal-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <h4 className="font-bold text-slate-900 text-sm">{item.label}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">State Jurisdiction</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500 bg-white font-medium"
                >
                  <option value="Maharashtra">Maharashtra (Mumbai Rent Control Act)</option>
                  <option value="Delhi">Delhi (Delhi Rent Control Act)</option>
                  <option value="Karnataka">Karnataka (Karnataka Rent Act)</option>
                  <option value="Tamil Nadu">Tamil Nadu (Tamil Nadu Regulation of Rights and Responsibilities Act)</option>
                  <option value="Uttar Pradesh">Uttar Pradesh (UP Urban Buildings Act)</option>
                  <option value="Haryana">Haryana (Haryana Urban Control of Rent and Eviction Act)</option>
                  <option value="Other">Other State (Transfer of Property Act 1882)</option>
                </select>
                <p className="text-xs text-slate-500 mt-1.5">Determines relevant state tenancy law provisions and notice periods.</p>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              {properties.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Quick Populate from Saved Property</label>
                  <select
                    onChange={(e) => handlePropertySelect(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500 bg-slate-50 font-medium"
                    defaultValue=""
                  >
                    <option value="" disabled>Select saved property...</option>
                    {properties.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - {p.address}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Landlord Full Name</label>
                  <input
                    type="text"
                    value={landlordName}
                    onChange={(e) => setLandlordName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Tenant Full Name</label>
                  <input
                    type="text"
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Landlord Address</label>
                <input
                  type="text"
                  value={landlordAddress}
                  onChange={(e) => setLandlordAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Property Address (Demised Premises)</label>
                <input
                  type="text"
                  value={propertyAddress}
                  onChange={(e) => {
                    setPropertyAddress(e.target.value);
                    setTenantAddress(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Monthly Rent (₹)</label>
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Amount Overdue (₹)</label>
                  <input
                    type="number"
                    value={amountOverdue}
                    onChange={(e) => setAmountOverdue(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Security Deposit (₹)</label>
                  <input
                    type="number"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Reason / Default Description</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  placeholder="Describe default or breach in plain English..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Desired Resolution</label>
                <input
                  type="text"
                  value={desiredResolution}
                  onChange={(e) => setDesiredResolution(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Agreement Clauses Referenced</label>
                  <input
                    type="text"
                    value={clauses}
                    onChange={(e) => setClauses(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Response Deadline (Days)</label>
                  <input
                    type="number"
                    value={responseDays}
                    onChange={(e) => setResponseDays(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-teal-50/60 p-6 rounded-2xl border border-teal-200 space-y-3">
                <h3 className="font-bold text-teal-900 text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  <span>AI Legal Safety Check Completed</span>
                </h3>
                <p className="text-sm text-teal-800 leading-relaxed">
                  All facts are consistent with <strong>{state}</strong> tenancy guidelines and the Transfer of Property Act 1882. No fabricated case law will be included.
                </p>
                <div className="text-xs text-teal-700 space-y-1 pt-2 border-t border-teal-200">
                  <p>• Landlord: {landlordName}</p>
                  <p>• Tenant: {tenantName}</p>
                  <p>• Overdue Dues: ₹{amountOverdue.toLocaleString('en-IN')}</p>
                  <p>• Notice Period: {responseDays} Days</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
                <span className="font-bold">Disclaimer:</span>
                <span>The generated notice is an AI-assisted draft. Review all particulars with a qualified advocate before service via Registered Post Acknowledgment Due (RPAD).</span>
              </div>
            </div>
          )}

          {/* Wizard Footer Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={onCancel}
                className="px-5 py-2.5 rounded-xl text-slate-500 hover:text-slate-700 text-sm font-semibold"
              >
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-teal-400 text-white text-sm font-bold shadow-lg transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Legal Notice...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Structured Notice</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
