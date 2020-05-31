import express from 'express';
import RatingController from '../app/controllers/RatingController';

const router = express.Router();

router.post('/', RatingController.store);

export default router;
