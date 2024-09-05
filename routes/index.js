import { Router } from 'express';
import CarRoutes from './car.js';

const router = Router();

router.use('/cars', CarRoutes);

export default router;