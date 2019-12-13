import express from 'express';
import ScheduleController from '../app/controllers/ScheduleController';
import AuthMiddleware from '../app/middlewares';

const router = express.Router();

router.use(AuthMiddleware);
router.get('/', ScheduleController.index);

export default router;
