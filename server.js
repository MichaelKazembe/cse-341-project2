// server.js

// Import the Express framework
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
require("dotenv").config();

// Import the body-parser middleware
const bodyParser = require("body-parser");

// Import routes
const homeRoute = require("./routes");
const restaurantsRoute = require("./routes/restaurants");
const usersRoute = require("./routes/users");
const swaggerRoute = require("./routes/swagger");

const mongodb = require("./models/database");

// Create an instance of an Express application
const app = express();

/** ***************************
 * Define the port the server will listen on
 * ****************************
 */
const PORT = process.env.PORT || 3000;

/** ***************************
 * Middleware setup
 * ****************************
 */
// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// initialize passport on every route call
app.use(passport.initialize());
// enable persistent login with passportjs
app.use(passport.session());

// CORS Middleware to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(cors({ methods: ["GET, POST, PUT, PATCH, DELETE, OPTIONS"] }));
app.use(cors({ origin: "*" }));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serialize and Deserialize a user
passport.serializeUser((user, done) => {
  done(nill, user);
});

passport.serializeUser((user, done) => {
  done(nill, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged In as ${req.session.user.displayName}`
      : `Logged Out`
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

/** ***************************
 * Mount routes
 * ****************************
 */

// define Home page route
app.use("/", homeRoute);

// define `restaurants` route for all restaurants
app.use("/restaurants", restaurantsRoute);

// define `users` route for all restaurants
app.use("/users", usersRoute);

// mount swagger UI routes at /api-docs
app.use("/api-docs", swaggerRoute);

// 404 Error Handling Middleware
app.use((req, res, next) => {
  const url = req.originalUrl;
  res.status(404).send(`404 error - ${url} not found`);
});

/** ***************************
 * Start the server
 * ****************************
 */

// Initialize MongoDB connection
mongodb.initializeDB((err) => {
  if (err) {
    console.error("Failed to initialize database", err);
    process.exit(1);
  } else {
    // Start the server and listen on the defined port
    app.listen(PORT, () => {
      console.log(`Database Server is listening and running on port:${PORT}`);
    });
  }
});
