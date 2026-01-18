import { PaginationQuerySchema } from "../../../commons/pagination/pagination-query.schema";

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