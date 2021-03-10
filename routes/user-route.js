const expressInstance = require("express");
const router = expressInstance.Router();
const userController = require("../controller/user-controller");
const { ensureLoggedIn } = require("../middleware/auth");

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

module.exports = router;
