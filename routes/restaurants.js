// routes/restaurants.js

// handle routes
const router = require("express").Router();
// import input validators
const {
  restaurantValidationRules,
  validateRestaurant,
} = require("../validators/restaurantValidators");

// import restaurants controller
const restaurantsController = require("../controllers/restaurantsController");

// import authenticator
const { isAuthenticated } = require("../middleware/authenticate");

// define a restaurants page route
router.get("/", restaurantsController.getAllrestaurants);

// define a restaurants page route for a single restaurant by ID
router.get("/:id", restaurantsController.getRestaurantById);

// define a route to create a new restaurant
router.post(
  "/",
  isAuthenticated,
  restaurantValidationRules(),
  validateRestaurant,
  restaurantsController.createRestaurant
);

// define a route to update a restaurant by ID
router.put(
  "/:id",
  isAuthenticated,
  restaurantValidationRules(),
  validateRestaurant,
  restaurantsController.updateRestaurantById
);

// define a route to delete a restaurant by ID
router.delete(
  "/:id",
  isAuthenticated,
  restaurantsController.deleteRestaurantById
);

module.exports = router;
