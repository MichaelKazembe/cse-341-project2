const { body, validationResult } = require("express-validator");

// Validator for user data
const userValidationRules = () => {
  return [
    body("firstname")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("lastname")
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email address"),
    body("age")
      .notEmpty()
      .withMessage("Age is required")
      .isInt({ min: 0 })
      .withMessage("Age must be a non-negative integer"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("address")
      .notEmpty()
      .withMessage("Address is required")
      .isLength({ min: 10 })
      .withMessage("Address must be at least 10 characters long if provided"),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(["user", "admin"])
      .withMessage("Role must be either 'user' or 'admin'"),
  ];
};

// Middleware to validateUser request body
const validateUser = (req, res, next) => {
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
  userValidationRules,
  validateUser,
};
