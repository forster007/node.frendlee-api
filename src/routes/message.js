import express from 'express';
import MessageController from '../app/controllers/MessageController';

const router = express.Router();

router.put('/:id', MessageController.update);

export default router;
