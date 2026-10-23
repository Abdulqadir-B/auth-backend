import { verifyAccessToken } from '../utils/jwt.js';

export const authenticate = (request, response, next) => {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return response.status(401).json({
      message: 'Authentication token required'
    });
  }

  const token = authorization.slice(7);

  try {
    const payload = verifyAccessToken(token);

    if (!payload.sub) {
      return response.status(401).json({
        message: 'Invalid authentication token'
      });
    }

    request.userId = payload.sub;
    next();
  } catch {
    return response.status(401).json({
      message: 'Invalid or expired authentication token'
    });
  }
};
