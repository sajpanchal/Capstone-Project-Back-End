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
};
