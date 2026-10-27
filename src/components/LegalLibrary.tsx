import React, { useState } from 'react';
import { LegalReference } from '../types';
import { MOCK_LEGAL_REFERENCES } from '../data/mockData';
import { BookOpen, Search, ShieldCheck, Calendar, ExternalLink } from 'lucide-react';

export const LegalLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [references] = useState<LegalReference[]>(MOCK_LEGAL_REFERENCES);

  const filteredReferences = references.filter(ref => 
    ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.act.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Indian Legal Reference Library</h1>
                <p className="text-sm text-slate-600">Verified acts, central statutes, and state tenancy law provisions.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search acts, sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 w-full sm:w-72"
            />
          </div>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReferences.map((ref) => (
            <div key={ref.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    {ref.section} • {ref.act}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{ref.title}</h3>
                </div>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                  {ref.jurisdiction}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{ref.description}</p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Required Notice: {ref.noticePeriod}</span>
                </div>
                <div className="flex items-center gap-1 text-teal-600 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified: {ref.verifiedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
