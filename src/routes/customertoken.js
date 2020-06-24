import express from 'express';
import CustomerTokenController from '../app/controllers/CustomerTokenController';

const router = express.Router();

router.post('/', CustomerTokenController.store);

export default router;
