const express = require("express");
const router = new express.Router();

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    return res.json({ username, password });
  } catch (err) {
    return next(err);
  }
});

router.post("/signup", async function (req, res, next) {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    let msg = "this is working";
    return res.json({ message: msg });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
