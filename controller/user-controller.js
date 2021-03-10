const db = require("../database/models/index");
const Op = require("Sequelize").Op;
const bcryptjs = require("bcryptjs");
const { BCRYPT_WORK_FACTOR } = require("../middleware/auth");

module.exports = {
  login(req, res) {
    db.User.findAll({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (user.length === 1) {
          bcryptjs
            .compare(req.body.password, user[0].password)
            .then((passwordMatch) => {
              if (!passwordMatch) {
                return res.status(401).json({
                  message: "Authentication failed",
                });
              } else {
                req.session.user = {
                  id: user[0].id,
                  username: user[0].username,
                };
                res.status(200).send({
                  message: `User with id: ${user[0].id} loggedin successfully`,
                });
              }
            });
        } else if (user.length === 0) {
          res.status(401);
          res.send({ error: `Invalid username or password` });
        } else {
          res.status(400);
          res.send({ error: "Something went wrong, try again" });
        }
      })
      .catch((error) => {
        console.log(`error in login: ${error}`);
        res.status(401).send({ error: "Login failed" });
      });
  },
  signup(req, res) {
    db.User.findAll({
      where: {
        [Op.or]: [
          {
            username: req.body.username,
          },
          {
            email: req.body.email,
          },
        ],
      },
    })
      .then((user) => {
        if (user.length !== 0) {
          res.status(400);
          res.send({ error: `This username or email already exists` });
        } else {
          bcryptjs
            .hash(req.body.password, BCRYPT_WORK_FACTOR)
            .then((hashedPassword) => {
              db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
              }).then((newUser) => {
                req.session.user = {
                  id: newUser.id,
                  username: newUser.username,
                };
                res.status(201).send({
                  message: `User with id ${newUser.id} created successfully`,
                });
              });
            });
        }
      })
      .catch((error) => {
        console.log(`error in creating user: ${error}`);
        res.status(400).send({ error: "User creation failed" });
      });
  },
  delete(req, res) {
    if (!req.session.user.id || req.params.id != req.session.user.id) {
      res.status(401).send({ message: "Unathorized to delete this user" });
    } else {
      db.User.destroy({
        where: { id: req.params.id },
      })
        .then((result) => {
          if (result) {
            req.session.user = null;
            res.status(202).send({ message: "User deleted successfully" });
          } else res.status(404).send({ error: "User deletion failed" });
        })
        .catch((error) =>
          res.status(404).send({ error: "Something went wrong, try again" })
        );
    }
  },
};
