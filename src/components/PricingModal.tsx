import React, { useState } from 'react';
import { UserSubscription } from '../types';
import { CheckCircle2, ShieldCheck, X, Sparkles, Loader2 } from 'lucide-react';

interface PricingModalProps {
  currentSubscription: UserSubscription;
  onUpdateSubscription: (plan: { id: 'free' | 'starter' | 'professional' | 'legal_pro', name: string, price: number, limit: number }) => void;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  currentSubscription,
  onUpdateSubscription,
  onClose
}) => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: 'free' | 'starter' | 'professional' | 'legal_pro', name: string, price: number, limit: number) => {
    setLoadingPlan(planId);
    setTimeout(() => {
      onUpdateSubscription({ id: planId, name, price, limit });
      setLoadingPlan(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-10 space-y-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4" /> Razorpay Secured Subscription Plans
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Upgrade Your Legal Drafting Limits</h2>
          <p className="text-sm text-slate-600">Choose the plan that suits your property portfolio and legal notice volume in India.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Free Tier */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-slate-500">Free Tier</span>
              <h3 className="text-3xl font-extrabold text-slate-900">₹0 <span className="text-xs font-normal text-slate-500">/ month</span></h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> 2 Notice Drafts / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Basic Legal References</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> PDF Export</li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan('free', 'Free Tier', 0, 2)}
              disabled={loadingPlan !== null}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
            >
              {currentSubscription.planId === 'free' ? 'Current Plan' : 'Select Free'}
            </button>
          </div>

          {/* Starter Plan */}
          <div className="bg-gradient-to-b from-teal-900 to-slate-900 text-white p-6 rounded-2xl border border-teal-500/50 flex flex-col justify-between shadow-xl relative">
            <span className="absolute -top-3 right-6 bg-teal-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Popular</span>
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-teal-400">Starter Plan</span>
              <h3 className="text-3xl font-extrabold text-white">₹299 <span className="text-xs font-normal text-slate-300">/ month</span></h3>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> 10 Notice Drafts / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> AI Agreement Analyzer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Property & Tenant Records</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> PDF & DOCX Export</li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan('starter', 'Starter Plan', 299, 10)}
              disabled={loadingPlan !== null}
              className="mt-6 w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loadingPlan === 'starter' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{currentSubscription.planId === 'starter' ? 'Current Plan' : 'Upgrade to Starter'}</span>
            </button>
          </div>

          {/* Professional Plan */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-teal-700">Professional</span>
              <h3 className="text-3xl font-extrabold text-slate-900">₹799 <span className="text-xs font-normal text-slate-500">/ month</span></h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Unlimited Notice Drafts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Advanced Legal Research</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Multi-Property Portfolio</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Priority AI Generation</li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan('professional', 'Professional', 799, 999)}
              disabled={loadingPlan !== null}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              {loadingPlan === 'professional' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{currentSubscription.planId === 'professional' ? 'Current Plan' : 'Upgrade to Pro'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
