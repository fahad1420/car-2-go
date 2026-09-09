import express from 'express';
import { createBooking, getMyBookings, getBookingById, cancelBooking } from '../controllers/bookingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Allow booking creation for both authenticated users and guests (with optional token)
router.post('/', (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authenticateToken(req, res, next);
  }
  next();
}, createBooking);

router.get('/my-bookings', authenticateToken, getMyBookings);
router.get('/:id', authenticateToken, getBookingById);
router.post('/:id/cancel', authenticateToken, cancelBooking);

export default router;

