require("dotenv").config();

const swaggerDefinition = {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
        title: "Gamfibo",
        version: "1.0.0",
        description: "This is a backend server API documentation",
    },
    servers: [
        {
            url: "http://localhost:3001/api", // Base URL for API
            description: "Local server",
        },
        {
            url: "https://gamfibo.herokuapp.com/api", // Base URL for API
            description: "Heroku server",
        },
    ],
    components: {
        securitySchemes: {
            JWT: {
                type: "apiKey",
                in: "header",
                name: "authorization",
                description:
                    'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
            },
            language: {
                type: "apiKey",
                in: "header",
                name: "Language",
                description: "Language header to define language preference",
            },
        },
        schemas: {
            AccountDetails: {
                type: "object",
                properties: {
                    type: {
                        type: "boolean",
                    },
                    data: {
                        type: "object",
                    },
                    message: {
                        type: "string",
                    },
                },
            },
            Transaction: {
                type: "object",
                properties: {
                    type: {
                        type: "boolean",
                    },
                    data: {
                        type: "object",
                    },
                    message: {
                        type: "string",
                    },
                },
            },
            User: {
                type: "object",
                properties: {
                    type: {
                        type: "boolean",
                    },
                    data: {
                        type: "object",
                    },
                    message: {
                        type: "string",
                    },
                },
                // properties:
                // _id:
                //   type: string
                //   description: The user's unique identifier
                // email:
                //   type: string
                //   format: email
                //   description: The user's email address
                // username:
                //   type: string
                //   description: The user's username
                // phoneNumber:
                //   type: string
                //   description: The user's phone number
            },
        },
    },
    security: [
        {
            JWT: [],
            language: [],
        },
    ],
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"],
};

module.exports = {
    swaggerDefinition,
    apis: ["./Controllers/**/*.js"], // Path to the API docs
};
