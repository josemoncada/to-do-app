import { FastifyReply, FastifyRequest, preHandlerHookHandler } from 'fastify';
import { UnauthorizedError } from '../utils/errors.util';

export const authenticate: preHandlerHookHandler = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    throw new UnauthorizedError('Token inválido o expirado');
  }
};
