const swaggerAuto = require("swagger-autogen")();

const doc = {
  info: {
    title: "Scoreboard API",
    description: "Simple Scoreboard API...",
  },
  host: "scoreboard-api-94dv.onrender.com",
  schemes: ["https", "http"],
  securityDefinitions: {
    ApiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-KEY',
    },
  },
  security: [{ ApiKeyAuth: [] }], 
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAuto(outputFile, endpointsFiles, doc);