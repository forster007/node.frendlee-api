import express from 'express';
import CustomerController from '../app/controllers/CustomerController';

const router = express.Router();

router.get('/', CustomerController.index);
router.post('/', CustomerController.store);

export default router;
