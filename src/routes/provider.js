import express from 'express';
import ProviderController from '../app/controllers/ProviderController';

const router = express.Router();

router.get('/', ProviderController.index);
router.post('/', ProviderController.store);
router.put('/', ProviderController.update);
router.put('/:id', ProviderController.update);

export default router;
