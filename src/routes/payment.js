import express from 'express';
import PaymentController from '../app/controllers/PaymentController';

const router = express.Router();

router.post('/', PaymentController.store);

export default router;
