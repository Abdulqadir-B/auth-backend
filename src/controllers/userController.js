import { User } from '../models/User.js';

export const getProfile = async (request, response, next) => {
  try {
    const user = await User.findById(request.userId);

    if (!user) {
      return response.status(404).json({
        message: 'User not found'
      });
    }

    return response.json({
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return next(error);
  }
};
