import React from 'react';
import { Scale, FileText, BookOpen, Building2, ShieldAlert, Sparkles, User, CreditCard, Settings, LayoutDashboard } from 'lucide-react';
import { UserSubscription } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  subscription: UserSubscription;
  onOpenPricing: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  subscription,
  onOpenPricing,
  onOpenSettings
}) => {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center shadow-inner">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                RentNotice <span className="text-teal-400 font-extrabold">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 tracking-wider uppercase font-medium">
                Indian Property Legal Assistant
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'dashboard' ? 'bg-slate-800 text-teal-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('wizard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'wizard' ? 'bg-slate-800 text-teal-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              AI Wizard
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'assistant' ? 'bg-slate-800 text-teal-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Agreement Analyzer
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'library' ? 'bg-slate-800 text-teal-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Legal Library
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'properties' ? 'bg-slate-800 text-teal-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Records
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'admin' ? 'bg-slate-800 text-teal-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Admin
            </button>
          </nav>

          {/* Right Actions & Subscription Badge */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenPricing}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-950/80 border border-teal-700/50 text-teal-300 text-xs font-semibold hover:bg-teal-900 transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{subscription.planName}</span>
              <span className="bg-teal-700 text-white px-1.5 py-0.5 rounded-full text-[10px]">
                {subscription.noticesUsed}/{subscription.noticesLimit} used
              </span>
            </button>

            <button
              onClick={() => setActiveTab('landing')}
              className="text-xs text-slate-400 hover:text-white hidden lg:block"
              title="View Landing Page"
            >
              Landing
            </button>

            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white text-xs">
                RS
              </div>
            </div>

          </div>

        </div>
      </div>
      
      {/* Mobile Submenu Bar */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 bg-slate-950 border-t border-slate-800 space-x-2 text-xs">
        <button onClick={() => setActiveTab('dashboard')} className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-teal-600 text-white' : 'text-slate-300'}`}>Dashboard</button>
        <button onClick={() => setActiveTab('wizard')} className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'wizard' ? 'bg-teal-600 text-white' : 'text-slate-300'}`}>AI Wizard</button>
        <button onClick={() => setActiveTab('assistant')} className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'assistant' ? 'bg-teal-600 text-white' : 'text-slate-300'}`}>Analyzer</button>
        <button onClick={() => setActiveTab('library')} className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'library' ? 'bg-teal-600 text-white' : 'text-slate-300'}`}>Library</button>
        <button onClick={() => setActiveTab('properties')} className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'properties' ? 'bg-teal-600 text-white' : 'text-slate-300'}`}>Records</button>
        <button onClick={() => setActiveTab('admin')} className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'admin' ? 'bg-teal-600 text-white' : 'text-slate-300'}`}>Admin</button>
      </div>
    </header>
  );
};
