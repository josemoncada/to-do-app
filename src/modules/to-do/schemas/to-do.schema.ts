import { PaginationQuerySchema } from "../../../commons/schemas/pagination-query.schema";
import { PaginationResultSchema } from "../../../commons/schemas/pagination-result.schema";
import { ToDoDtoSchema } from "../dtos/to-do.dto";

export const ToDoPaginationQuerySchema = {
  ...PaginationQuerySchema,
  properties: {
    ...PaginationQuerySchema.properties,
    priority: { type: 'string', enum: ['baja', 'media', 'alta'] },
    isCompleted: { type: 'boolean' },
    sortBy: {
      type: 'string',
      enum: ['createdAt', 'updatedAt', 'name', 'priority', 'isCompleted'],
      default: 'createdAt',
    },
  },
  additionalProperties: false,
} as const;

export const createToDoSchema = {
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

  export const updateToDoSchema = {
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

  export const listToDosSchema = {
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

  export const getToDoByIdSchema = {
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

  export const deleteToDoSchema = {
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