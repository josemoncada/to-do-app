export const swaggerConfig = {
  swagger: {
    info: {
      title: 'ToDo API REST',
      description: 'REST API para la implementación de autentificación con JWT and administración de tareas (To-Do)',
      version: '1.0.0',
    },
    host: `localhost:${process.env.PORT || 3000}`,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints para la autentificación y administración de usuarios'
      },
      {
        name: 'ToDo',
        description: 'Endpoints para la administración de tareas'
      }
    ],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey' as const,
        name: 'Authorization',
        in: 'header' as const,
        description: 'Introduce el token JWT con el formato: Bearer {token}'
      }
    }
  }
};

export const swaggerUiConfig = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list' as const,
    deepLinking: true
  },
  staticCSP: true,
  transformStaticCSP: (header: string) => header
};