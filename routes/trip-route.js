const expressInstance = require("express");
const router = expressInstance.Router();
const jsonschema = require("jsonschema");
const tripController = require("../controller/trip-controller");
const { ensureLoggedIn } = require("../middleware/auth");
const tripUpdationSchema = require("../schemas/update-trip.json");
const tripCreationSchema = require("../schemas/create-trip.json");

router.post("/create-trip", ensureLoggedIn, async function (req, res, next) {
  try {
    let validator = jsonschema.validate(req.body, tripCreationSchema);
    if (!validator.valid) {
      const err = validator.errors.map((e) => e.stack)[0];
      console.error("Schema error on trip creation", err);
      res.status(400);
      res.send({ error: err });
    } else {
      await tripController.createTrip(req, res);
    }
  } catch (err) {
    return next(err);
  }
});
router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
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

router.put("/:id/update-trip", ensureLoggedIn, async function (req, res, next) {
  try {
    let validator = jsonschema.validate(req.body, tripUpdationSchema);
    if (!validator.valid) {
      const err = validator.errors.map((e) => e.stack)[0];
      console.error("Schema error on trip updation", err);
      res.status(400);
      res.send({ error: err });
    } else {
      await tripController.updateTrip(req, res);
    }
  } catch (err) {
    return next(err);
  }
});

router.get("/:id/trips", async function (req, res, next) {
  try {
    let userId = Number(req.params.id, 10);
    if (!req.params.id || !Number.isInteger(userId)) {
      res.status(400);
      res.send({ error: `Invalid userID` });
    } else {
      await tripController.getTrips(req, res);
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    let tripId = Number(req.params.id, 10);
    if (!req.params.id || !Number.isInteger(tripId)) {
      res.status(400);
      res.send({ error: `Invalid trip id` });
    } else {
      await tripController.getTrip(req, res);
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
