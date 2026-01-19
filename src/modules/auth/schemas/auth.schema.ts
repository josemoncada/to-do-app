import { UserDtoSchema } from "../dtos/user.dto";

export const registerSchema = {
    description: 'Registro de un nuevo usuario',
    tags: ['Auth'],
    body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
            name: { type: 'string', description: 'Nombre del Usuario' },
            email: { type: 'string', format: 'email', description: 'Correo del Usuario' },
            password: { type: 'string', description: 'Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo' }
        }
    },
    response: {
        201: {
            description: 'Usuario registrado exitosamente',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' },
                    data: {
                        type: 'object',
                        properties: {
                            user: UserDtoSchema,
                            token: { type: 'string' }
                        }
                    }
                }
        }
    }
};

export const loginSchema = {
    description: 'Autentificación de Usuario mediante correo y contraseña',
    tags: ['Auth'],
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
        }
    },
    response: {
        200: {
            description: 'Login exitoso',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        user: UserDtoSchema,
                        token: { type: 'string' }
                    }
                }
            }
        }
    }
};

export const meSchema = {
    description: 'Consulta de lo datos del usuario autenticado',
    tags: ['Auth'],
    security: [{ bearerAuth: [] }],
    response: {
        200: {
            description: 'Usuario autenticado',
            type: 'object',
            properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: UserDtoSchema
            }
        }
    }
};