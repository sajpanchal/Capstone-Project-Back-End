const expressInstance = require("express");
const jsonschema = require("jsonschema");

const router = expressInstance.Router();
const itineraryController = require("../controller/itinerary-controller");
const { ensureLoggedIn } = require("../middleware/auth");
const itineraryUpdationSchema = require("../schemas/update-itinerary.json");
const itineraryCreationSchema = require("../schemas/create-itinerary.json");

router.post(
  "/create-itinerary",
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      let validator = jsonschema.validate(req.body, itineraryCreationSchema);
      if (!validator.valid) {
        const err = validator.errors.map((e) => e.stack)[0];
        console.error("Schema error on itinerary creation", err);
        res.status(400);
        res.send({ error: err });
      } else {
        await itineraryController.createItinerary(req, res);
      }
    } catch (err) {
      return next(err);
    }
  }
);
router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    let itineraryId = Number(req.params.id, 10);

    if (!req.params.id || !Number.isInteger(itineraryId)) {
      res.status(400);
      res.send({ error: `Invalid itineraryID` });
    } else {
      await itineraryController.deleteItinerary(req, res);
    }
  } catch (err) {
    return next(err);
  }
});

router.put(
  "/:id/update-itinerary",
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      let validator = jsonschema.validate(req.body, itineraryUpdationSchema);
      if (!validator.valid) {
        const err = validator.errors.map((e) => e.stack)[0];
        console.error("Schema error on itinerary updation", err);
        res.status(400);
        res.send({ error: err });
      } else {
        await itineraryController.updateItinerary(req, res);
      }
    } catch (err) {
      return next(err);
    }
  }
);

//tripID - get all itinerary of trip
router.get("/:id/itinerary", async function (req, res, next) {
  try {
    let itinerary = Number(req.params.id, 10);
    if (!req.params.id || !Number.isInteger(itinerary)) {
      res.status(400);
      res.send({ error: `Invalid trip ID` });
    } else {
      await itineraryController.getItineraries(req, res);
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
      await itineraryController.getItinerary(req, res);
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
