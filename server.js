// server.js

// Import the Express framework
const express = require("express");

// Import the body-parser middleware
const bodyParser = require("body-parser");

// Import routes
const homeRoute = require("./routes");
const restaurantsRoute = require("./routes/restaurants");

const mongodb = require("./models/database");

// Create an instance of an Express application
const app = express();

/** ***************************
 * Define the port the server will listen on
 * ****************************
 */
const PORT = process.env.PORT || 3000;

/** ***************************
 * Middleware setup
 * ****************************
 */
// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Middleware to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

/** ***************************
 * Mount routes
 * ****************************
 */

// define Home page route
app.use("/", homeRoute);

// define `restaurants` route for all restaurants
app.use("/restaurants", restaurantsRoute);

// 404 Error Handling Middleware
app.use((req, res, next) => {
  const url = req.originalUrl;
  res.status(404).send(`404 error - ${url} not found`);
});

/** ***************************
 * Start the server
 * ****************************
 */

// Initialize MongoDB connection
mongodb.initializeDB((err) => {
  if (err) {
    console.error("Failed to initialize database", err);
    process.exit(1);
  } else {
    // Start the server and listen on the defined port
    app.listen(PORT, () => {
      console.log(`Database Server is listening and running on port:${PORT}`);
    });
  }
});
