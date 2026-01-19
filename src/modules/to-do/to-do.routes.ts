import { FastifyInstance } from 'fastify';
import { authenticate } from '../../middlewares/auth.middleware';
import { buildToDoModule } from './to-do.module';
import { createToDoSchema, deleteToDoSchema, getToDoByIdSchema, listToDosSchema, updateToDoSchema } from './schemas/to-do.schema';

export async function toDoRoutes(fastify: FastifyInstance) {

  const { toDoController } = buildToDoModule();

  fastify.addHook('preHandler', authenticate);

  fastify.post(
    '/create',
    { schema: createToDoSchema, attachValidation: true },
    toDoController.create.bind(toDoController)
  );

  fastify.patch(
    '/update/:id',
    { schema: updateToDoSchema, attachValidation: true },
    toDoController.update.bind(toDoController)
  );

  fastify.get(
    '/list',
    { schema: listToDosSchema, attachValidation: true },
    toDoController.list.bind(toDoController)
  );

  fastify.get(
    '/list/:id',
    { schema: getToDoByIdSchema, attachValidation: true },
    toDoController.getById.bind(toDoController)
  );

  fastify.delete(
    '/list/:id',
    { schema: deleteToDoSchema, attachValidation: true },
    toDoController.delete.bind(toDoController)
  );
}