import express from 'express';
import AppointmentController from '../app/controllers/AppointmentController';
import { AuthMiddleware } from '../app/middlewares';

const router = express.Router();

router.use(AuthMiddleware);
router.delete('/:appointmentid', AppointmentController.delete);
router.get('/', AppointmentController.index);
router.post('/', AppointmentController.store);

export default router;
