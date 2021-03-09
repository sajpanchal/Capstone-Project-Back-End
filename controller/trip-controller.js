const db = require("../database/models/index");
const Op = require("Sequelize").Op;

module.exports = {
  createTrip(req, res) {
    db.Trip.create({
        name: req.body.name,
        description: req.body.description,
        source: req.body.source,
        destination: req.body.destination,
        startDate: req.body.date || new Date(),
        endDate: req.body.date || new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((newTrip) => {
        res.status(201).send({
          message: `new Trip ${newTrip.name} created successfully`,
        });
      });
  },
  deleteTrip(req, res) {
    db.Trip.destroy({ where: { id: req.params.id } })
      .then((result) => {
        if (result)
          res.status(202).send({ message: "Trip deleted successfully" });
        else res.status(404).send({ error: "Trip not found or deletion failed" });
      })
      .catch((error) =>
        res.status(404).send({ error: "Something went wrong, try again" })
      );
  },
};
