//  models/database.js

// Import the dotenv package to manage environment variables
const dotenv = require("dotenv").config();

// Import the MongoDB client
const { MongoClient } = require("mongodb");

// MongoDB connection URI from environment variables
const DB_URL = process.env.MONGODB_URL;

// Initialize database instance variable
let database = null;

// Function to initialize the database connection
async function initializeDB(callback) {
  if (database) {
    console.log("Database is already initialized");
    return callback(null);
  }
  try {
    // Create a new MongoDB client and connect to the database
    const client = new MongoClient(DB_URL);

    // Connect to the MongoDB server
    await client.connect();

    // Set the database instance
    database = client.db();
    console.log("Connected to MongoDB");
    // Invoke the callback with no error
    callback(null, database);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    // Invoke the callback with the error
    callback(err);
  }
}

// Function to get the database instance
function getDatabase() {
  // Check if the database has been initialized
  if (!database) {
    throw new Error("Database not initialized. Call initializeDB first.");
  }
  return database;
}

module.exports = {
  initializeDB,
  getDatabase,
};
