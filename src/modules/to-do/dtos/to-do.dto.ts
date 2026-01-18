import { Type, Static } from '@sinclair/typebox';

export const ToDoDtoSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    priority: Type.String(),
    isCompleted: Type.Boolean(),
    userId: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { additionalProperties: false }
);

export type ToDoDto = Static<typeof ToDoDtoSchema>;