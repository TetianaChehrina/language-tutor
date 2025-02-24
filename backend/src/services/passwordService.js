import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

export const hashPassword = async (password) => {
  if (!password || password.lenth < 6) {
    throw createHttpError(400, 'Password must be at least 6 characters long');
  }
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
