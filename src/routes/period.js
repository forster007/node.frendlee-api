import express from 'express';
import PeriodController from '../app/controllers/PeriodController';
import AuthMiddleware from '../app/middlewares';

const router = express.Router();

// router.use(AuthMiddleware);
router.post('/', PeriodController.store);

export default router;
