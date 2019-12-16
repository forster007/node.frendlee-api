import express from 'express';
import ServiceController from '../app/controllers/ServiceController';

const router = express.Router();

router.post('/', ServiceController.store);

export default router;
