import React from 'react';
import { Scale, ShieldCheck, Sparkles, FileText, CheckCircle2, ArrowRight, Lock, Award, Clock } from 'lucide-react';

interface LandingPageProps {
  onStartDrafting: () => void;
  onOpenPricing: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDrafting, onOpenPricing }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Powered by Gemini AI & Verified Indian Property Law</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Create Your First Property Notice Draft in <span className="text-teal-400">Minutes.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
              Turn rental details and agreement clauses into structured legal notice drafts for unpaid rent, tenancy termination, deposit return, and eviction requests — with verified sources and review checkpoints.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartDrafting}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-base shadow-lg hover:shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Start Drafting Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenPricing}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-base border border-slate-700 transition-colors"
              >
                View Pricing Plans
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-slate-400">
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Transfer of Property Act 1882</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>State Rent Control Acts</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>PDF & DOCX Export</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>AI Agreement Analyzer</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Prominent Legal Disclaimer Banner */}
      <section className="bg-amber-50 border-y border-amber-200 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-amber-800 text-xs sm:text-sm font-medium text-center">
          <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Legal Disclaimer:</strong> RentNotice AI generates automated drafts for review. It is not a law firm and does not provide formal legal representation. Consult a qualified advocate before sending notices.
          </span>
        </div>
      </section>

      {/* Supported Notice Types */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Supported Notice Types</h2>
            <p className="text-slate-600">Covering all major landlord-tenant disputes across Indian state jurisdictions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Unpaid Rent & Arrears", desc: "Demand overdue rent payments with interest calculations and default notices under state acts.", icon: FileText },
              { title: "Termination of Tenancy", desc: "Issue Section 106 Transfer of Property Act notices for terminating monthly leases.", icon: Clock },
              { title: "Expiry of Tenancy", desc: "Formal notice for vacation of premises upon completion of lease tenure by efflux of time.", icon: Scale },
              { title: "Security Deposit Return", desc: "Demand or settle security deposit deductions with itemized damage statements.", icon: Lock },
              { title: "Tenant Lease Breach", desc: "Address subletting, unauthorized alterations, nuisance, or failure to maintain premises.", icon: ShieldCheck },
              { title: "Property Damage & Bills", desc: "Recover unpaid utility bills (electricity, water) and repair costs for damaged fixtures.", icon: Sparkles }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How RentNotice AI Works</h2>
            <p className="text-slate-600">From raw facts to a court-ready structured legal draft in 3 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center relative">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">1</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Enter Facts or Upload Agreement</h3>
              <p className="text-sm text-slate-600">Provide names, property state, rent dues, and reasons, or upload your existing rental agreement for instant AI extraction.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center relative">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">2</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Legal Structuring & Safety Check</h3>
              <p className="text-sm text-slate-600">Gemini AI synthesizes the draft into 9 formal sections, referencing India Code and State Rent Acts while flagging review checkpoints.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center relative">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">3</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Edit, Review & Export PDF</h3>
              <p className="text-sm text-slate-600">Refine party details in the rich document editor, download clean PDF or DOCX copies, and consult your advocate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 mb-12">Start free with 2 notice drafts per month. Upgrade anytime for unlimited drafting.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 w-full max-w-sm text-left">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Free Tier</span>
              <h3 className="text-2xl font-bold mt-1 mb-4">₹0 <span className="text-sm font-normal text-slate-400">/ month</span></h3>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> 2 Notice Drafts / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Basic Legal References</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> PDF Export</li>
              </ul>
              <button onClick={onStartDrafting} className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm transition-colors">
                Get Started Free
              </button>
            </div>

            <div className="bg-gradient-to-b from-teal-900/50 to-slate-800 p-8 rounded-2xl border border-teal-500/50 w-full max-w-sm text-left relative shadow-xl">
              <span className="absolute -top-3 right-6 bg-teal-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Most Popular</span>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Starter Plan</span>
              <h3 className="text-2xl font-bold mt-1 mb-4">₹299 <span className="text-sm font-normal text-slate-300">/ month</span></h3>
              <ul className="space-y-3 text-sm text-slate-200 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> 10 Notice Drafts / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> AI Agreement Analyzer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Property & Tenant Records</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> PDF & DOCX Export</li>
              </ul>
              <button onClick={onOpenPricing} className="w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-colors shadow-md">
                Upgrade to Starter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-teal-400" />
            <span className="text-white font-bold text-sm">RentNotice AI</span>
            <span>© 2026 All rights reserved. Built for Indian Landlords & Legal Professionals.</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#disclaimer" className="hover:text-white transition-colors">Legal Disclaimer</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
