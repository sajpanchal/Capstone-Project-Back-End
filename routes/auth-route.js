const express = require("express");
const router = new express.Router();
const userController = require('../controller/user-controller')

router.post("/login", async function (req, res, next) {
  try {
    if(!req.body.username || !req.body.password){
      res.status(400)
      res.send({error:"Mandatory fields missing"})
    }
    else { 
      await userController.login(req,res)}

  } catch (err) {
    return next(err);
  }
});

router.post("/signup", async function (req, res, next) {
  try {

    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email || !req.body.password)  
    {
      res.status(400)
      res.send({ error: `Mandatory fields missing` })
    }
    else {
      await userController.signup(req, res)}
  } catch (err) {
    return next(err);
  }
});

router.post("/logout", async function (req, res, next) {
  try {
    let msg = "User logged out"
    return res.json({ message: msg });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
