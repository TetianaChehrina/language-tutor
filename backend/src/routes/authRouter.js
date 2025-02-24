import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  login,
  logout,
  refresh,
  registerUser,
} from '../controllers/authController.js';
import {
  checkAccessToken,
  checkRefreshToken,
} from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/register', upload.single('avatar'), ctrlWrapper(registerUser));
router.post('/login', ctrlWrapper(login));
router.post('/logout', checkAccessToken, ctrlWrapper(logout));
router.get('/refresh', checkRefreshToken, ctrlWrapper(refresh));

export default router;
