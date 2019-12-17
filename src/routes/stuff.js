import express from 'express';
import StuffController from '../app/controllers/StuffController';

const router = express.Router();

router.get('/', StuffController.index);
router.post('/', StuffController.store);

export default router;
