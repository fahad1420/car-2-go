import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n/i18nContext';
import { api } from '../services/api';
import { Vehicle, Booking } from '../types';
import { Button } from '../components/common/Button';
import {
  Shield,
  TrendingUp,
  Car,
  CalendarCheck,
  Plus,
  Trash2,
  Settings,
  Tag,
  MessageSquare
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate?: (page: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate = () => {} }) => {
  const { user, token } = useAuth();
  const { language } = useI18n();

  const [activeTab, setActiveTab] = useState<'overview' | 'fleet' | 'bookings' | 'promos' | 'inquiries' | 'settings'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);
  const [settingsData, setSettingsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // New vehicle form state
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    brand: '',
    category: 'Luxury',
    tagline: '',
    year: 2025,
    pricePerDay: 3500,
    deposit: 5000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 4,
    doors: 4,
    acceleration: '3.5s (0-100 km/h)',
    horsepower: '550 HP',
    engine: 'Twin-Turbo V8',
    color: 'Onyx Black',
    images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85']
  });

  // Promo code form state
  const [newPromoCode, setNewPromoCode] = useState({
    code: '',
    discountPercent: 15,
    maxDiscount: 1500,
    validUntil: '2027-12-31'
  });

  const fetchData = async () => {
    if (!token) return;
    try {
      const [statsRes, fleetRes, bookingsRes, inquiriesRes, promosRes, settingsRes] = await Promise.all([
        api.get('/admin/stats', token),
        api.get('/vehicles'),
        api.get('/admin/bookings', token),
        api.get('/admin/inquiries', token),
        api.get('/admin/promos', token),
        api.get('/admin/settings', token)
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (fleetRes.success) setVehicles(fleetRes.vehicles);
      if (bookingsRes.success) setBookings(bookingsRes.bookings);
      if (inquiriesRes.success) setInquiries(inquiriesRes.inquiries);
      if (promosRes.success) setPromos(promosRes.promos);
      if (settingsRes.success) setSettingsData(settingsRes.settings);
    } catch (e) {
      console.error('Failed to load admin suite data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Actions
  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    try {
      await api.put(`/admin/bookings/${bookingId}/status`, { status }, token!);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Status update failed');
    }
  };

  const handleToggleVehicleAvailability = async (vehicle: Vehicle) => {
    try {
      await api.put(`/admin/vehicles/${vehicle._id}`, { available: !vehicle.available }, token!);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Update failed');
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!confirm('Remove this luxury vehicle from the fleet collection?')) return;
    try {
      await api.delete(`/admin/vehicles/${vehicleId}`, token!);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/vehicles', newVehicle, token!);
      if (res.success) {
        setShowAddVehicleModal(false);
        fetchData();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to create vehicle');
    }
  };

  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/promos', newPromoCode, token!);
      if (res.success) {
        setNewPromoCode({ code: '', discountPercent: 15, maxDiscount: 1500, validUntil: '2027-12-31' });
        fetchData();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to create promo');
    }
  };

  const handleDeletePromo = async (id: string) => {
    try {
      await api.delete(`/admin/promos/${id}`, token!);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="pt-40 pb-20 text-center">
        <Shield className="w-12 h-12 text-red-600 mx-auto mb-3" />
        <h2 className="text-2xl font-bold">Administrator Access Required</h2>
        <p className="text-xs text-zinc-500 mt-1 font-normal">Please sign in with authorized administrator credentials.</p>
        <Button variant="charcoal" onClick={() => onNavigate('auth')} className="mt-4">
          Sign In as Admin
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-32 pb-24 bg-brand-light min-h-screen text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-brand-charcoal text-brand-lemon">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-label-luxury text-zinc-400">
                SOVEREIGN OPERATIONS
              </span>
              <h1 className="text-3xl font-display font-extrabold uppercase tracking-tight">
                CAR 2 GO Admin Management Suite
              </h1>
            </div>
          </div>

          {/* Admin Navigation Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white border border-zinc-200 shadow-sm">
            {[
              { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-3.5 h-3.5" /> },
              { id: 'fleet', label: `Fleet (${vehicles.length})`, icon: <Car className="w-3.5 h-3.5" /> },
              { id: 'bookings', label: `Bookings (${bookings.length})`, icon: <CalendarCheck className="w-3.5 h-3.5" /> },
              { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: <MessageSquare className="w-3.5 h-3.5" /> },
              { id: 'promos', label: 'Promos', icon: <Tag className="w-3.5 h-3.5" /> },
              { id: 'settings', label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-charcoal text-brand-lemon shadow-sm'
                    : 'text-zinc-600 hover:text-brand-charcoal'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Overview KPIs */}
        {activeTab === 'overview' && stats && (
          <div className="flex flex-col gap-10">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between gap-4">
                <span className="text-xs uppercase font-bold text-zinc-400">Total Gross Revenue</span>
                <span className="text-3xl font-display font-extrabold text-brand-charcoal">
                  {stats.totalRevenue?.toLocaleString()} <span className="text-sm font-normal text-zinc-500">SAR</span>
                </span>
                <span className="text-xs font-semibold text-emerald-600">Active Bookings Included</span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between gap-4">
                <span className="text-xs uppercase font-bold text-zinc-400">Active Rentals</span>
                <span className="text-3xl font-display font-extrabold text-brand-charcoal">
                  {stats.activeRentals} <span className="text-sm font-normal text-zinc-500">Units</span>
                </span>
                <span className="text-xs text-brand-charcoal font-bold">{stats.confirmedBookings} Confirmed Pending Dispatch</span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between gap-4">
                <span className="text-xs uppercase font-bold text-zinc-400">Fleet Utilization</span>
                <span className="text-3xl font-display font-extrabold text-brand-charcoal">
                  {stats.fleetUtilization}%
                </span>
                <span className="text-xs text-zinc-500 font-medium">{stats.availableFleetCount} of {stats.totalFleetCount} Available</span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between gap-4">
                <span className="text-xs uppercase font-bold text-zinc-400">VIP Clientele</span>
                <span className="text-3xl font-display font-extrabold text-brand-charcoal">
                  {stats.totalCustomers}
                </span>
                <span className="text-xs text-zinc-500 font-medium">{stats.unreadInquiries} Unread Inquiries</span>
              </div>
            </div>

            {/* Recent Bookings Quick Table */}
            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm">
              <h3 className="text-lg font-bold uppercase tracking-tight text-brand-charcoal mb-6">
                Recent Bookings Pipeline
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-400 uppercase text-start font-bold">
                      <th className="pb-3 text-start">Ref</th>
                      <th className="pb-3 text-start">Customer</th>
                      <th className="pb-3 text-start">Vehicle</th>
                      <th className="pb-3 text-start">Duration</th>
                      <th className="pb-3 text-start">Amount</th>
                      <th className="pb-3 text-start">Status</th>
                      <th className="pb-3 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b._id} className="hover:bg-zinc-50">
                        <td className="py-3.5 font-bold text-brand-charcoal">{b.bookingReference}</td>
                        <td className="py-3.5 font-medium">{b.customerName}</td>
                        <td className="py-3.5 font-semibold">{b.vehicleName}</td>
                        <td className="py-3.5 font-medium">{b.days} Days</td>
                        <td className="py-3.5 font-bold">{b.totalAmount?.toLocaleString()} SAR</td>
                        <td className="py-3.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-100">
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-end">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b._id!, e.target.value)}
                            className="bg-zinc-100 border border-zinc-300 rounded-lg px-2 py-1 text-[11px] font-bold cursor-pointer"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Fleet Management CRUD */}
        {activeTab === 'fleet' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-display font-extrabold uppercase">Showroom Fleet Management</h3>
              <Button
                variant="lemon"
                size="sm"
                onClick={() => setShowAddVehicleModal(true)}
                icon={<Plus className="w-4 h-4" />}
              >
                Add Luxury Vehicle
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((v) => (
                <div key={v._id} className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <img src={v.images[0]} alt={v.name} className="w-full h-40 object-cover rounded-2xl" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase text-zinc-400 font-semibold">{v.brand}</span>
                      <button
                        onClick={() => handleToggleVehicleAvailability(v)}
                        className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold ${
                          v.available ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {v.available ? 'Available' : 'Unavailable'}
                      </button>
                    </div>
                    <h4 className="text-base font-extrabold font-display uppercase leading-tight">{v.name}</h4>
                    <span className="text-sm font-extrabold text-brand-charcoal">{v.pricePerDay} SAR / day</span>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                    <button
                      onClick={() => handleDeleteVehicle(v._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Full Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm">
            <h3 className="text-xl font-display font-extrabold uppercase mb-6">All Client Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-400 uppercase text-start font-bold">
                    <th className="pb-3 text-start">Reference</th>
                    <th className="pb-3 text-start">Customer Details</th>
                    <th className="pb-3 text-start">Vehicle</th>
                    <th className="pb-3 text-start">Pickup Date / Hub</th>
                    <th className="pb-3 text-start">Total (SAR)</th>
                    <th className="pb-3 text-start">Status</th>
                    <th className="pb-3 text-end">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-zinc-50">
                      <td className="py-4 font-bold text-brand-charcoal">{b.bookingReference}</td>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold">{b.customerName}</span>
                          <span className="text-zinc-400 font-normal">{b.customerPhone}</span>
                        </div>
                      </td>
                      <td className="py-4 font-semibold">{b.vehicleName}</td>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold">{new Date(b.pickupDate).toLocaleDateString()}</span>
                          <span className="text-zinc-400 truncate max-w-[150px] font-normal">{b.pickupLocation}</span>
                        </div>
                      </td>
                      <td className="py-4 font-bold">{b.totalAmount?.toLocaleString()}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-100">
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 text-end">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b._id!, e.target.value)}
                          className="bg-zinc-100 border border-zinc-300 rounded-lg px-2 py-1 text-[11px] font-bold cursor-pointer"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Active">Active</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col gap-6">
            <h3 className="text-xl font-display font-extrabold uppercase">VIP Concierge Inquiries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inquiries.map((inq) => (
                <div key={inq._id} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-brand-charcoal">{inq.name}</span>
                      <span className="text-[10px] text-zinc-400 font-medium">{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">{inq.email} • {inq.phone}</span>
                    <span className="text-xs text-brand-charcoal font-bold">{inq.serviceType}</span>
                    <p className="text-xs text-zinc-600 bg-white p-3 rounded-xl border border-zinc-100 font-normal">{inq.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Promo Manager */}
        {activeTab === 'promos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Create Promo Form */}
            <form onSubmit={handleCreatePromo} className="lg:col-span-5 p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col gap-4">
              <h3 className="text-lg font-bold uppercase text-brand-charcoal">Create Privilege Code</h3>
              <input
                type="text"
                required
                placeholder="Code (e.g. VIP25)"
                value={newPromoCode.code}
                onChange={(e) => setNewPromoCode({ ...newPromoCode, code: e.target.value.toUpperCase() })}
                className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-bold"
              />
              <input
                type="number"
                required
                placeholder="Discount %"
                value={newPromoCode.discountPercent}
                onChange={(e) => setNewPromoCode({ ...newPromoCode, discountPercent: Number(e.target.value) })}
                className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold"
              />
              <input
                type="number"
                required
                placeholder="Max Discount (SAR)"
                value={newPromoCode.maxDiscount}
                onChange={(e) => setNewPromoCode({ ...newPromoCode, maxDiscount: Number(e.target.value) })}
                className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold"
              />
              <Button type="submit" variant="lemon" size="sm">
                Add Promo Code
              </Button>
            </form>

            {/* Existing Promos */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col gap-4">
              <h3 className="text-lg font-bold uppercase text-brand-charcoal">Active Promo Codes</h3>
              <div className="flex flex-col gap-3">
                {promos.map((p) => (
                  <div key={p._id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                    <div className="flex flex-col">
                      <span className="font-bold text-brand-charcoal">{p.code} (-{p.discountPercent}%)</span>
                      <span className="text-zinc-400 font-medium">Max: {p.maxDiscount} SAR • Valid until: {p.validUntil}</span>
                    </div>
                    <button onClick={() => handleDeletePromo(p._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Business Settings */}
        {activeTab === 'settings' && settingsData && (
          <div className="max-w-2xl p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col gap-6">
            <h3 className="text-xl font-display font-extrabold uppercase">Configurable Business Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col gap-1">
                <span className="text-zinc-400 uppercase font-semibold">Company Legal Name</span>
                <span className="font-bold text-brand-charcoal">{settingsData.companyName}</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col gap-1">
                <span className="text-zinc-400 uppercase font-semibold">VAT Rate (KSA)</span>
                <span className="font-bold text-brand-charcoal">{settingsData.taxRate * 100}%</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col gap-1">
                <span className="text-zinc-400 uppercase font-semibold">VIP Hotline</span>
                <span className="font-bold text-brand-charcoal">{settingsData.contactPhone}</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col gap-1">
                <span className="text-zinc-400 uppercase font-semibold">Concierge Email</span>
                <span className="font-bold text-brand-charcoal">{settingsData.conciergeEmail}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Vehicle Modal */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <form onSubmit={handleCreateVehicle} className="w-full max-w-xl p-8 rounded-3xl bg-white max-h-[90vh] overflow-y-auto flex flex-col gap-4">
            <h3 className="text-xl font-bold uppercase text-brand-charcoal">Add Luxury Vehicle to Fleet</h3>
            <input
              type="text"
              required
              placeholder="Vehicle Model Name (e.g. Aston Martin DBX707)"
              value={newVehicle.name}
              onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
              className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold"
            />
            <input
              type="text"
              required
              placeholder="Brand (e.g. Aston Martin)"
              value={newVehicle.brand}
              onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
              className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newVehicle.category}
                onChange={(e) => setNewVehicle({ ...newVehicle, category: e.target.value })}
                className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold"
              >
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
                <option value="Executive">Executive</option>
                <option value="SUV">SUV</option>
              </select>
              <input
                type="number"
                required
                placeholder="Daily Price (SAR)"
                value={newVehicle.pricePerDay}
                onChange={(e) => setNewVehicle({ ...newVehicle, pricePerDay: Number(e.target.value) })}
                className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold"
              />
            </div>
            <input
              type="text"
              placeholder="Image URL"
              value={newVehicle.images[0]}
              onChange={(e) => setNewVehicle({ ...newVehicle, images: [e.target.value] })}
              className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold"
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddVehicleModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="lemon" size="sm">
                Save to Fleet
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
