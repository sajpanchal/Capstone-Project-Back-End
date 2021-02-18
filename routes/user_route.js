const expressInstance = require("express");
const router = expressInstance.Router();
const userController = require("../controller/user_controller");

router.route("/user/:id");

module.exports = router;
