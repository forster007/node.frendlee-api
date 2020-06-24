import express from 'express';
import CustomerParentController from '../app/controllers/CustomerParentController';

const router = express.Router();

router.post('/', CustomerParentController.store);

export default router;
