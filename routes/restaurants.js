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

// define a restaurants page route
router.get("/", restaurantsController.getAllrestaurants);

// define a restaurants page route for a single restaurant by ID
router.get("/:id", restaurantsController.getRestaurantById);

// define a route to create a new restaurant
router.post(
  "/",
  restaurantValidationRules(),
  validateRestaurant,
  restaurantsController.createRestaurant
);

// define a route to update a restaurant by ID
router.put(
  "/:id",
  restaurantValidationRules(),
  validateRestaurant,
  restaurantsController.updateRestaurantById
);

// define a route to delete a restaurant by ID
router.delete("/:id", restaurantsController.deleteRestaurantById);

module.exports = router;
