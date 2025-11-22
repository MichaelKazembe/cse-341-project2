// routes/index.js

// handle routes
const router = require("express").Router();

// swagger setup
const swaggerRoute = require("./swagger");
router.use("/", swaggerRoute);

// define a Home page route
router.get("/", (req, res) => {
  //# swagger.tags = ["Home"];
  //# swagger.description = "Home page route";
  res.send("Welcome To The Restaurants API");
});

module.exports = router;
