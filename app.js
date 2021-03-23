const express = require("express");
const logger = require("morgan");
const app = express();
const { authenticateJWT } = require("./middleware/auth");

const auth_route = require("./routes/auth-route");
const trip_route = require("./routes/trip-route");
const itinerary_route = require("./routes/itinerary-route");
const user_route = require("./routes/user-route");

// Log requests to the console.
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//get auth token for all routes
app.use(authenticateJWT);

// All routes in the app are listed below
app.use("/auth", auth_route);
app.use("/trip", trip_route);
app.use("/itinerary", itinerary_route);
app.use("/user", user_route);

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "development") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
