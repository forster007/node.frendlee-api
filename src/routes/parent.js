import express from 'express';
import multer from 'multer';

import ParentController from '../app/controllers/ParentController';
import FileController from '../app/controllers/FileController';
import multerConfig from '../config/multer';

const router = express.Router();
const upload = multer(multerConfig);

router.get('/', ParentController.index);
router.get('/:id', ParentController.show);
router.post('/', ParentController.store);
router.put('/:id', ParentController.update);

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
