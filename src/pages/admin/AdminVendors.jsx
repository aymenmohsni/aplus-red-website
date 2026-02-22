import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, Store, Clock, Users, TrendingUp, ChevronDown, ChevronUp, X } from 'lucide-react';
import { mockVendors, mockPendingVendors } from '../../utils/mockData';

const AdminVendors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved' | 'rejected'
  const [pendingVendors, setPendingVendors] = useState(mockPendingVendors);
  const [approvedVendors, setApprovedVendors] = useState(mockVendors);
  const [expandedId, setExpandedId] = useState(null);
  const [rejectModal, setRejectModal] = useState(null); // vendor id
  const [rejectReason, setRejectReason] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null); // detail modal

  const pending = pendingVendors.filter(v => v.status === 'pending');
  const rejected = pendingVendors.filter(v => v.status === 'rejected');

  const handleApprove = (vendor) => {
    setPendingVendors(prev => prev.map(v => v.id === vendor.id ? { ...v, status: 'approved', approvedDate: new Date().toISOString().split('T')[0] } : v));
    setApprovedVendors(prev => [...prev, {
      ...vendor,
      status: 'approved',
      commissionRate: 15,
      totalProducts: 0,
      totalSales: 0,
      pendingPayout: 0,
      approvedDate: new Date().toISOString().split('T')[0],
    }]);
  };

  const handleReject = () => {
    if (!rejectModal) return;
    setPendingVendors(prev => prev.map(v =>
      v.id === rejectModal
        ? { ...v, status: 'rejected', rejectedDate: new Date().toISOString().split('T')[0], rejectionReason: rejectReason || 'Application did not meet requirements.' }
        : v
    ));
    setRejectModal(null);
    setRejectReason('');
  };

  const handleSuspend = (vendorId) => {
    if (window.confirm('Suspend this vendor? They will not be able to sell until reinstated.')) {
      setApprovedVendors(prev => prev.map(v => v.id === vendorId ? { ...v, status: 'suspended' } : v));
    }
  };

  const filter = (list) => list.filter(v =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'pending', label: 'Pending', count: pending.length, color: 'text-yellow-600' },
    { id: 'approved', label: 'Approved', count: approvedVendors.filter(v => v.status === 'approved').length, color: 'text-green-600' },
    { id: 'rejected', label: 'Rejected', count: rejected.length, color: 'text-red-600' },
  ];

  const statusBadge = (status) => {
    const map = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      suspended: 'bg-gray-100 text-gray-700',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Applications', value: pending.length, icon: Clock, bg: 'bg-yellow-50', color: 'text-yellow-600' },
          { label: 'Active Vendors', value: approvedVendors.filter(v => v.status === 'approved').length, icon: Store, bg: 'bg-green-50', color: 'text-green-600' },
          { label: 'Total Vendors', value: approvedVendors.length + pending.length + rejected.length, icon: Users, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Platform Revenue', value: `$${approvedVendors.reduce((s, v) => s + (v.totalSales || 0) * ((v.commissionRate || 15) / 100), 0).toFixed(0)}`, icon: TrendingUp, bg: 'bg-purple-50', color: 'text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-5">
            <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-neutral">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id ? 'bg-white shadow text-neutral' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className={`ml-2 text-xs font-bold ${activeTab === tab.id ? tab.color : 'text-gray-400'}`}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* --- PENDING TAB --- */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {filter(pending).length === 0 && (
            <div className="glass-card p-12 text-center text-gray-400">No pending applications</div>
          )}
          {filter(pending).map(vendor => (
            <div key={vendor.id} className="glass-card overflow-hidden">
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Store className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-neutral text-lg">{vendor.name}</h3>
                        <span className={`badge-status text-xs ${statusBadge(vendor.status)}`}>{vendor.status}</span>
                      </div>
                      <p className="text-sm text-gray-500">{vendor.email}</p>
                      <p className="text-xs text-gray-400 mt-1">Applied: {new Date(vendor.registeredDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedVendor(vendor)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setExpandedId(expandedId === vendor.id ? null : vendor.id)}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {expandedId === vendor.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => { setRejectModal(vendor.id); }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-semibold text-sm transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button
                      onClick={() => handleApprove(vendor)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg font-semibold text-sm transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" /> Approve
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {vendor.categories.map(c => (
                    <span key={c} className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{c}</span>
                  ))}
                </div>
              </div>

              {/* Expandable details */}
              {expandedId === vendor.id && (
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><p className="text-gray-400 text-xs">Business Address</p><p className="font-medium text-neutral">{vendor.businessInfo.address}</p></div>
                    <div><p className="text-gray-400 text-xs">Phone</p><p className="font-medium text-neutral">{vendor.businessInfo.phone}</p></div>
                    <div><p className="text-gray-400 text-xs">Tax ID</p><p className="font-medium text-neutral">{vendor.businessInfo.taxId}</p></div>
                    <div><p className="text-gray-400 text-xs">Years in Business</p><p className="font-medium text-neutral">{vendor.businessInfo.yearsInBusiness} yrs</p></div>
                    {vendor.businessInfo.website && <div><p className="text-gray-400 text-xs">Website</p><p className="font-medium text-primary">{vendor.businessInfo.website}</p></div>}
                    {vendor.contactName && <div><p className="text-gray-400 text-xs">Contact Person</p><p className="font-medium text-neutral">{vendor.contactName}</p></div>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* --- APPROVED TAB --- */}
      {activeTab === 'approved' && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Vendor', 'Categories', 'Commission', 'Total Sales', 'Products', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filter(approvedVendors).map(vendor => (
                  <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                          <Store className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral text-sm">{vendor.name}</p>
                          <p className="text-xs text-gray-400">{vendor.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(vendor.categories || []).slice(0, 2).map(c => (
                          <span key={c} className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-xs">{c}</span>
                        ))}
                        {(vendor.categories || []).length > 2 && <span className="text-xs text-gray-400">+{vendor.categories.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-neutral text-sm">{vendor.commissionRate}%</td>
                    <td className="px-5 py-4 font-semibold text-green-600 text-sm">${(vendor.totalSales || 0).toFixed(2)}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{vendor.totalProducts || 0}</td>
                    <td className="px-5 py-4">
                      <span className={`badge-status text-xs ${statusBadge(vendor.status)}`}>{vendor.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedVendor(vendor)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        {vendor.status === 'approved' && (
                          <button onClick={() => handleSuspend(vendor.id)} className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Suspend">
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filter(approvedVendors).length === 0 && (
            <div className="text-center py-12 text-gray-400">No approved vendors</div>
          )}
        </div>
      )}

      {/* --- REJECTED TAB --- */}
      {activeTab === 'rejected' && (
        <div className="space-y-4">
          {filter(rejected).length === 0 && (
            <div className="glass-card p-12 text-center text-gray-400">No rejected applications</div>
          )}
          {filter(rejected).map(vendor => (
            <div key={vendor.id} className="glass-card p-6 border-l-4 border-red-400">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-neutral">{vendor.name}</h3>
                    <span className="badge-status text-xs bg-red-100 text-red-800">rejected</span>
                  </div>
                  <p className="text-sm text-gray-500">{vendor.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Applied: {new Date(vendor.registeredDate).toLocaleDateString()} ·
                    Rejected: {vendor.rejectedDate ? new Date(vendor.rejectedDate).toLocaleDateString() : 'N/A'}
                  </p>
                  {vendor.rejectionReason && (
                    <p className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                      <strong>Reason:</strong> {vendor.rejectionReason}
                    </p>
                  )}
                </div>
                <button onClick={() => setSelectedVendor(vendor)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---- REJECT MODAL ---- */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
            <h3 className="font-display text-xl text-neutral mb-2">Reject Application</h3>
            <p className="text-sm text-gray-500 mb-4">Optionally provide a reason so the applicant can reapply correctly.</p>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              className="input-medical resize-none mb-4"
              rows={3}
              placeholder="e.g. Tax ID could not be verified. Please resubmit with updated documentation."
            />
            <div className="flex gap-3">
              <button onClick={() => { setRejectModal(null); setRejectReason(''); }} className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold">Cancel</button>
              <button onClick={handleReject} className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">Confirm Reject</button>
            </div>
          </div>
        </div>
      )}

      {/* ---- DETAIL MODAL ---- */}
      {selectedVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 animate-slide-up">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl text-neutral">{selectedVendor.name}</h3>
                <span className={`badge-status text-xs mt-1 ${statusBadge(selectedVendor.status)}`}>{selectedVendor.status}</span>
              </div>
              <button onClick={() => setSelectedVendor(null)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Company', value: selectedVendor.company },
                  { label: 'Contact', value: selectedVendor.contactName || 'N/A' },
                  { label: 'Email', value: selectedVendor.email },
                  { label: 'Phone', value: selectedVendor.businessInfo?.phone },
                  { label: 'Tax ID', value: selectedVendor.businessInfo?.taxId },
                  { label: 'Years in Business', value: `${selectedVendor.businessInfo?.yearsInBusiness} yrs` },
                  { label: 'Address', value: selectedVendor.businessInfo?.address },
                  { label: 'Website', value: selectedVendor.businessInfo?.website || 'N/A' },
                  { label: 'Applied', value: new Date(selectedVendor.registeredDate).toLocaleDateString() },
                  ...(selectedVendor.approvedDate ? [{ label: 'Approved', value: new Date(selectedVendor.approvedDate).toLocaleDateString() }] : []),
                  ...(selectedVendor.commissionRate ? [{ label: 'Commission Rate', value: `${selectedVendor.commissionRate}%` }] : []),
                  ...(selectedVendor.totalSales != null ? [{ label: 'Total Sales', value: `$${selectedVendor.totalSales.toFixed(2)}` }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-sm font-semibold text-neutral">{value}</p>
                  </div>
                ))}
              </div>
              {selectedVendor.categories?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.categories.map(c => (
                      <span key={c} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedVendor.rejectionReason && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-500 mb-1">Rejection Reason</p>
                  <p className="text-sm text-red-700">{selectedVendor.rejectionReason}</p>
                </div>
              )}
            </div>
            <button onClick={() => setSelectedVendor(null)} className="w-full mt-6 btn-medical">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVendors;
