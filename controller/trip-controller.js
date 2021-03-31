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
},

async getTrips(req, res) {
  if (!req.params.id) {
    res.status(401).send({ error: "Unathorized to view this page" });
  } else {
    await db.Trip.findAll({
      where: { fk_organizerid: req.params.id },
    }).then((trips) => {
      if (trips) {
        const tripsFound = trips;
        var result = tripsFound[0];
        res.status(202).send({
          result: result
        });
      } else {
        res.status(404).send({ error: "User does not have any trips" });
      }
    });
  }
},

async getTrip(req, res) {
  if (!req.params.id) {
    res.status(401).send({ error: "Unathorized to view this page" });
  } else {
    await db.Trip.findAll({
      where: { id: req.params.id },
    }).then((trip) => {
      if (trip.length === 1) {
        const tripFound = trip[0];
        res.status(202).send({
          id: tripFound.id,
          name: tripFound.name,
          description: tripFound.description,
          source: tripFound.source,
          destination: tripFound.destination,
          startdate: tripFound.startDate,
          enddate: tripFound.endDate,
          userid: tripFound.fk_organizerid
        });
      } else {
        res.status(404).send({ error: "User does not have any trips" });
      }
    });
  }
},

};
