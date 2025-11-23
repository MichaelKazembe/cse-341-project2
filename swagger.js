const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: " Restaurants API",
    description:
      "API documentation for the cse-341 project 2 - Restaurants RESTful API",
  },
  host: process.env.BASE_URL || "localhost:3000",
  schemes:
    process.env.BASE_URL && process.env.BASE_URL.startsWith("https")
      ? ["https"]
      : ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./server.js",
  "./routes/restaurants.js",
  "./routes/index.js",
];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});
