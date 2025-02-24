import createHttpError from 'http-errors';
import User from '../db/models/users.js';
import { comparePasswords, hashPassword } from './passwordService.js';
import { generateAccessToken, generateRefreshToken } from './tokenService.js';

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
// export const createUser = async ({
//   name,
//   surname,
//   email,
//   password,
//   gender,
//   role,
//   avatarURL,
//   languages = [],
//   levels = [],
//   rating = 0,
//   reviews = [],
//   price_per_hour = 0,
//   lessons_done = 0,
//   teaching_approach = '',
//   requirements = [],
// }) => {
//   const isUser = await User.findOne({ email });
//   if (isUser) {
//     throw createHttpError(400, 'User already exists');
//   }

//   const hashedPassword = await hashPassword(password);

//   const newUserData = {
//     name,
//     surname,
//     email,
//     password: hashedPassword,
//     gender,
//     role,
//     avatar_url: avatarURL || '',
//   };

//   if (role === 'teacher') {
//     Object.assign(newUserData, {
//       languages,
//       levels,
//       rating,
//       reviews,
//       price_per_hour,
//       lessons_done,
//       teaching_approach,
//       requirements,
//     });
//   }

//   const newUser = await User.create(newUserData);

//   return newUser;
// };

export const createUser = async ({
  name,
  surname,
  email,
  password,
  gender,
  role,
  avatarURL,
}) => {
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw createHttpError(400, 'User already exists');
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    name,
    surname,
    email,
    password: hashedPassword,
    gender,
    role,
    avatar_url: avatarURL || '',
  });

  return newUser;
};

export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Incorrect email or password');
  }

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Incorrect email or password');
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const resetToken = async (id) => {
  return User.findByIdAndUpdate(id, { token: ' ' });
};
