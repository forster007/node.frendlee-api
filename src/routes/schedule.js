import express from 'express';
import ScheduleController from '../app/controllers/ScheduleController';

const router = express.Router();

router.get('/', ScheduleController.index);

export default router;
