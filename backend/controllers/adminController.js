import { dbStore } from '../services/storage.js';

export const getDashboardStats = async (req, res) => {
  try {
    const vehicles = dbStore.find('vehicles') || [];
    const bookings = dbStore.find('bookings') || [];
    const users = dbStore.find('users') || [];
    const reviews = dbStore.find('reviews') || [];
    const inquiries = dbStore.find('inquiries') || [];

    const totalRevenue = bookings
      .filter(b => ['Confirmed', 'Active', 'Completed'].includes(b.status))
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const activeRentals = bookings.filter(b => b.status === 'Active').length;
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const totalFleetCount = vehicles.length;
    const availableFleetCount = vehicles.filter(v => v.available).length;
    const fleetUtilization = totalFleetCount > 0 ? Math.round(((totalFleetCount - availableFleetCount) / totalFleetCount) * 100) : 0;

    const recentBookings = bookings.slice(0, 8);

    res.json({
      success: true,
      stats: {
        totalRevenue,
        activeRentals,
        confirmedBookings,
        totalFleetCount,
        availableFleetCount,
        fleetUtilization,
        totalCustomers: users.filter(u => u.role === 'customer').length,
        totalReviews: reviews.length,
        unreadInquiries: inquiries.filter(i => i.status === 'Unread').length
      },
      recentBookings,
      vehiclesOverview: vehicles.slice(0, 6)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch admin stats: ' + error.message });
  }
};

// Vehicle CRUD
export const addVehicle = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      tagline,
      taglineAr,
      year,
      pricePerDay,
      deposit,
      transmission,
      fuelType,
      seats,
      doors,
      acceleration,
      topSpeed,
      horsepower,
      engine,
      color,
      available = true,
      featured = false,
      images = [],
      features = [],
      featuresAr = [],
      location
    } = req.body;

    if (!name || !brand || !pricePerDay) {
      return res.status(400).json({ success: false, message: 'Vehicle name, brand, and daily price are required.' });
    }

    const newVehicle = dbStore.create('vehicles', {
      name,
      brand,
      category: category || 'Luxury',
      tagline: tagline || '',
      taglineAr: taglineAr || '',
      year: Number(year) || 2025,
      pricePerDay: Number(pricePerDay),
      weeklyDiscount: 10,
      deposit: Number(deposit) || 5000,
      currency: 'SAR',
      transmission: transmission || 'Automatic',
      fuelType: fuelType || 'Petrol',
      seats: Number(seats) || 4,
      doors: Number(doors) || 4,
      acceleration: acceleration || '3.8s (0-100 km/h)',
      topSpeed: topSpeed || '280 km/h',
      horsepower: horsepower || '500 HP',
      engine: engine || 'Twin-Turbo V8',
      color: color || 'Onyx Black',
      available: Boolean(available),
      featured: Boolean(featured),
      rating: 5.0,
      reviewCount: 0,
      mileageLimitPerDay: 250,
      extraMileageCost: 15,
      location: location || 'Riyadh - King Khalid International Airport (Terminal 1-5 VIP)',
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=85'],
      features: features.length > 0 ? features : ['VIP Chauffeur Option', 'Bespoke Sound System'],
      featuresAr: featuresAr.length > 0 ? featuresAr : ['خيار سائق خاص فاخر', 'نظام صوتي بيسبوك']
    });

    res.status(201).json({ success: true, message: 'Vehicle added to luxury fleet.', vehicle: newVehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add vehicle: ' + error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const updated = dbStore.updateById('vehicles', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    }
    res.json({ success: true, message: 'Vehicle updated successfully.', vehicle: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update vehicle.' });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const deleted = dbStore.deleteById('vehicles', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    }
    res.json({ success: true, message: 'Vehicle removed from fleet.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete vehicle.' });
  }
};

// Bookings Administration
export const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;
    let bookings = dbStore.find('bookings') || [];
    if (status && status !== 'All') {
      bookings = bookings.filter(b => b.status.toLowerCase() === status.toLowerCase());
    }
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings.' });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled', 'Rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid booking status.' });
    }

    const updates = { status };
    if (notes !== undefined) updates.adminNotes = notes;

    const updated = dbStore.updateById('bookings', req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    res.json({ success: true, message: `Booking status updated to ${status}.`, booking: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update booking status.' });
  }
};

// Customers list
export const getAllCustomers = async (req, res) => {
  try {
    const users = dbStore.find('users') || [];
    const safeUsers = users.map(({ password, ...u }) => u);
    res.json({ success: true, customers: safeUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch customers.' });
  }
};

// Inquiries
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = dbStore.find('inquiries') || [];
    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch inquiries.' });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = dbStore.updateById('inquiries', req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }
    res.json({ success: true, inquiry: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update inquiry.' });
  }
};

// Promos
export const getPromos = async (req, res) => {
  try {
    const promos = dbStore.find('promos') || [];
    res.json({ success: true, promos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch promos.' });
  }
};

export const createPromo = async (req, res) => {
  try {
    const { code, discountPercent, maxDiscount, validUntil, description } = req.body;
    if (!code || !discountPercent) {
      return res.status(400).json({ success: false, message: 'Code and discount percentage are required.' });
    }
    const newPromo = dbStore.create('promos', {
      code: code.trim().toUpperCase(),
      discountPercent: Number(discountPercent),
      maxDiscount: Number(maxDiscount) || 1000,
      validUntil: validUntil || '2027-12-31',
      description: description || 'VIP Privilege Discount',
      active: true
    });
    res.status(201).json({ success: true, promo: newPromo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create promo.' });
  }
};

export const deletePromo = async (req, res) => {
  try {
    const deleted = dbStore.deleteById('promos', req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Promo not found.' });
    res.json({ success: true, message: 'Promo removed.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete promo.' });
  }
};

// Business Settings
export const getSettings = async (req, res) => {
  try {
    res.json({ success: true, settings: dbStore.state.settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch settings.' });
  }
};

export const updateSettings = async (req, res) => {
  try {
    dbStore.state.settings = { ...dbStore.state.settings, ...req.body };
    dbStore.save();
    res.json({ success: true, message: 'Business settings updated.', settings: dbStore.state.settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update settings.' });
  }
};

