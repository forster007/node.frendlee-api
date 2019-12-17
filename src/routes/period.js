import express from 'express';
import PeriodController from '../app/controllers/PeriodController';

const router = express.Router();

router.get('/', PeriodController.index);
router.post('/', PeriodController.store);

export default router;
