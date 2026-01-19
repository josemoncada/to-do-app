export const PaginationQuerySchema = {
  type: 'object',
  properties: {
    page: { type: 'integer', minimum: 1, default: 1 },
    limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
    search: { type: 'string' },
    sortBy: { type: 'string' },
    order: { type: 'string', enum: ['ASC', 'DESC'], default: 'DESC' }
  },
  additionalProperties: true
} as const;