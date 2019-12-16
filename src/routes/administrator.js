import express from 'express';
import AdministratorController from '../app/controllers/AdministratorController';

const router = express.Router();

router.post('/', AdministratorController.store);

export default router;
