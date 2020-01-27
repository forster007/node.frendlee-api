import express from 'express';
import ServiceController from '../app/controllers/ServiceController';

const router = express.Router();

router.get('/', ServiceController.index);
router.post('/', ServiceController.store);

export default router;
