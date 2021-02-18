const express = require("express");

const app = express();
const auth_route = require("./routes/auth_route");
const user_route = require("./routes/user_route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All routes in the app are listed below
app.use("/auth", auth_route);
app.use("/trip", auth_route);
app.use("/itinerary", auth_route);
app.use("/user", user_route);

module.exports = app;
