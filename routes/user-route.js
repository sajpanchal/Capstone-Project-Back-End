const expressInstance = require("express");
const jsonschema = require("jsonschema");
const router = expressInstance.Router();
const userController = require("../controller/user-controller");
const { ensureLoggedIn } = require("../middleware/auth");
const userUpdateSchema = require("../schemas/user-update.json");

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    let userId = Number(req.params.id, 10);

    if (!req.params.id || !Number.isInteger(userId)) {
      res.status(400);
      res.send({ error: `Invalid userID` });
    } else {
      await userController.delete(req, res);
    }
  } catch (err) {
    return next(err);
  }
});


router.put("/:id/edit", async function (req, res, next) {
  try {
    // Check if the req body has all the required parameters to complete a update user request
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const err = validator.errors.map((e) => e.stack)[0];
      console.error("Schema error on user update", err);
      res.status(400);
      res.send({ error: err });
    } else {
      await userController.update(req, res);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
