import express from 'express';
import AddressController from '../app/controllers/AddressController';

const router = express.Router();

router.get('/', AddressController.index);

export default router;
