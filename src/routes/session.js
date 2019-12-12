import express from 'express';
import SessionController from '../app/controllers/SessionController';

const router = express.Router();

router.post('/', SessionController.store);

export default router;
