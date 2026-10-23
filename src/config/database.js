import mongoose from 'mongoose';
import { mongodbUri } from './env.js';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};