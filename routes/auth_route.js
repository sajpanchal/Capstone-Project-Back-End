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
    const { username, password } = req.body;
    return res.json({ username, password });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
