import express from 'express';
import AppointmentController from '../app/controllers/AppointmentController';

const router = express.Router();

router.delete('/:id', AppointmentController.delete);
router.get('/', AppointmentController.index);
router.post('/', AppointmentController.store);
router.put('/:id', AppointmentController.update);

export default router;
