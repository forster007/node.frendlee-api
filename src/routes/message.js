import express from 'express';
import MessageController from '../app/controllers/MessageController';

const router = express.Router();

router.get('/', MessageController.index);
router.get('/:id', MessageController.show);
router.put('/:id', MessageController.update);

export default router;
