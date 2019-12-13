import express from 'express';
import CustomerController from '../app/controllers/CustomerController';
import { AuthMiddleware } from '../app/middlewares';

const router = express.Router();

// router.use(AuthMiddleware);
router.get('/', CustomerController.index);

export default router;
