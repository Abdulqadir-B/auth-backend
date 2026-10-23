import jwt from 'jsonwebtoken';
import { jwtExpiresIn, jwtSecret } from '../config/env.js';

export const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      sub: userId
    },
    jwtSecret,
    {
      expiresIn: jwtExpiresIn
    }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, jwtSecret);
};
