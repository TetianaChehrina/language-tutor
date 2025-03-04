import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  bookLessonController,
  completeLessonController,
  deleteLessonController,
  getBusySlotsController,
  getLessonController,
} from '../controllers/lessonController.js';

const router = express.Router();

router.post('/book', ctrlWrapper(bookLessonController));
router.get('/', ctrlWrapper(getLessonController));
router.put('/complete/:lessonId', ctrlWrapper(completeLessonController));
router.delete('/:lessonId', ctrlWrapper(deleteLessonController));
router.get('/:teacherId/busy-slots', ctrlWrapper(getBusySlotsController));

export default router;
