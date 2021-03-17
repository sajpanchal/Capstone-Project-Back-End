const express = require("express");
const jsonschema = require("jsonschema");
const router = new express.Router();
const userController = require("../controller/user-controller");
const { ensureLoggedIn } = require("../middleware/auth");
const userLoginSchema = require("../schemas/user-login.json");
const userSignupSchema = require("../schemas/user-signup.json");

router.post("/login", async function (req, res, next) {
  try {
    // Check if the req body has all the required parameters to complete a login request
    const validator = jsonschema.validate(req.body, userLoginSchema);
    if (!validator.valid) {
      const err = validator.errors.map((e) => e.stack)[0];
      console.error("Schema error on user login", err);
      res.status(400);
      res.send({ error: err });
    } else {
      await userController.login(req, res);
    }
  } catch (err) {
    return next(err);
  }
});

router.post("/signup", async function (req, res, next) {
  try {
    // Check if the req body has all the required parameters to complete a signup request
    const validator = jsonschema.validate(req.body, userSignupSchema);
    if (!validator.valid) {
      const err = validator.errors.map((e) => e.stack)[0];
      console.error("Schema error on user signup", err);
      res.status(400);
      res.send({ error: err });
    } else {
      await userController.signup(req, res);
    }
  } catch (err) {
    return next(err);
  }
});

router.get("/logout", ensureLoggedIn, async function (req, res, next) {
  try {
    req.session.destroy();
    let msg = "User session deleted";
    return res.json({ message: msg });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
