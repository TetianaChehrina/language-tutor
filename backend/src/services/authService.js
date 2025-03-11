import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import User from '../db/models/users.js';
import { comparePasswords, hashPassword } from './passwordService.js';
import { generateAccessToken, generateRefreshToken } from './tokenService.js';
import cloudinary from '../utils/cloudinaryConfig.js';

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

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

export const updateUserProfile = async (userId, updates, file) => {
  const user = await User.findById(userId);
  if (!user) throw createHttpError(404, 'User not found');

  if (updates.oldPassword && updates.newPassword) {
    const isPasswordValid = await bcrypt.compare(
      updates.oldPassword,
      user.password,
    );
    if (!isPasswordValid) throw createHttpError(400, 'Incorrect old password');

    updates.password = await bcrypt.hash(updates.newPassword, 10);
  }

  if (file) {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'user_avatars' },
        (error, result) => {
          if (error) reject(createHttpError(500, 'Failed to upload avatar'));
          resolve(result.secure_url);
        },
      );
      uploadStream.end(file.buffer);
    });
    updates.avatar_url = result;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
  });
  return updatedUser;
};
