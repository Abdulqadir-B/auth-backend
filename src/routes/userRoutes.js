import { Router } from 'express';
import { getProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

export const userRouter = Router();

userRouter.get('/profile', authenticate, getProfile);
