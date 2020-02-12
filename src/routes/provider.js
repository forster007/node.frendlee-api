import express from 'express';
import multer from 'multer';

import FileController from '../app/controllers/FileController';
import ProviderController from '../app/controllers/ProviderController';
import multerConfig from '../config/multer';

const router = express.Router();
const upload = multer(multerConfig);

router.get('/', ProviderController.index);
router.post('/', ProviderController.store);
router.put('/', ProviderController.update);

router.put(
  '/:id/files',
  upload.fields([
    { name: 'picture_address', maxCount: 1 },
    { name: 'picture_certification', maxCount: 1 },
    { name: 'picture_license', maxCount: 1 },
    { name: 'picture_profile', maxCount: 1 },
  ]),
  FileController.storeProvider
);

export default router;
