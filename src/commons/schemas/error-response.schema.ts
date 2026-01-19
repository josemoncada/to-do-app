export const ErrorResponseSchema = {
  $id: 'ErrorResponse',
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
    statusCode: { type: 'integer' },
    errors: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['success', 'message', 'statusCode'],
  additionalProperties: false,
} as const;