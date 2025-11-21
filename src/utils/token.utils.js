import jwt from 'jsonwebtoken';

export const createTokenAndSetCookie = (res, mobileNumber) => {
  const token = jwt.sign({mobileNumber}, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('authToken', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};
