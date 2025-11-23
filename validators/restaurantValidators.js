const { body, validationResult } = require("express-validator");

// Validator for restaurant data
const restaurantValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Restaurant name is required")
      .isLength({ min: 3 })
      .withMessage("Restaurant name must be at least 3 characters long"),
    body("cuisine")
      .notEmpty()
      .withMessage("Cuisine type is required")
      .isLength({ min: 3 })
      .withMessage("Cuisine type must be at least 3 characters long"),
    body("location")
      .notEmpty()
      .withMessage("Location is required")
      .isLength({ min: 5 })
      .withMessage("Location must be at least 5 characters long"),
    body("rating")
      .notEmpty()
      .withMessage("Rating is required")
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be a number between 0 and 5"),
  ];
};

// Middleware to validateRestaurant request body
const validateRestaurant = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
};

// Export the validator middleware

module.exports = {
  restaurantValidationRules,
  validateRestaurant,
};
