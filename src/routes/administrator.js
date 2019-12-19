import express from 'express';
import AdministratorController from '../app/controllers/AdministratorController';

const router = express.Router();

router.get('/', AdministratorController.index);
router.post('/', AdministratorController.store);
router.put('/', AdministratorController.update);
router.put('/:id', AdministratorController.update);

export default router;
