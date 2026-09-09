import express from 'express';
import {
  getDashboardStats,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getAllBookings,
  updateBookingStatus,
  getAllCustomers,
  getAllInquiries,
  updateInquiryStatus,
  getPromos,
  createPromo,
  deletePromo,
  getSettings,
  updateSettings
} from '../controllers/adminController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin protection for all admin routes
router.use(authenticateToken, requireAdmin);

router.get('/stats', getDashboardStats);

// Fleet
router.post('/vehicles', addVehicle);
router.put('/vehicles/:id', updateVehicle);
router.delete('/vehicles/:id', deleteVehicle);

// Bookings
router.get('/bookings', getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);

// Customers
router.get('/customers', getAllCustomers);

// Inquiries
router.get('/inquiries', getAllInquiries);
router.put('/inquiries/:id/status', updateInquiryStatus);

// Promos
router.get('/promos', getPromos);
router.post('/promos', createPromo);
router.delete('/promos/:id', deletePromo);

// Settings
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

export default router;

