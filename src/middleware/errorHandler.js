export const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({
      message: 'Invalid request data'
    });
  }

  if (error.code === 11000) {
    return response.status(409).json({
      message: 'A user with this email already exists'
    });
  }

  console.error(error);

  return response.status(500).json({
    message: 'Internal server error'
  });
};
