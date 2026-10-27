import React from 'react';
import { UserSubscription } from '../types';
import { Settings, X, Shield, Trash2, CheckCircle2 } from 'lucide-react';

interface SettingsModalProps {
  subscription: UserSubscription;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ subscription, onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
            <p className="text-xs text-slate-500">Manage your RentNotice AI subscription and profile.</p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Subscription</span>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">{subscription.planName}</h4>
                <p className="text-xs text-slate-500">Renewal Date: {subscription.renewalDate}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
                {subscription.status}
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data Privacy & Security</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your rental agreement data and tenant particulars are encrypted in transit and at rest. We do not use confidential client documents to train public AI models.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
            >
              Close Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
