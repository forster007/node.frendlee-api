import express from 'express';
import ClockController from '../app/controllers/ClockController';

const router = express.Router();

router.post('/', ClockController.store);

export default router;
