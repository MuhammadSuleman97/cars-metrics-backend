import { Router } from 'express';
import CarController from '../controllers/car.js';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); 

const router = Router();

router.get('/', CarController.getCars);
router.post('/', CarController.createCar);
router.post('/upload', upload.single('file'), CarController.uploadCarsFromCSV); 
router.get('/download', CarController.downloadCarsCSV);

export default router;