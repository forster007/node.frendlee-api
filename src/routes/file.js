import express from 'express';
import multer from 'multer';
import { multerConfig } from '../config';
import FileController from '../app/controllers/FileController';

const router = express.Router();
const upload = multer(multerConfig);

router.post('/', upload.single('file'), FileController.store);

export default router;
