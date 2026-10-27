import React, { useState } from 'react';
import { NoticeDraft, PropertyRecord, TenantRecord, UserSubscription } from '../types';
import { Sparkles, FileText, Building2, Users, ArrowUpRight, Plus, Download, Edit3, Trash2, CheckCircle2, AlertCircle, Search } from 'lucide-react';

interface DashboardProps {
  drafts: NoticeDraft[];
  properties: PropertyRecord[];
  tenants: TenantRecord[];
  subscription: UserSubscription;
  onNewNotice: () => void;
  onOpenAssistant: () => void;
  onOpenLibrary: () => void;
  onEditDraft: (draft: NoticeDraft) => void;
  onDeleteDraft: (id: string) => void;
  onOpenPricing: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  drafts,
  properties,
  tenants,
  subscription,
  onNewNotice,
  onOpenAssistant,
  onOpenLibrary,
  onEditDraft,
  onDeleteDraft,
  onOpenPricing
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredDrafts = drafts.filter(draft => {
    const matchesSearch = draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || draft.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const reviewedCount = drafts.filter(d => d.status === 'reviewed').length;
  const draftCount = drafts.filter(d => d.status === 'draft').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome & Quick Actions Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Landlord Legal Dashboard
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage your property notices, tenant defaults, and rental agreements with AI assistance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAssistant}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-teal-600" />
              <span>Analyze Agreement</span>
            </button>

            <button
              onClick={onNewNotice}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold shadow-md hover:shadow-teal-500/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Notice Draft</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Notices Drafted</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{drafts.length}</h3>
              <p className="text-xs text-teal-600 font-medium mt-1 flex items-center gap-1">
                <span>{subscription.planName}</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Awaiting Review</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{reviewedCount + draftCount}</h3>
              <p className="text-xs text-amber-600 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Advocate check advised</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Saved Properties</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{properties.length}</h3>
              <p className="text-xs text-slate-500 mt-1">Active locations</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between cursor-pointer hover:border-teal-300 transition-colors" onClick={onOpenPricing}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Monthly Usage</p>
              <h3 className="text-3xl font-extrabold text-teal-600 mt-1">{subscription.noticesUsed} / {subscription.noticesLimit}</h3>
              <p className="text-xs text-slate-500 mt-1">Click to upgrade plan</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Drafts Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Notice Drafts</h3>
              <p className="text-xs text-slate-500">Manage, edit, and export your legal notice drafts.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search drafts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 w-full sm:w-60"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 text-slate-700 font-medium"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="reviewed">Reviewed</option>
                <option value="sent">Sent</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-semibold text-xs border-b border-slate-200">
                  <th className="py-3 px-6">Notice Title & Type</th>
                  <th className="py-3 px-6">Tenant Name</th>
                  <th className="py-3 px-6">Property State</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Last Updated</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredDrafts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                      No matching notice drafts found. Click <button onClick={onNewNotice} className="text-teal-600 font-semibold underline">New Notice Draft</button> to create one.
                    </td>
                  </tr>
                ) : (
                  filteredDrafts.map((draft) => (
                    <tr key={draft.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          <span>{draft.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-normal uppercase">{draft.noticeType.replace('_', ' ')}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-600">{draft.tenantName}</td>
                      <td className="py-4 px-6 text-slate-600 font-medium">{draft.state}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          draft.status === 'reviewed' ? 'bg-teal-50 text-teal-700 border border-teal-200' :
                          draft.status === 'sent' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          draft.status === 'archived' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {draft.status === 'reviewed' && <CheckCircle2 className="w-3 h-3" />}
                          <span className="capitalize">{draft.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">{draft.updatedAt}</td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => onEditDraft(draft)}
                          className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold transition-colors inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit / View</span>
                        </button>
                        <button
                          onClick={() => onDeleteDraft(draft.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete Draft"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
