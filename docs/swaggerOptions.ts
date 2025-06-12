import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const swaggerOptions: Parameters<typeof swaggerJSDoc>[0] = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos y Autenticación',
      version: '1.0.0',
      description: 'Documentación de la API usando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
   apis: [path.resolve(__dirname, '../src/routes/*.ts')],
// Aquí se buscan las anotaciones
};

export default swaggerOptions;
