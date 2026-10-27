import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Server, Database, Users, Activity } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [templates, setTemplates] = useState([
    { id: 't1', name: 'Notice for Arrears of Rent (Transfer of Property Act Sec 106)', state: 'All India / Central', active: true },
    { id: 't2', name: 'Notice for Eviction & Rent Default (Maharashtra Rent Control Act)', state: 'Maharashtra', active: true },
    { id: 't3', name: 'Notice of Tenancy Expiry & Vacant Possession', state: 'All India / Central', active: true },
    { id: 't4', name: 'Security Deposit Refund Demand Notice', state: 'All India / Central', active: true }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard & Template Management</h1>
              <p className="text-sm text-slate-600">Monitor system status, Gemini AI API connection, and legal notice templates.</p>
            </div>
          </div>
        </div>

        {/* System Health Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Gemini AI API Status</p>
              <h3 className="text-lg font-bold text-teal-600 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Connected & Active
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Server className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Database Storage</p>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Supabase PostgreSQL</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Total Active Users</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">1,428</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Templates Management */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Legal Notice Templates</h3>
          <div className="divide-y divide-slate-100">
            {templates.map(t => (
              <div key={t.id} className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <span className="text-xs text-slate-500">Jurisdiction: {t.state}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
