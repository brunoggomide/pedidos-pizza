const swaggerJSDoc = require("swagger-jsdoc");

const definition = {
  info: {
    title: "Doc Api",
    version: "1.0",
    description: "Api framework de Software",
  },
  host: "localhost:3001",
  basePath: "/",
};

const options = {
  definition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
