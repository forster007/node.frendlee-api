import express from 'express';
import AppointmentController from '../app/controllers/AppointmentController';

const router = express.Router();

router.delete('/:appointmentid', AppointmentController.delete);
router.get('/', AppointmentController.index);
router.post('/', AppointmentController.store);

export default router;
