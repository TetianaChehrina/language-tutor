import User from '../db/models/users.js';

export const getAllTeachers = async (page, perPage, filters) => {
  const skip = (page - 1) * perPage;
  const query = User.find({ role: 'teacher' });

  if (filters.languages.length > 0) {
    query.where('languages').in(filters.languages);
  }

  if (filters.levels.length > 0) {
    query.where('levels').in(filters.levels);
  }

  if (filters.popular) {
    query.where('lessons_done').gte(filters.popular);
  }

  if (filters.price !== null) {
    query.where('price_per_hour').equals(filters.price);
  }

  if (filters.search) {
    query.or([
      { name: new RegExp(filters.search, 'i') },
      { surname: new RegExp(filters.search, 'i') },
    ]);
  }

  const teachers = await query.skip(skip).limit(perPage).exec();
  const totalCount = await User.find(query.getFilter()).countDocuments();

  return { teachers, totalPages: Math.ceil(totalCount / perPage) };
};

export const getTeachersById = async (id) => {
  return await User.findOne({ id });
};
