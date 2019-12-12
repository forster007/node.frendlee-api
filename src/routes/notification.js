import express from 'express';
import NotificationController from '../app/controllers/NotificationController';
import { AuthMiddleware } from '../app/middlewares';

const router = express.Router();

router.use(AuthMiddleware);
router.get('/', NotificationController.index);
router.put('/:notificationid', NotificationController.update);

export default router;
