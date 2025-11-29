// server.js

// Import the Express framework
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

// Import the body-parser middleware
const bodyParser = require("body-parser");

// Import routes
const homeRoute = require("./routes");
const restaurantsRoute = require("./routes/restaurants");
const usersRoute = require("./routes/users");
const swaggerRoute = require("./routes/swagger");

// Import authenticator
const { isAuthenticated } = require("./middleware/authenticate");

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

// basic express session({...}) initialization
app.use(passport.initialize());
// initialize passport on every route call
app.use(passport.session());

// CORS Middleware to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(cors());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findCreate({ githubId: profile.id }, function (err, user){
      return done(null, profile);
      // })
    }
  )
);

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : `Logged out`
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

// Login route to initiate GitHub OAuth
app.get("/login", passport.authenticate("github"));

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
