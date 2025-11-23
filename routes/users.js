// routes/users.js

// handle routes
const router = require("express").Router();
// import input validators
const {
  userValidationRules,
  validateUser,
} = require("../validators/userValidators");

// import users controller
const usersController = require("../controllers/usersController");

// define a users page route
router.get("/", usersController.getAllUsers);

// define a users page route for a single users by ID
router.get("/:id", usersController.getUserById);

// define a route to create a new users
router.post(
  "/",
  userValidationRules(),
  validateUser,
  usersController.createUser
);

// define a route to update a users by ID
router.put(
  "/:id",
  userValidationRules(),
  validateUser,
  usersController.updateUserById
);

// define a route to delete a users by ID
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
