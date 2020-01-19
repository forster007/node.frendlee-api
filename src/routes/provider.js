import express from 'express';
import multer from 'multer';

import ProviderController from '../app/controllers/ProviderController';
import multerConfig from '../config/multer';

const router = express.Router();
const upload = multer(multerConfig);

router.get('/', ProviderController.index);
router.post('/', ProviderController.store);
router.put('/', ProviderController.update);
router.put(
  '/:id',
  upload.fields([
    { name: 'picture_address', maxCount: 1 },
    { name: 'picture_profile', maxCount: 1 },
  ]),
  ProviderController.update
);

export default router;
