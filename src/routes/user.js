import express from 'express';
import UserController from '../app/controllers/UserController';

const router = express.Router();

router.post('/', UserController.store);
router.put('/:userid', UserController.update);

export default router;
