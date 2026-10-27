import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { NoticeWizard } from './components/NoticeWizard';
import { DocumentEditor } from './components/DocumentEditor';
import { DocumentAssistant } from './components/DocumentAssistant';
import { LegalLibrary } from './components/LegalLibrary';
import { PropertiesTenants } from './components/PropertiesTenants';
import { AdminDashboard } from './components/AdminDashboard';
import { PricingModal } from './components/PricingModal';
import { SettingsModal } from './components/SettingsModal';
import { NoticeDraft, PropertyRecord, TenantRecord, UserSubscription } from './types';
import { MOCK_DRAFTS, MOCK_PROPERTIES, MOCK_TENANTS, INITIAL_SUBSCRIPTION } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [drafts, setDrafts] = useState<NoticeDraft[]>(MOCK_DRAFTS);
  const [properties, setProperties] = useState<PropertyRecord[]>(MOCK_PROPERTIES);
  const [tenants, setTenants] = useState<TenantRecord[]>(MOCK_TENANTS);
  const [subscription, setSubscription] = useState<UserSubscription>(INITIAL_SUBSCRIPTION);
  const [selectedDraft, setSelectedDraft] = useState<NoticeDraft | null>(null);
  const [showPricing, setShowPricing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSaveDraft = (updated: NoticeDraft) => {
    setDrafts(prev => prev.map(d => d.id === updated.id ? updated : d));
  };

  const handleDeleteDraft = (id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
    if (selectedDraft?.id === id) {
      setSelectedDraft(null);
    }
  };

  const handleCompleteNewDraft = (newDraft: NoticeDraft) => {
    setDrafts(prev => [newDraft, ...prev]);
    setSubscription(prev => ({ ...prev, noticesUsed: prev.noticesUsed + 1 }));
    setSelectedDraft(newDraft);
    setActiveTab('editor');
  };

  const handleUpdateSubscription = (newPlan: { id: 'free' | 'starter' | 'professional' | 'legal_pro', name: string, price: number, limit: number }) => {
    setSubscription({
      planId: newPlan.id,
      planName: newPlan.name,
      priceINR: newPlan.price,
      noticesLimit: newPlan.limit,
      noticesUsed: subscription.noticesUsed,
      renewalDate: '2026-11-27',
      status: 'Active'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-teal-500 selection:text-white">
      
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        subscription={subscription}
        onOpenPricing={() => setShowPricing(true)}
        onOpenSettings={() => setShowSettings(true)}
      />

      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onStartDrafting={() => setActiveTab('wizard')}
            onOpenPricing={() => setShowPricing(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            drafts={drafts}
            properties={properties}
            tenants={tenants}
            subscription={subscription}
            onNewNotice={() => setActiveTab('wizard')}
            onOpenAssistant={() => setActiveTab('assistant')}
            onOpenLibrary={() => setActiveTab('library')}
            onEditDraft={(draft) => {
              setSelectedDraft(draft);
              setActiveTab('editor');
            }}
            onDeleteDraft={handleDeleteDraft}
            onOpenPricing={() => setShowPricing(true)}
          />
        )}

        {activeTab === 'wizard' && (
          <NoticeWizard
            properties={properties}
            tenants={tenants}
            onCompleteDraft={handleCompleteNewDraft}
            onCancel={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'editor' && selectedDraft && (
          <DocumentEditor
            draft={selectedDraft}
            onSave={handleSaveDraft}
            onBack={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'assistant' && (
          <DocumentAssistant
            onProceedToNoticeWithData={(extracted) => {
              setActiveTab('wizard');
            }}
          />
        )}

        {activeTab === 'library' && <LegalLibrary />}

        {activeTab === 'properties' && (
          <PropertiesTenants
            properties={properties}
            setProperties={setProperties}
            tenants={tenants}
            setTenants={setTenants}
          />
        )}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {showPricing && (
        <PricingModal
          currentSubscription={subscription}
          onUpdateSubscription={handleUpdateSubscription}
          onClose={() => setShowPricing(false)}
        />
      )}

      {showSettings && (
        <SettingsModal
          subscription={subscription}
          onClose={() => setShowSettings(false)}
        />
      )}

    </div>
  );
}
