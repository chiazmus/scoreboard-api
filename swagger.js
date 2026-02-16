const swaggerAuto = require("swagger-autogen")();

const doc = {
  info: {
    title: "Scoreboard API",
    description: "This is a simple Scoreboard API for developers looking to make an easy scoreboard system for their games.",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAuto(outputFile, endpointsFiles, doc);