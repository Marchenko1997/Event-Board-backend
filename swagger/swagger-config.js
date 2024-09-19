const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Board',
      version: '1.0.0',
      description:
        'An app with an event schedule where you can choose and register for an event',
      contact: {
        name: 'Halyna Marchenko',
        url: 'https://github.com/Marchenko1997',
      },
    },
  },
  apis: ['./routes/*.js'],
  servers: [{ url: 'http://localhost:3000/api-docs' }],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
