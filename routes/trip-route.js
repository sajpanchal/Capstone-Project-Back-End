const expressInstance = require("express");
const router = expressInstance.Router();
const tripController = require("../controller/trip-controller");

router.post("/create-trip", async function (req, res, next) {
  try {
    await tripController.createTrip(req, res);
  } catch (err) {
    return next(err);
  }
});
router.delete("/:id", async function (req, res, next) {
  try {
    let tripId = Number(req.params.id, 10);

    if (!req.params.id || !Number.isInteger(tripId)) {
      res.status(400);
      res.send({ error: `Invalid tripId` });
    } else {
      await tripController.deleteTrip(req, res);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
