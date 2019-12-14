import express from 'express';
import ClockController from '../app/controllers/ClockController';
import AuthMiddleware from '../app/middlewares';

const router = express.Router();

// router.use(AuthMiddleware);
router.post('/', ClockController.store);

export default router;
