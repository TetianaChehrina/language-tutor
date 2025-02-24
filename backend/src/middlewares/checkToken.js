import jwt from 'jsonwebtoken';

export const checkAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Access token verification failed:', error.message);
    return res.status(403).json({ message: 'Invalid access token' });
  }
};

export const checkRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token found' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Refresh token verification failed:', error.message);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};
