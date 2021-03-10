/** Middleware for handling req authorization for routes. */
const jwt = require("jsonwebtoken");
const express = require("express");
const session = require("express-session");
const app = express();
app.use(session);

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "development" ? 1 : 12;
const SECRET_KEY = process.env.SECRET_KEY || "development-secret";

/** Middleware: Authenticate user. */

function authenticateJWT(req, res, next) {
  try {
    const tokenFromBody = req.headers.token;

    const payload = jwt.verify(tokenFromBody, SECRET_KEY);

    req.user = payload; // create a current user
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware: Requires user to be authenticated. */

function ensureLoggedIn(req, res, next) {
  if (req.session.user) {
    next(); //If session exists, proceed to page
  } else {
    //Error, trying to access a logged in page!
    return next({
      status: 401,
      message: "Please login first to access this route",
    });
  }
}

/** Middleware: Requires correct userid to perform any action on the userid. */

function ensureCorrectUser(req, res, next) {
  try {
    if (req.session.user.id === req.params.id) {
      return next();
    } else {
      return next({ status: 401, message: "Unauthorized" });
    }
  } catch (err) {
    // errors would happen here if we made a request and req.user is undefined
    return next({ status: 401, message: "Unauthorized" });
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
};
