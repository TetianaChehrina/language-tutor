import {
  bookLesson,
  completeLesson,
  deleteLesson,
  getBusySlots,
  getLessons,
} from '../services/lessonService.js';

export const bookLessonController = async (req, res, next) => {
  try {
    const { teacherId, date, duration, reason, language } = req.body;
    const studentId = req.user.id;

    if (!studentId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const newLesson = await bookLesson(
      studentId,
      teacherId,
      date,
      duration,
      reason,
      language,
    );

    res.status(201).json(newLesson);
  } catch (error) {
    next(error);
  }
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
