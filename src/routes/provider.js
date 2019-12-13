import express from 'express';
import ProviderController from '../app/controllers/ProviderController';
import AuthMiddleware from '../app/middlewares';

const router = express.Router();

router.use(AuthMiddleware);
router.get('/', ProviderController.index);
router.post('/', ProviderController.store);

export default router;
