import express from 'express';
import ResendController from '../app/controllers/ResendController';

const router = express.Router();

router.get('/', ResendController.show);

export default router;
