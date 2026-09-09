import express from 'express';
import { getVehicleReviews, createReview } from '../controllers/reviewController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/vehicle/:vehicleId', getVehicleReviews);
router.post('/', authenticateToken, createReview);

export default router;

