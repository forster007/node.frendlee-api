import express from 'express';
import CheckController from '../app/controllers/CheckController';

const router = express.Router();

router.get('/abc', CheckController.index);
router.get('/', CheckController.show);

export default router;
