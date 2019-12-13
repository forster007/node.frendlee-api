import express from 'express';
import UserController from '../app/controllers/UserController';

import AuthMiddleware from '../app/middlewares';

const router = express.Router();

router.post('/', UserController.store);

router.use(AuthMiddleware);

router.put('/:userid', UserController.update);

export default router;
