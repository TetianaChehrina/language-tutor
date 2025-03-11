import Lesson from '../db/models/lesson.js';
import User from '../db/models/users.js';

export const bookLesson = async (
  studentId,
  teacherId,
  date,
  duration,
  reason,
  language,
) => {
  if (!studentId || !teacherId || !date || !duration || !reason || !language) {
    throw new Error('All fields are required');
  }

  const newLesson = await Lesson.create({
    studentId,
    teacherId,
    date,
    duration,
    reason,
    language,
  });

  await User.findByIdAndUpdate(studentId, {
    $push: { 'lessons.planned': newLesson._id },
  });

  await User.findByIdAndUpdate(teacherId, {
    $push: { 'lessons.planned': newLesson._id },
  });

  return newLesson;
};

export const getLessons = async (userId, role) => {
  const user = await User.findById(userId).populate(
    'lessons.planned lessons.completed',
  );
  return {
    planned: user.lessons.planned,
    completed: user.lessons.completed,
  };
};

export const deleteLesson = async (lessonId) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(lessonId);
    if (!lesson) throw new Error('Lesson not found');

    await User.updateMany(
      {
        $or: [
          { 'lessons.planned': lessonId },
          { 'lessons.completed': lessonId },
        ],
      },
      { $pull: { 'lessons.planned': lessonId, 'lessons.completed': lessonId } },
    );

    return lessonId;
  } catch (error) {
    throw new Error('Error deleting lesson');
  }
};

export const completeLesson = async (lessonId) => {
  const lesson = await Lesson.findByIdAndUpdate(
    lessonId,
    { status: 'completed' },
    { new: true },
  );

  if (!lesson) throw new Error('Lesson not found');

  await User.findByIdAndUpdate(lesson.studentId, {
    $pull: { 'lessons.planned': lessonId },
    $push: { 'lessons.completed': lessonId },
  });

  await User.findByIdAndUpdate(lesson.teacherId, {
    $pull: { 'lessons.planned': lessonId },
    $push: { 'lessons.completed': lessonId },
  });

  return lesson;
};

export const getBusySlots = async (teacherId) => {
  const lessons = await Lesson.find({
    teacherId,
    status: 'planned',
  });

  return lessons.map((lesson) => ({
    date: lesson.date,
    duration: lesson.duration,
  }));
};
