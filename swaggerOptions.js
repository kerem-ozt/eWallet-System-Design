require('dotenv').config();

const swaggerDefinition = {
  openapi: '3.0.0', // Specify the OpenAPI version
  info: {
    title: 'Gamfibo',
    version: '1.0.0',
    description: 'This is a backend server API documentation',
  },
  servers: [
    {
      url: 'http://localhost:3001/api', // Base URL for API
      description: 'Local server',
    },
    {
      url: 'https://gamfibo.herokuapp.com/api', // Base URL for API
      description: 'Heroku server',
    }
  ],
  components: {
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
      },
      language: {
        type: 'apiKey',
        in: 'header',
        name: 'Language',
        description: 'Language header to define language preference',
      },
    },
  },
  security: [
    {
      JWT: [],
      language: [],
    },
  ],
  produces: ['application/json', 'application/xml'],
  schemes: ['http', 'https'],
};

module.exports = {
  swaggerDefinition,
  apis: ['./Controllers/**/*.js'], // Path to the API docs
};

// export default {
//   swaggerDefinition: {
//     info: {
//       description: 'This is a backend server',
//       title: 'Swagger',
//       version: '1.0.0',
//     },
//     host: 'localhost:3001/api',
//     basePath: '/',
//     produces: ['application/json', 'application/xml'],
//     schemes: ['http', 'https'],
//     security: [
//       {
//         language: [],
//         JWT: [],
//       },
//     ],
//     securityDefinitions: {
//       JWT: {
//         type: 'apiKey',
//         in: 'header',
//         name: 'authorization',
//         description: '',
//       },
//       language: {
//         type: 'apiKey',
//         in: 'header',
//         name: 'Language',
//       },
//     },
//   },
//   basedir: __dirname, //app absolute path
//   files: ['./Controllers/**.js'], //Path to the API handle folder
// };