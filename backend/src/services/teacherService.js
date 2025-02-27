import User from '../db/models/users.js';

export const getAllTeachers = async (page, perPage, filters) => {
  const skip = (page - 1) * perPage;
  const query = { role: 'teacher' };

  if (filters.languages) {
    query.languages = { $in: filters.languages };
  }
  if (filters.levels) {
    query.levels = { $in: filters.levels };
  }
  if (filters.popular) {
    query.lessons_done = { $gte: filters.popular };
  }
  if (filters.price) {
    query.price_per_hour = { $lte: filters.price };
  }
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { surname: { $regex: filters.search, $options: 'i' } },
    ];
  }

  const teachers = await User.find(query).skip(skip).limit(perPage);
  const totalCount = await User.countDocuments(query);
  console.log(`Total teachers matching query: ${totalCount}`);
  console.log(
    `Per page: ${perPage}, Total Pages: ${Math.ceil(totalCount / perPage)}`,
  );
  return { teachers, totalPages: Math.ceil(totalCount / perPage) };
};

export const getTeachersById = async (id) => {
  return await User.findById(id);
};
