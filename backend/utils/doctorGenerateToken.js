import jwt from 'jsonwebtoken';

const generateToken = (res, doctorId) => {
  const token = jwt.sign({ doctorId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('docjwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
