import { Type, Static } from '@sinclair/typebox';

export const UserDtoSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    email: Type.String({ format: 'email' }),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { additionalProperties: false }
);

export type UserDto = Static<typeof UserDtoSchema>;
