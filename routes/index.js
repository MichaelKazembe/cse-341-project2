// routes/index.js

// handle routes
const router = require("express").Router();

const passport = require("passport");

// swagger setup
const swaggerRoute = require("./swagger");
router.use("/", swaggerRoute);

// define a Home page route
router.get("/", (req, res) => {
  //# swagger.tags = ["Home"];
  //# swagger.description = "Home page route";
  res.send("Welcome To The Restaurants API");
});

// define login
router.get("/login", passport.authenticate("github"), (req, res) => {});

// define logout
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
