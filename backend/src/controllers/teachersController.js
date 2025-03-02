import { getAllTeachers, getTeachersById } from '../services/teacherService.js';

export const getTeachers = async (req, res) => {
  try {
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
      languages: languages
        ? Array.isArray(languages)
          ? languages.filter(Boolean)
          : [languages]
        : [],
      levels: levels
        ? Array.isArray(levels)
          ? levels.filter(Boolean)
          : [levels]
        : [],
      popular: popular ? Number(popular) : null,
      price: price ? Number(price) : null,
      search: search || null,
    };

    const { teachers, totalPages } = await getAllTeachers(
      Number(page),
      Number(perPage),
      filters,
    );

    res.json({ teachers, totalPages });
  } catch (error) {
    console.error('Error in getTeachers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getTeacherDetails = async (req, res) => {
  try {
    const teacher = await getTeachersById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Error fetching teacher details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
