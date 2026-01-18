import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError, CustomValidationError } from '../utils/errors.util';

export const errorHandler = (
  error: FastifyError | AppError,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
  }

  if (error instanceof CustomValidationError) {
    return reply.status(error.statusCode).send({
      success: false,
      message: error.message,
      errors: error.errors,
      statusCode: error.statusCode
    });
  }

  if (error instanceof AppError && error.isOperational) {
    return reply.status(error.statusCode).send({
      success: false,
      message: error.message,
      statusCode: error.statusCode
    });
  }

  if ('validation' in error && error.validation) {
    return reply.status(400).send({
      success: false,
      message: 'Validation error',
      errors: error.validation,
      statusCode: 400
    });
  }

  if (error.message?.includes('jwt') || error.message?.includes('token')) {
    return reply.status(401).send({
      success: false,
      message: 'Token inválido o expirado',
      statusCode: 401
    });
  }

  const statusCode = error.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message || 'Something went wrong';

  return reply.status(statusCode).send({
    success: false,
    message,
    statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};
