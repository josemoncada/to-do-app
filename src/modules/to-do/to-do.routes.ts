import { FastifyInstance } from 'fastify';
import { authenticate } from '../../middlewares/auth.middleware';
import { ToDoPaginationQuerySchema } from './types/to-do-pagination-query.schema';
import { buildToDoModule } from './to-do.module';
import { ToDoDtoSchema } from './dtos/to-do.dto';
import { PaginationResultSchema } from '../../commons/pagination/pagination-result.schema';

export async function toDoRoutes(fastify: FastifyInstance) {

  const { toDoController } = buildToDoModule();

  fastify.addHook('preHandler', authenticate);

  const createToDoSchema = {
    description: 'Registro de una nueva tarea',
    tags: ['ToDo'],
    security: [{ bearerAuth: [] }],
    body: {
      type: 'object',
      required: ['name', 'priority'],
      properties: {
        name: { type: 'string', description: 'Nombre de la tarea' },
        priority: {
          type: 'string',
          enum: ['baja', 'media', 'alta'],
          description: 'Prioridad de la tarea'
        }
      }
    },
    response: {
      201: {
        description: 'Tarea creada exitosamente',
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: ToDoDtoSchema
        }
      }
    }
  };

  const updateToDoSchema = {
    description: 'Actualización de una tarea existente',
    tags: ['ToDo'],
    security: [{ bearerAuth: [] }],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', description: 'ID de la tarea' }
      }
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        priority: { type: 'string', enum: ['baja', 'media', 'alta'] },
        isCompleted: { type: 'boolean' }
      }
    },
    response: {
      200: {
        description: 'Tarea actualizada exitosamente',
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: ToDoDtoSchema
        }
      }
    }
  };

  const listToDosSchema = {
    description: 'Obtiene la lista de tareas con paginación y filtros',
    tags: ['ToDo'],
    security: [{ bearerAuth: [] }],
    querystring: ToDoPaginationQuerySchema,
    response: {
      200: {
        description: 'Lista de tareas',
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { type: 'array', items: ToDoDtoSchema },
          pagination: PaginationResultSchema
        }
      }
    }
  };

  const getToDoByIdSchema = {
    description: 'Obtiene una tarea específica por ID',
    tags: ['ToDo'],
    security: [{ bearerAuth: [] }],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' }
      }
    },
    response: {
      200: {
        description: 'Tarea encontrada',
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: ToDoDtoSchema
        }
      }
    }
  };

  const deleteToDoSchema = {
    description: 'Elimina una tarea por ID',
    tags: ['ToDo'],
    security: [{ bearerAuth: [] }],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' }
      }
    },
    response: {
      200: {
        description: 'Tarea eliminada exitosamente',
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' }
        }
      }
    }
  };

  fastify.post(
    '/create',
    { schema: createToDoSchema },
    toDoController.create.bind(toDoController)
  );

  fastify.patch(
    '/update/:id',
    { schema: updateToDoSchema },
    toDoController.update.bind(toDoController)
  );

  fastify.get(
    '/list',
    { schema: listToDosSchema },
    toDoController.list.bind(toDoController)
  );

  fastify.get(
    '/list/:id',
    { schema: getToDoByIdSchema },
    toDoController.getById.bind(toDoController)
  );

  fastify.delete(
    '/list/:id',
    { schema: deleteToDoSchema },
    toDoController.delete.bind(toDoController)
  );
}