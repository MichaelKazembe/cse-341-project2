// controllers/restaurantsController.js

// Import the database module
const db = require("../models/database");
// Import ObjectId from MongoDB to handle unique IDs
const { ObjectId } = require("mongodb");

/* ***************************
 *  Function to handle fetching ALL restaurants
 * ************************** */
async function getAllrestaurants(req, res) {
  try {
    // Get the database instance
    const database = db.getDatabase();

    // Fetch restaurants from the 'restaurants' collection
    const restaurants = await database.collection("restaurants").find({});

    // Convert the cursor to an array
    const restaurantsArray = await restaurants.toArray();

    // Display The Collection
    console.log("Fetched restaurants:", restaurantsArray);

    // Set the response header to application/json
    res.setHeader("Content-Type", "application/json");

    // Send the restaurants as a JSON response
    res.status(200).json(restaurantsArray);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Function to handle fetching a single restaurant by ID
 * ************************** */
async function getRestaurantById(req, res) {
  const restaurantId = req.params.id;

  try {
    const database = db.getDatabase();

    // Check if restaurantId is a valid ObjectId
    if (!ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ error: "Invalid restaurant ID format" });
    }

    const restaurant = await database
      .collection("restaurants")
      .findOne({ _id: new ObjectId(restaurantId) });

    if (!restaurant) {
      return res.status(404).send("Restaurant not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Function to handle creating a new restaurant
 * ************************** */
async function createRestaurant(req, res) {
  const newRestaurant = req.body;

  try {
    const database = db.getDatabase();

    const result = await database
      .collection("restaurants")
      .insertOne(newRestaurant);

    res.setHeader("Content-Type", "application/json");
    res
      .status(201)
      .json({ message: "Restaurant created", restaurantId: result.insertedId });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Function to handle updating a restaurant by ID
 * ************************** */
async function updateRestaurantById(req, res) {
  const restaurantId = req.params.id;

  // Validate req.body exists
  if (!req.body) {
    return res.status(400).json({
      error: "Request body is empty. Please provide data to update.",
    });
  }

  try {
    const database = db.getDatabase();

    const restaurantUpdate = {
      name: req.body.name,
      cuisine: req.body.cuisine,
      location: req.body.location,
      rating: req.body.rating,
    };

    const result = await database
      .collection("restaurants")
      .updateOne(
        { _id: new ObjectId(restaurantId) },
        { $set: restaurantUpdate }
      );

    if (result.modifiedCount === 0) {
      return res.status(404).send("Restaurant not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Restaurant updated!" });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Function to handle deleting a restaurant by ID
 * ************************** */
async function deleteRestaurantById(req, res) {
  const restaurantId = req.params.id;

  try {
    const database = db.getDatabase();

    const result = await database
      .collection("restaurants")
      .deleteOne({ _id: new ObjectId(restaurantId) });

    if (result.deletedCount === 0) {
      return res.status(404).send("Restaurant not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Restaurant deleted!" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllrestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
};
