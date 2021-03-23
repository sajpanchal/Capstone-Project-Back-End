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
module.exports = router;
