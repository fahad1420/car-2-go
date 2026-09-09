import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n/i18nContext';
import { api } from '../services/api';
import { Booking } from '../types';
import { Button } from '../components/common/Button';
import {
  Calendar,
  QrCode
} from 'lucide-react';

interface AccountPageProps {
  onNavigate?: (page: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate = () => {} }) => {
  const { user, token, updateProfile } = useAuth();
  const { language } = useI18n();
  const isArabic = language === 'ar';

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');

  // Profile Form States
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [idNumber, setIdNumber] = useState(user?.idNumber || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileMsg, setProfileMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  const fetchBookings = async () => {
    if (!token) return;
    try {
      const res = await api.get('/bookings/my-bookings', token);
      if (res.success && res.bookings) {
        setBookings(res.bookings);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm(isArabic ? 'هل أنت متأكد من إلغاء هذا الحجز؟' : 'Are you sure you want to cancel this booking?')) return;
    try {
      const res = await api.post(`/bookings/${bookingId}/cancel`, { reason: 'Customer requested cancellation via portal' }, token!);
      if (res.success) {
        fetchBookings();
      }
    } catch (err: any) {
      alert(err.message || 'Cancellation failed');
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    const updates: any = { name, phone, idNumber };
    if (newPassword) {
      updates.currentPassword = currentPassword;
      updates.newPassword = newPassword;
    }
    const res = await updateProfile(updates);
    if (res.success) {
      setProfileMsg({ text: 'Profile updated successfully.' });
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setProfileMsg({ text: res.message || 'Failed to update profile.', isError: true });
    }
  };

  if (!user) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-bold">Please sign in to access your portal.</h2>
        <Button variant="lemon" onClick={() => onNavigate('auth')} className="mt-4">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* User Greeting Bar */}
        <div className="p-8 rounded-3xl bg-brand-charcoal text-white flex flex-col md:flex-row items-center justify-between gap-6 mb-10 shadow-xl">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=18181b`}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-brand-lemon object-cover"
            />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-label-luxury text-brand-lemon font-bold">
                VIP CLIENT ACCOUNT
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight">
                {user.name}
              </h1>
              <span className="text-xs text-zinc-400 font-medium">{user.email}</span>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-2 p-1.5 rounded-2xl bg-white/10 border border-white/10">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs uppercase font-bold transition-all ${
                activeTab === 'bookings' ? 'bg-brand-lemon text-brand-charcoal' : 'text-zinc-300 hover:text-white'
              }`}
            >
              {isArabic ? 'حجوزاتي' : 'My Bookings'} ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-xl text-xs uppercase font-bold transition-all ${
                activeTab === 'profile' ? 'bg-brand-lemon text-brand-charcoal' : 'text-zinc-300 hover:text-white'
              }`}
            >
              {isArabic ? 'الملف الشخصي' : 'Profile & Security'}
            </button>
          </div>
        </div>

        {/* Tab 1: Bookings List */}
        {activeTab === 'bookings' && (
          <div className="flex flex-col gap-6">
            {loading ? (
              <div className="h-64 bg-zinc-200 rounded-3xl animate-pulse" />
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200 p-8 flex flex-col items-center gap-4">
                <Calendar className="w-12 h-12 text-zinc-300" />
                <h3 className="text-xl font-bold uppercase text-brand-charcoal">No Active Bookings Yet</h3>
                <p className="text-xs text-zinc-500 max-w-sm font-normal">Experience the thrill of our curated fleet today.</p>
                <Button variant="lemon" onClick={() => onNavigate('fleet')}>
                  Explore Showroom
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {bookings.map((booking) => {
                  const statusColors: any = {
                    Confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    Active: 'bg-brand-lemon/30 text-brand-charcoal border-brand-lemon',
                    Pending: 'bg-amber-100 text-amber-800 border-amber-300',
                    Completed: 'bg-zinc-100 text-zinc-800 border-zinc-300',
                    Cancelled: 'bg-red-100 text-red-800 border-red-300'
                  };

                  return (
                    <div
                      key={booking._id}
                      className="p-6 md:p-8 rounded-3xl bg-white border border-zinc-200 shadow-md flex flex-col justify-between gap-6"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Reference & Status */}
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                          <span className="text-xs font-extrabold text-brand-charcoal">
                            REF: {booking.bookingReference}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border ${statusColors[booking.status] || 'bg-zinc-100'}`}>
                            {booking.status}
                          </span>
                        </div>

                        {/* Vehicle & Image */}
                        <div className="flex items-center gap-4">
                          {booking.vehicleImage && (
                            <img
                              src={booking.vehicleImage}
                              alt={booking.vehicleName}
                              className="w-24 h-16 rounded-2xl object-cover border border-zinc-200"
                            />
                          )}
                          <div className="flex flex-col">
                            <h3 className="text-lg font-display font-extrabold uppercase text-brand-charcoal">
                              {booking.vehicleName}
                            </h3>
                            <span className="text-xs text-zinc-500 font-semibold">
                              {booking.days} Days • {booking.totalAmount?.toLocaleString()} SAR
                            </span>
                          </div>
                        </div>

                        {/* Schedule */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                          <div className="flex flex-col">
                            <span className="text-zinc-400 uppercase text-[10px] font-bold">Pickup</span>
                            <span className="font-bold text-brand-charcoal mt-0.5">{new Date(booking.pickupDate).toLocaleString()}</span>
                            <span className="text-zinc-500 truncate text-[11px] mt-0.5">{booking.pickupLocation}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-zinc-400 uppercase text-[10px] font-bold">Return</span>
                            <span className="font-bold text-brand-charcoal mt-0.5">{new Date(booking.returnDate).toLocaleString()}</span>
                            <span className="text-zinc-500 truncate text-[11px] mt-0.5">{booking.returnLocation}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom QR Pass & Cancellation Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                          <QrCode className="w-4 h-4 text-brand-charcoal" />
                          <span>Digital Runway Pass Ready</span>
                        </div>

                        {['Pending', 'Confirmed'].includes(booking.status) && (
                          <button
                            onClick={() => handleCancelBooking(booking._id!)}
                            className="text-xs text-red-600 hover:text-red-800 font-bold"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile & Security */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="max-w-2xl p-8 rounded-3xl bg-white border border-zinc-200 shadow-md flex flex-col gap-6">
            <h3 className="text-xl font-display font-extrabold uppercase text-brand-charcoal">
              Profile Credentials & Password
            </h3>

            {profileMsg && (
              <div className={`p-3.5 rounded-xl text-xs font-medium ${profileMsg.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}>
                {profileMsg.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase text-zinc-500 font-bold">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase text-zinc-500 font-bold">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-zinc-500 font-bold">National ID / Passport Number</label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="ID Number"
                className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
              />
            </div>

            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold">Change Password</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="lemon" size="md">
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
