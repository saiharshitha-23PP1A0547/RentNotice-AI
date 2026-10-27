import React, { useState } from 'react';
import { PropertyRecord, TenantRecord } from '../types';
import { Building2, Users, Plus, Trash2, MapPin, Phone, Mail } from 'lucide-react';

interface PropertiesTenantsProps {
  properties: PropertyRecord[];
  setProperties: React.Dispatch<React.SetStateAction<PropertyRecord[]>>;
  tenants: TenantRecord[];
  setTenants: React.Dispatch<React.SetStateAction<TenantRecord[]>>;
}

export const PropertiesTenants: React.FC<PropertiesTenantsProps> = ({
  properties,
  setProperties,
  tenants,
  setTenants
}) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'tenants'>('properties');
  const [showNewProperty, setShowNewProperty] = useState(false);
  const [showNewTenant, setShowNewTenant] = useState(false);

  // New Property Form State
  const [newPropName, setNewPropName] = useState('');
  const [newPropAddress, setNewPropAddress] = useState('');
  const [newPropCity, setNewPropCity] = useState('');
  const [newPropState, setNewPropState] = useState('Maharashtra');
  const [newPropPincode, setNewPropPincode] = useState('');
  const [newPropType, setNewPropType] = useState<'Residential' | 'Commercial' | 'Industrial'>('Residential');

  // New Tenant Form State
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantPhone, setNewTenantPhone] = useState('');
  const [newTenantEmail, setNewTenantEmail] = useState('');
  const [newTenantRent, setNewTenantRent] = useState(35000);
  const [newTenantDeposit, setNewTenantDeposit] = useState(100000);
  const [newTenantPropertyId, setNewTenantPropertyId] = useState(properties[0]?.id || '');

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropName || !newPropAddress) return;
    const prop: PropertyRecord = {
      id: 'prop-' + Date.now(),
      name: newPropName,
      address: newPropAddress,
      city: newPropCity || 'Mumbai',
      state: newPropState,
      pincode: newPropPincode || '400001',
      type: newPropType
    };
    setProperties(prev => [prop, ...prev]);
    setShowNewProperty(false);
    setNewPropName('');
    setNewPropAddress('');
  };

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantName) return;
    const prop = properties.find(p => p.id === newTenantPropertyId);
    const tenant: TenantRecord = {
      id: 'ten-' + Date.now(),
      name: newTenantName,
      phone: newTenantPhone || '+91 98765 43210',
      email: newTenantEmail || 'tenant@example.com',
      propertyId: newTenantPropertyId,
      propertyName: prop ? prop.name : 'General Property',
      rentAmount: newTenantRent,
      depositAmount: newTenantDeposit,
      leaseStart: '2025-01-01',
      leaseEnd: '2025-12-31',
      status: 'Active'
    };
    setTenants(prev => [tenant, ...prev]);
    setShowNewTenant(false);
    setNewTenantName('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Property & Tenant Records</h1>
            <p className="text-sm text-slate-600">Manage your rental real estate portfolio and active tenant details.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-1 rounded-xl flex">
              <button
                onClick={() => setActiveTab('properties')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${activeTab === 'properties' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                Properties ({properties.length})
              </button>
              <button
                onClick={() => setActiveTab('tenants')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${activeTab === 'tenants' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                Tenants ({tenants.length})
              </button>
            </div>

            {activeTab === 'properties' ? (
              <button
                onClick={() => setShowNewProperty(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Property
              </button>
            ) : (
              <button
                onClick={() => setShowNewTenant(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Tenant
              </button>
            )}
          </div>
        </div>

        {/* Properties List */}
        {activeTab === 'properties' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map(prop => (
              <div key={prop.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-full uppercase">
                    {prop.type}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{prop.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prop.address}, {prop.city}, {prop.state} - {prop.pincode}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Current Tenant:</span>
                  <span className="font-semibold text-slate-800">{prop.tenantName || 'None assigned'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tenants List */}
        {activeTab === 'tenants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tenants.map(tenant => (
              <div key={tenant.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
                      {tenant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{tenant.name}</h3>
                      <span className="text-xs text-teal-600 font-semibold">{tenant.propertyName}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
                    {tenant.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{tenant.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{tenant.email}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">Monthly Rent</span>
                    <span className="font-bold text-slate-900">₹{tenant.rentAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Security Deposit</span>
                    <span className="font-bold text-slate-900">₹{tenant.depositAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Lease End</span>
                    <span className="font-bold text-slate-900">{tenant.leaseEnd}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Property Modal */}
        {showNewProperty && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl max-w-md w-full space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900">Add New Property Record</h3>
              <form onSubmit={handleAddProperty} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Property Name</label>
                  <input
                    type="text"
                    required
                    value={newPropName}
                    onChange={(e) => setNewPropName(e.target.value)}
                    placeholder="e.g. Skyline Heights 301"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={newPropAddress}
                    onChange={(e) => setNewPropAddress(e.target.value)}
                    placeholder="e.g. 45, Linking Road, Bandra West"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={newPropCity}
                      onChange={(e) => setNewPropCity(e.target.value)}
                      placeholder="Mumbai"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">State</label>
                    <select
                      value={newPropState}
                      onChange={(e) => setNewPropState(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 bg-white"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Haryana">Haryana</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowNewProperty(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
                  >
                    Save Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Tenant Modal */}
        {showNewTenant && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl max-w-md w-full space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900">Add New Tenant Record</h3>
              <form onSubmit={handleAddTenant} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Tenant Full Name</label>
                  <input
                    type="text"
                    required
                    value={newTenantName}
                    onChange={(e) => setNewTenantName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={newTenantPhone}
                      onChange={(e) => setNewTenantPhone(e.target.value)}
                      placeholder="+91 98765..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Monthly Rent (₹)</label>
                    <input
                      type="number"
                      value={newTenantRent}
                      onChange={(e) => setNewTenantRent(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowNewTenant(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
                  >
                    Save Tenant
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
