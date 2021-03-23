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
      fk_organizerid: req.body.fk_organizerid,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((newTrip) => {
        res.status(201).send({
          message: `new Trip ${newTrip.name} created successfully`,
        });
      })
      .catch((error) => {
        console.error("error on trip creation:", error);
        res.status(404).send({ error: "Something went wrong, try again" });
      });
  },
  deleteTrip(req, res) {
    db.Trip.destroy({ where: { id: req.params.id } })
      .then((result) => {
        if (result)
          res.status(202).send({ message: "Trip deleted successfully" });
        else
          res.status(404).send({ error: "Trip not found or deletion failed" });
      })
      .catch((error) =>
        res.status(404).send({ error: "Something went wrong, try again" })
      );
  },

  updateTrip(req, res) {
    if ( !req.params.id ) {
      res.status(401).send({ message: "Unathorized to update this itenarary" });
    } 
    else {
    db.Trip.update({
      name: req.body.name,
      description: req.body.description,
      source: req.body.source,
      destination: req.body.destination,
      startDate: req.body.date || new Date(),
      endDate: req.body.date || new Date(),
      fk_organizerid: req.body.fk_organizerid,
      updatedAt: new Date(),
    },{
      where: { id: req.params.id }
    })
      .then((existingTrip) => {
        res.status(201).send({
          message: ` Trip ${existingTrip.name} updated successfully`,
        });
      })
  }
}
};
