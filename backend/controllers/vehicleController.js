import { dbStore } from '../services/storage.js';

export const getVehicles = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, transmission, seats, availableOnly, pickupDate, returnDate } = req.query;

    let vehicles = dbStore.find('vehicles') || [];

    // Filter by category
    if (category && category.toLowerCase() !== 'all') {
      vehicles = vehicles.filter(v => v.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by text search
    if (search) {
      const q = search.toLowerCase();
      vehicles = vehicles.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        (v.tagline && v.tagline.toLowerCase().includes(q)) ||
        (v.taglineAr && v.taglineAr.includes(q))
      );
    }

    // Filter by price range
    if (minPrice) {
      vehicles = vehicles.filter(v => v.pricePerDay >= Number(minPrice));
    }
    if (maxPrice) {
      vehicles = vehicles.filter(v => v.pricePerDay <= Number(maxPrice));
    }

    // Filter by transmission
    if (transmission && transmission !== 'All') {
      vehicles = vehicles.filter(v => v.transmission.toLowerCase().includes(transmission.toLowerCase()));
    }

    // Filter by seats
    if (seats && Number(seats) > 0) {
      vehicles = vehicles.filter(v => v.seats >= Number(seats));
    }

    // Availability validation by dates
    if (pickupDate && returnDate) {
      const pDate = new Date(pickupDate).getTime();
      const rDate = new Date(returnDate).getTime();

      const activeBookings = (dbStore.find('bookings') || []).filter(b =>
        ['Pending', 'Confirmed', 'Active'].includes(b.status)
      );

      vehicles = vehicles.map(vehicle => {
        const hasConflict = activeBookings.some(b => {
          if (b.vehicleId !== vehicle._id) return false;
          const bStart = new Date(b.pickupDate).getTime();
          const bEnd = new Date(b.returnDate).getTime();
          return (pDate <= bEnd && rDate >= bStart);
        });
        return {
          ...vehicle,
          availableForDates: !hasConflict
        };
      });

      if (availableOnly === 'true') {
        vehicles = vehicles.filter(v => v.availableForDates && v.available);
      }
    }

    res.json({
      success: true,
      count: vehicles.length,
      vehicles
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch vehicles: ' + error.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = dbStore.findById('vehicles', req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    }

    // Include reviews for this vehicle
    const reviews = dbStore.find('reviews', { vehicleId: vehicle._id });

    res.json({
      success: true,
      vehicle: {
        ...vehicle,
        reviews
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load vehicle details.' });
  }
};

export const getFeaturedVehicles = async (req, res) => {
  try {
    const vehicles = dbStore.find('vehicles', { featured: true });
    res.json({
      success: true,
      vehicles
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch featured vehicles.' });
  }
};

