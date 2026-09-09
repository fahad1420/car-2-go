import { initialMockVehicles, initialMockBookings } from './mockData';
import { Vehicle, Booking } from '../types';

const API_BASE_URL = '/api';

// Local storage keys for standalone static demo mode
const STORAGE_KEYS = {
  VEHICLES: 'car2go_vehicles',
  BOOKINGS: 'car2go_bookings',
};

function getLocalVehicles(): Vehicle[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // Ignore storage parse errors
  }
  return initialMockVehicles;
}

function getLocalBookings(): Booking[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // Ignore storage parse errors
  }
  return initialMockBookings;
}

function saveLocalBookings(bookings: Booking[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    // Ignore
  }
}

// Fallback dispatcher for static hosts like GitHub Pages
function handleMockFallback(method: string, url: string, body?: any) {
  console.log(`[Demo Static Mode] Handled ${method} ${url}`, body);

  // /vehicles or /vehicles/:id
  if (url.startsWith('/vehicles')) {
    const vehicles = getLocalVehicles();
    const parts = url.split('/');
    if (parts.length > 2 && parts[2]) {
      const id = parts[2].split('?')[0];
      const vehicle = vehicles.find((v) => v._id === id);
      if (vehicle) return { success: true, vehicle };
    }
    const categoryMatch = url.match(/category=([^&]+)/);
    if (categoryMatch && categoryMatch[1] && categoryMatch[1] !== 'all') {
      const cat = decodeURIComponent(categoryMatch[1]);
      const filtered = vehicles.filter((v) => v.category.toLowerCase() === cat.toLowerCase());
      return { success: true, count: filtered.length, vehicles: filtered };
    }
    return { success: true, count: vehicles.length, vehicles };
  }

  // /bookings/my
  if (url.startsWith('/bookings/my')) {
    const bookings = getLocalBookings();
    return { success: true, count: bookings.length, bookings };
  }

  // /bookings/create or /bookings
  if (url.startsWith('/bookings') && method === 'POST') {
    const bookings = getLocalBookings();
    const newBooking: Booking = {
      ...body,
      _id: `bok_${Date.now()}`,
      bookingReference: `C2G-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    bookings.unshift(newBooking);
    saveLocalBookings(bookings);
    return { success: true, booking: newBooking };
  }

  // /promos/validate
  if (url.startsWith('/promos/validate')) {
    const code = (body?.code || '').toUpperCase().trim();
    if (code === 'ROYAL20') {
      return {
        success: true,
        data: {
          valid: true,
          code: 'ROYAL20',
          discountPercent: 20,
          maxDiscount: 5000,
          description: '20% VIP Season Discount applied',
        },
      };
    }
    if (code === 'CAR2GO10') {
      return {
        success: true,
        data: {
          valid: true,
          code: 'CAR2GO10',
          discountPercent: 10,
          maxDiscount: 2000,
          description: '10% Welcome Discount applied',
        },
      };
    }
    return { success: false, message: 'Invalid or expired promotional code' };
  }

  // /auth/login
  if (url.startsWith('/auth/login')) {
    const email = body?.email || 'client@car2go.sa';
    const role = email.includes('admin') ? 'admin' : 'customer';
    return {
      success: true,
      token: 'demo_jwt_token_vip',
      user: {
        id: role === 'admin' ? 'usr_admin_01' : 'usr_client_01',
        name: role === 'admin' ? 'Prestige Operations Admin' : 'Tariq Al-Mansoor',
        email,
        phone: '+966 55 987 6543',
        role,
        avatar: role === 'admin'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        idNumber: '1098234567',
        drivingLicenseNumber: '9876543210',
      },
    };
  }

  // /auth/register
  if (url.startsWith('/auth/register')) {
    return {
      success: true,
      token: 'demo_jwt_token_vip',
      user: {
        id: `usr_${Date.now()}`,
        name: body.name || 'VIP Guest',
        email: body.email,
        phone: body.phone,
        role: 'customer',
      },
    };
  }

  // /inquiries
  if (url.startsWith('/inquiries')) {
    return { success: true, message: 'Inquiry received. A concierge will reach out.' };
  }

  // /admin/stats
  if (url.startsWith('/admin/stats')) {
    const bookings = getLocalBookings();
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    return {
      success: true,
      stats: {
        totalRevenue,
        activeBookings: bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Active').length,
        totalFleet: getLocalVehicles().length,
        utilizationRate: '78%',
      },
      recentBookings: bookings.slice(0, 5),
    };
  }

  return { success: true };
}

export const api = {
  async get(url: string, token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const res = await fetch(`${API_BASE_URL}${url}`, { headers });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error(`Status ${res.status}`);
    } catch (e) {
      // Fallback seamlessly for GitHub Pages / static hosting
      return handleMockFallback('GET', url);
    }
  },

  async post(url: string, body: any, token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const res = await fetch(`${API_BASE_URL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error(`Status ${res.status}`);
    } catch (e) {
      return handleMockFallback('POST', url, body);
    }
  },

  async put(url: string, body: any, token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const res = await fetch(`${API_BASE_URL}${url}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error(`Status ${res.status}`);
    } catch (e) {
      return handleMockFallback('PUT', url, body);
    }
  },

  async delete(url: string, token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const res = await fetch(`${API_BASE_URL}${url}`, {
        method: 'DELETE',
        headers,
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error(`Status ${res.status}`);
    } catch (e) {
      return handleMockFallback('DELETE', url);
    }
  },
};

