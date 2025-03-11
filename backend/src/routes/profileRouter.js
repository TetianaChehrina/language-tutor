import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateUserController } from '../controllers/authController.js';
import { checkAccessToken } from '../middlewares/checkToken.js';

const router = express.Router();

router.put(
  '/',
  checkAccessToken,
  upload.single('avatar'),
  ctrlWrapper(updateUserController),
);

export default router;
