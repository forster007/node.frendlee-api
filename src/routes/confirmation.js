import express from 'express';
import ConfirmationController from '../app/controllers/ConfirmationController';

const router = express.Router();

router.get('/', ConfirmationController.show);

export default router;
