// routes/users.js

// handle routes
const router = require("express").Router();
// import input validators
const {
  userValidationRules,
  validateUser,
} = require("../validators/userValidators");

// import authenticator
const { isAuthenticated } = require("../middleware/authenticate");

// import users controller
const usersController = require("../controllers/usersController");

// define a users page route
router.get("/", usersController.getAllUsers);

// define a users page route for a single users by ID
router.get("/:id", usersController.getUserById);

router.post(
  "/",
  isAuthenticated,
  userValidationRules(),
  validateUser,
  usersController.createUser
);

// define a route to update a users by ID
router.put(
  "/:id",
  isAuthenticated,
  userValidationRules(),
  validateUser,
  usersController.updateUserById
);

// define a route to delete a users by ID
router.delete("/:id", isAuthenticated, usersController.deleteUserById);

module.exports = router;
