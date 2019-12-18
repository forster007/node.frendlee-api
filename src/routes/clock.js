import express from 'express';
import ClockController from '../app/controllers/ClockController';

const router = express.Router();

router.get('/', ClockController.index);
router.post('/', ClockController.store);
router.put('/', ClockController.update);

export default router;
