import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  bookLessonController,
  completeLessonController,
  deleteLessonController,
  getBusySlotsController,
  getLessonController,
} from '../controllers/lessonController.js';
import { checkAccessToken } from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/book', checkAccessToken, ctrlWrapper(bookLessonController));
router.get('/', checkAccessToken, ctrlWrapper(getLessonController));
router.put(
  '/complete/:lessonId',
  checkAccessToken,
  ctrlWrapper(completeLessonController),
);
router.delete(
  '/:lessonId',
  checkAccessToken,
  ctrlWrapper(deleteLessonController),
);
router.get('/:teacherId/busy-slots', ctrlWrapper(getBusySlotsController));

export default router;
