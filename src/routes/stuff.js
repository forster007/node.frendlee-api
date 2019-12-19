import express from 'express';
import StuffController from '../app/controllers/StuffController';

const router = express.Router();

router.get('/', StuffController.index);
router.post('/', StuffController.store);
router.put('/:id', StuffController.update);

export default router;
