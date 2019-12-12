import express from 'express';
import ServiceController from '../app/controllers/ServiceController';
import { AuthMiddleware } from '../app/middlewares';

const router = express.Router();

router.use(AuthMiddleware);
router.post('/', ServiceController.store);

export default router;
