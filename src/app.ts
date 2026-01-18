import fastify, { FastifyInstance } from "fastify";
import config from "./config/app.config";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig, swaggerUiConfig } from "./config/swagger.config";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { authRoutes } from "./modules/auth/auth.routes";
import { toDoRoutes } from "./modules/to-do/to-do.routes";
import { errorHandler } from "./middlewares/error.middleware";

export async function buildApp() : Promise<FastifyInstance> {

    const app = fastify({
        logger: {
            level: config.app.nodeEnv === 'development' ? 'info' : 'error',
            transport:
                config.app.nodeEnv === 'development'
                ? {
                    target: 'pino-pretty',
                    options: {
                        translateTime: 'HH:MM:ss Z',
                        ignore: 'pid,hostname',
                    }  
                  }
                : undefined

        }
    });

    await app.register(fastifyCors, {
        origin: true,
        credentials: true
    });

    await app.register(fastifyJwt, {
        secret: config.jwt.secret,
        sign: {
            expiresIn: config.jwt.expiresIn
        }
    });

    await app.register(fastifySwagger, swaggerConfig);
    await app.register(fastifySwaggerUi, swaggerUiConfig);

    app.get('/health', async () => {
        return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        };
    });

    
    const apiPrefix = `${config.app.apiPrefix}/${config.app.apiVersion}`;

    await app.register(authRoutes, { prefix: `${apiPrefix}/auth` });
    await app.register(toDoRoutes, { prefix: `${apiPrefix}/todo` });

    app.setErrorHandler(errorHandler);

    return app;

}