import express from 'express';
import OnesignalController from '../app/controllers/OnesignalController';

const router = express.Router();

router.post('/', OnesignalController.store);

export default router;
