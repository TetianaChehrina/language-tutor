import createHttpError from 'http-errors';
import {
  createUser,
  findUserByEmail,
  loginUserService,
} from '../services/authService.js';
import cloudinary from '../utils/cloudinaryConfig.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../services/tokenService.js';
import jwt from 'jsonwebtoken';
import User from '../db/models/users.js';

export const registerUser = async (req, res) => {
  try {
    const { name, surname, email, password, gender, role } = req.body;

    const user = await findUserByEmail(email);
    if (user) throw createHttpError(409, 'Email already in use');

    let avatarURL = '';

    if (req.file) {
      const uploadResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'user_avatars' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(
                new createHttpError(500, 'Failed to upload avatar'),
              );
            }
            resolve(result.secure_url);
          },
        );
        uploadStream.end(req.file.buffer);
      });
      avatarURL = uploadResponse;
    }
    console.log('File information:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const newUser = await createUser({
      name,
      surname,
      email,
      password,
      gender,
      role,
      avatarURL,
    });

    const accessToken = generateAccessToken(newUser._id.toString());
    const refreshToken = generateRefreshToken(newUser._id.toString());

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(201).json({
      message: 'Registration successful',
      user: {
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        gender: newUser.gender,
        role: newUser.role,
        avatarURL: newUser.avatar_url,
      },
      accessToken,
    });
  } catch (error) {
    console.error('Register user error:', error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUserService(
    email,
    password,
  );
  console.log('AccessToken:', accessToken);
  console.log('RefreshToken:', refreshToken);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: 'Login successful',
    user,
    accessToken,
  });
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({ message: 'Logout failed' });
  }
};

export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    );

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
