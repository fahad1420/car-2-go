import express from 'express';
import { getVehicles, getVehicleById, getFeaturedVehicles } from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/', getVehicles);
router.get('/featured', getFeaturedVehicles);
router.get('/:id', getVehicleById);

export default router;

