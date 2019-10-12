
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            title: 'Video Processor API',
            version: '1.0.0'
        },
        host: 'localhost:3000',
        basePath: '/',
        securityDefinitions: {
            "Bearer" : {
                "type": "apiKey",
                "in": "header",
                "name": "Authorization"
            }
        },
        security: [
            {
                "Bearer": []
            }
        ]
    },
    apis: ['./server/routes/*.js'],
};
const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;
