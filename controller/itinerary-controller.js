const db = require("../database/models/index");
const Op = require("Sequelize").Op;

module.exports = {
  createItinerary(req, res) {
    db.Itinerary.create({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date || new Date(),
      fk_tripid: req.body.fk_tripid,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((newItinerary) => {
        res.status(201).send({
          message: `new Itinerary ${newItinerary.name} created successfully`,
        });
      })
      .catch((error) => {
        console.error("error on itinerary creation:", error);
        res.status(404).send({ error: "Something went wrong, try again" });
      });
  },
  deleteItinerary(req, res) {
    db.Itinerary.destroy({ where: { id: req.params.id } })
      .then((result) => {
        console.log(`param is ${result}`);
        if (result)
          res.status(202).send({ message: "Itinerary deleted successfully" });
        else
          res
            .status(404)
            .send({ error: "Itinerary not found or deletion failed" });
      })
      .catch((error) =>
        res.status(404).send({ error: "Something went wrong, try again" })
      );
  },

  updateItinerary(req, res) {
    if ( !req.params.id ) {
      res.status(401).send({ message: "Unathorized to update this itenarary" });
    } 
    else {
    db.Itinerary.update({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date || new Date(),
      fk_tripid: req.body.fk_tripid,
      updatedAt: new Date(),
    },{
      where: { id: req.params.id }
    })
      .then((existingItinerary) => {
        res.status(201).send({
          message: `updated Itinerary ${existingItinerary.name}  successfully`,
        });
      })
  }
},

async getItineraries(req, res) {
  if (!req.params.id) {
    res.status(401).send({ error: "Unathorized to view this page" });
  } else {
    await db.Itinerary.findAll({
      where: { fk_tripid: req.params.id },
    }).then((itinerary) => {
      if (itinerary) {
        const itineraryFound = itinerary;
        var result = itineraryFound[0];
        res.status(202).send({
          //result: result
          ...itinerary
        });
      } else {
        res.status(404).send({ error: "User does not have any itinerary" });
      }
    });
  }
},

async getItinerary(req, res) {
  if (!req.params.id) {
    res.status(401).send({ error: "Unathorized to view this page" });
  } else {
    await db.Itinerary.findAll({
      where: { id: req.params.id },
    }).then((itinerary) => {
      if (itinerary.length === 1) {
        const itineraryFound = itinerary[0];
        res.status(202).send({
          id: itineraryFound.id,
          name: itineraryFound.name,
          description: itineraryFound.description,
          date: itineraryFound.source,
          tripid: itineraryFound.fk_tripid
        });
      } else {
        res.status(404).send({ error: "Trip does not have any itinerarys" });
      }
    });
  }
},


};
