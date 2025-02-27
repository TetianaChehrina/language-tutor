import { getAllTeachers, getTeachersById } from '../services/teacherService.js';

export const getTeachers = async (req, res) => {
  const {
    page = 1,
    perPage = 4,
    languages,
    levels,
    popular,
    price,
    search,
  } = req.query;

  const filters = {
    languages: languages ? languages.split(',') : null,
    levels: levels ? levels.split(',') : null,
    popular: popular ? Number(popular) : null,
    price: price ? Number(price) : null,
    search: search || null,
  };

  const { teachers, totalPages } = await getAllTeachers(
    Number(page),
    Number(perPage),
    filters,
  );
  console.log(
    `Returning ${teachers.length} teachers, total pages: ${totalPages}`,
  );
  res.json({ teachers, totalPages });
};

export const getTeacherDetails = async (req, res) => {
  const teacher = await getTeachersById(req.params.id);
  if (!teacher) {
    return res.status(404).json({ message: 'Teacher not found' });
  }
  res.json(teacher);
};
