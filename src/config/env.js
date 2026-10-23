import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const mongodbUri = process.env.MONGODB_URI;

if (!jwtSecret) {
  throw new Error('JWT_SECRET must be set in the environment');
}

if (!mongodbUri) {
  throw new Error('MONGODB_URI must be set in the environment');
}

export const port = Number(process.env.PORT) || 3000;
export { jwtSecret };
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
export { mongodbUri };
