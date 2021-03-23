/** Middleware for handling req authorization for routes. */
const jwt = require("jsonwebtoken");
const express = require("express");
const session = require("express-session");
const app = express();
app.use(session);

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "development" ? 1 : 12;
const SECRET_KEY = process.env.SECRET_KEY || "development-secret";

/** Middleware: Authenticate user. */

function createToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
}

// function ensureLoggedIn(req, res, next) {
//   try {
//     const tokenFromCookie = req.cookies.token;
//     if (!tokenFromCookie) {
//       res.status(401).send("Unauthorized: No token provided");
//     } else {
//       jwt.verify(tokenFromCookie, secret, function (err, decoded) {
//         if (err) {
//           res.status(401).send("Unauthorized: Invalid token");
//         } else {
//           req.username = decoded.username;
//           next();
//         }
//       });
//     }
//     // return next();
//   } catch (err) {
//     return next();
//   }
// }

/** Middleware: Requires user to be authenticated. */

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return next({
      status: 401,
      message: "Unauthorized to perform this operation",
    });
  }
  return next();
}
function authenticateJWT(req, res, next) {
  try {
    tokenFromHeader = req.headers.token;
    if (!tokenFromHeader) {
      req.user = null;
      console.log(`Request from a logged out user`);
    } else {
      const payload = jwt.verify(tokenFromHeader, SECRET_KEY);
      console.log(
        `request from user with username=${payload.username} and userid=${payload.id}`
      );
      req.user = payload;
    }

    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware: Requires correct userid to perform any action on the userid. */

function ensureCorrectUser(req, res, next) {
  try {
    if (req.user.id === req.params.id) {
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
  createToken,
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
};
