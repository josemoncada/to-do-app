import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/auth.middleware";
import { buildAuthModule } from "./auth.module";
import { UserDtoSchema } from "./dtos/user.dto";

export async function authRoutes(fastify: FastifyInstance) {

    const { authController } =  buildAuthModule();

    const registerSchema = {
        description: 'Registro de un nuevo usuario',
        tags: ['Auth'],
        body: {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                name: { type: 'string', description: 'Nombre del Usuario' },
                email: { type: 'string', format: 'email', description: 'Correo del Usuario' },
                password: { type: 'string', minLength: 6, description: 'Contraseña (mínimo 6 caracteres)' }
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

    const loginSchema = {
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

    const meSchema = {
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

    fastify.post(
        '/register',
        { schema: registerSchema },
        authController.register.bind(authController)
    );

    fastify.post(
        '/login',
        { schema: loginSchema },
        authController.login.bind(authController)
    );

    fastify.get(
        '/me',
        { schema: meSchema, preHandler: authenticate },
        authController.getMe.bind(authController)
    );


}