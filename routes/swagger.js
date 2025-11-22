// routes/swagger.js

const router = require("express").Router();

// Import Swagger UI
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

// Setup Swagger UI
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;