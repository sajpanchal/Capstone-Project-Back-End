const expressInstance = require("express");
const jsonschema = require("jsonschema");

const router = expressInstance.Router();
const itineraryController = require("../controller/itinerary-controller");
const itineraryCreationSchema = require("../schemas/itinerary-schema.json");

router.post("/create-itinerary", async function (req, res, next) {
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
});
router.delete("/:id", async function (req, res, next) {
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

module.exports = router;
