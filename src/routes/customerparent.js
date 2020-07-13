import express from 'express';
import CustomerParentController from '../app/controllers/CustomerParentController';

const router = express.Router();

router.get('/', CustomerParentController.index);
router.post('/', CustomerParentController.store);
router.put('/:id', CustomerParentController.update);

export default router;
