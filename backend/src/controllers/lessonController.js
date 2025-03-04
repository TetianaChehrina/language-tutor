import {
  bookLesson,
  completeLesson,
  deleteLesson,
  getBusySlots,
  getLessons,
} from '../services/lessonService.js';

export const bookLessonController = async (req, res) => {
  const newLesson = await bookLesson(req.body);
  res.status(201).json(newLesson);
};

export const getLessonController = async (req, res) => {
  const { userId, role } = req.query;
  const lessons = await getLessons(userId, role);
  res.json(lessons);
};

export const completeLessonController = async (req, res) => {
  const lesson = await completeLesson(req.params.lessonId);
  res.json(lesson);
};

export const deleteLessonController = async (req, res, next) => {
  const { lessonId } = req.params;
  await deleteLesson(lessonId);
  res.status(200).json({ message: 'Lesson deleted successfully', lessonId });
};

export const getBusySlotsController = async (req, res, next) => {
  const { teacherId } = req.params;
  const busySlots = await getBusySlots(teacherId);
  res.json(busySlots);
};
