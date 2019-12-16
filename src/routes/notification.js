import express from 'express';
import NotificationController from '../app/controllers/NotificationController';

const router = express.Router();

router.get('/', NotificationController.index);
router.put('/:notificationid', NotificationController.update);

export default router;
