import express from 'express';
import PeriodController from '../app/controllers/PeriodController';

const router = express.Router();

router.get('/', PeriodController.index);
router.post('/', PeriodController.store);
router.put('/:id', PeriodController.update);

export default router;
