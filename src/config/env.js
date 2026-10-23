import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET must be set in the environment');
}

export const port = Number(process.env.PORT) || 3000;
export { jwtSecret };
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
