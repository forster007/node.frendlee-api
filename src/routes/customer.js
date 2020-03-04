import express from 'express';
import multer from 'multer';

import CustomerController from '../app/controllers/CustomerController';
import FileController from '../app/controllers/FileController';
import multerConfig from '../config/multer';

const router = express.Router();
const upload = multer(multerConfig);

router.get('/', CustomerController.index);
router.get('/:id', CustomerController.show);
router.post('/', CustomerController.store);
router.put('/:id', CustomerController.update);

router.post(
  '/:id/files',
  upload.fields([
    {
      name: 'picture_profile',
      maxCount: 1,
    },
  ]),
  FileController.storeCustomer
);

export default router;
