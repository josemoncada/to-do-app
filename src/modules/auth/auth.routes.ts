import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/auth.middleware";
import { buildAuthModule } from "./auth.module";
import { loginSchema, meSchema, registerSchema } from "./schemas/auth.schema";

export async function authRoutes(fastify: FastifyInstance) {

    const { authController } =  buildAuthModule();

    fastify.post(
        '/register',
        { schema: registerSchema, attachValidation: true },
        authController.register.bind(authController)
    );

    fastify.post(
        '/login',
        { schema: loginSchema, attachValidation: true },
        authController.login.bind(authController)
    );

    fastify.get(
        '/me',
        { schema: meSchema, attachValidation: true, preHandler: authenticate },
        authController.getMe.bind(authController)
    );
}