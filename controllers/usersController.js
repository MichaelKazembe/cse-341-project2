// controllers/usersController.js

// Import the database module
const db = require("../models/database");
// Import ObjectId from MongoDB to handle unique IDs
const { ObjectId } = require("mongodb");

/* ***************************
 *  Function to handle fetching ALL users
 * ************************** */
async function getAllUsers(req, res) {
  try {
    // Get the database instance
    const database = db.getDatabase();

    // Fetch users from the 'users' collection
    const users = await database.collection("users").find({});

    // Convert the cursor to an array
    const usersArray = await users.toArray();

    // Display The Collection
    console.log("Fetched users:", usersArray);

    // Set the response header to application/json
    res.setHeader("Content-Type", "application/json");

    // Send the users as a JSON response
    res.status(200).json(usersArray);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Function to handle fetching a single user by ID
 * ************************** */
async function getUserById(req, res) {
  const userId = req.params.id;

  try {
    const database = db.getDatabase();

    // Check if userId is a valid ObjectId
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await database
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Function to handle creating a new user
 * ************************** */
async function createUser(req, res) {
  const newUser = req.body;

  try {
    const database = db.getDatabase();

    const result = await database
      .collection("users")
      .insertOne(newUser);

    res.setHeader("Content-Type", "application/json");
    res
      .status(201)
      .json({ message: "User created", userId: result.insertedId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Function to handle updating a user by ID
 * ************************** */
async function updateUserById(req, res) {
  const userId = req.params.id;

  // Validate req.body exists
  if (!req.body) {
    return res.status(400).json({
      error: "Request body is empty. Please provide data to update.",
    });
  }

  try {
    const database = db.getDatabase();

    const userUpdate = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
      address: req.body.address,
      role: req.body.role,
    };

    const result = await database
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: userUpdate }
      );

    if (result.modifiedCount === 0) {
      return res.status(404).send("User not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "User updated!" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Function to handle deleting a user by ID
 * ************************** */
async function deleteUserById(req, res) {
  const userId = req.params.id;

  try {
    const database = db.getDatabase();

    const result = await database
      .collection("users")
      .deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).send("User not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
