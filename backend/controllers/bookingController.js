import { dbStore } from '../services/storage.js';

export const createBooking = async (req, res) => {
  try {
    const {
      vehicleId,
      pickupLocation,
      returnLocation,
      pickupDate,
      returnDate,
      addons = [],
      promoCode,
      customerDetails = {},
      notes
    } = req.body;

    // Validation
    if (!vehicleId || !pickupLocation || !pickupDate || !returnDate) {
      return res.status(400).json({ success: false, message: 'Vehicle, locations, and valid dates are required.' });
    }

    const vehicle = dbStore.findById('vehicles', vehicleId);
    if (!vehicle || !vehicle.available) {
      return res.status(400).json({ success: false, message: 'Selected vehicle is currently unavailable for booking.' });
    }

    const pStart = new Date(pickupDate).getTime();
    const pEnd = new Date(returnDate).getTime();

    if (isNaN(pStart) || isNaN(pEnd) || pEnd <= pStart) {
      return res.status(400).json({ success: false, message: 'Return date/time must be strictly after pickup date/time.' });
    }

    // Check server-side booking conflict
    const activeBookings = (dbStore.find('bookings') || []).filter(b =>
      b.vehicleId === vehicleId && ['Pending', 'Confirmed', 'Active'].includes(b.status)
    );

    const hasConflict = activeBookings.some(b => {
      const bStart = new Date(b.pickupDate).getTime();
      const bEnd = new Date(b.returnDate).getTime();
      return (pStart <= bEnd && pEnd >= bStart);
    });

    if (hasConflict) {
      return res.status(409).json({
        success: false,
        message: 'Conflict detected: The selected vehicle has just been reserved for this period. Please choose another date or luxury model.'
      });
    }

    // Calculate rental duration
    const diffHours = (pEnd - pStart) / (1000 * 60 * 60);
    const rentalDays = Math.max(1, Math.ceil(diffHours / 24));

    // Base price
    const baseDailyRate = vehicle.pricePerDay;
    let baseTotal = baseDailyRate * rentalDays;

    // Apply weekly discount if >= 7 days
    if (rentalDays >= 7 && vehicle.weeklyDiscount) {
      const discountRatio = vehicle.weeklyDiscount / 100;
      baseTotal = baseTotal * (1 - discountRatio);
    }

    // Add-ons total
    let addonsTotal = 0;
    const validatedAddons = [];
    if (Array.isArray(addons)) {
      for (const addon of addons) {
        if (addon.selected) {
          const price = Number(addon.price) || 0;
          addonsTotal += price;
          validatedAddons.push({
            id: addon.id,
            name: addon.name,
            price: price
          });
        }
      }
    }

    // Promo code validation
    let discountAmount = 0;
    if (promoCode) {
      const promo = dbStore.find('promos', { code: promoCode.trim().toUpperCase(), active: true })[0];
      if (promo && new Date(promo.validUntil) >= new Date()) {
        const calculatedDiscount = (baseTotal * (promo.discountPercent / 100));
        discountAmount = Math.min(calculatedDiscount, promo.maxDiscount || calculatedDiscount);
      }
    }

    // VAT & Total
    const subtotal = (baseTotal + addonsTotal) - discountAmount;
    const vatRate = 0.15; // 15% KSA Standard VAT
    const vatAmount = subtotal * vatRate;
    const depositAmount = vehicle.deposit || 5000;
    const totalAmount = subtotal + vatAmount;

    // User data
    const userId = req.user ? req.user.id : null;
    const customerName = customerDetails.name || (req.user ? req.user.name : 'VIP Guest');
    const customerEmail = customerDetails.email || (req.user ? req.user.email : '');
    const customerPhone = customerDetails.phone || (req.user ? req.user.phone : '');
    const idNumber = customerDetails.idNumber || (req.user ? req.user.idNumber : '');

    const bookingRef = 'C2G-' + Math.floor(10000 + Math.random() * 90000);

    const newBooking = dbStore.create('bookings', {
      bookingReference: bookingRef,
      vehicleId: vehicle._id,
      vehicleName: vehicle.name,
      vehicleImage: vehicle.images[0],
      userId,
      customerName,
      customerEmail,
      customerPhone,
      idNumber,
      pickupLocation,
      returnLocation: returnLocation || pickupLocation,
      pickupDate,
      returnDate,
      days: rentalDays,
      baseDailyRate,
      baseTotal,
      addons: validatedAddons,
      addonsTotal,
      promoCode: promoCode ? promoCode.toUpperCase() : null,
      discountAmount,
      vatRate,
      vatAmount,
      depositAmount,
      totalAmount,
      paymentMethod: customerDetails.paymentMethod || 'Credit Card / Mada (Simulated Concierge)',
      status: 'Confirmed',
      notes: notes || '',
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: 'Booking created and confirmed successfully.',
      booking: newBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Booking processing error: ' + error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const userBookings = dbStore.find('bookings', { userId: req.user.id });
    res.json({
      success: true,
      bookings: userBookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user bookings.' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = dbStore.findById('bookings', req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    // Only allow owner or admin
    if (req.user.role !== 'admin' && booking.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const vehicle = dbStore.findById('vehicles', booking.vehicleId);

    res.json({
      success: true,
      booking,
      vehicle
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve booking.' });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = dbStore.findById('bookings', req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    if (req.user.role !== 'admin' && booking.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    if (['Completed', 'Cancelled'].includes(booking.status)) {
      return res.status(400).json({ success: false, message: `Cannot cancel a booking that is already ${booking.status}.` });
    }

    const updated = dbStore.updateById('bookings', booking._id, {
      status: 'Cancelled',
      cancelledAt: new Date().toISOString(),
      cancellationReason: req.body.reason || 'Cancelled by customer'
    });

    res.json({
      success: true,
      message: 'Booking cancelled successfully.',
      booking: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Cancellation failed: ' + error.message });
  }
};

