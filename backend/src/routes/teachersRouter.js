import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getTeacherDetails,
  getTeachers,
} from '../controllers/teachersController.js';

const router = express.Router();

router.get('/', ctrlWrapper(getTeachers));
router.get('/:id', ctrlWrapper(getTeacherDetails));

export default router;
