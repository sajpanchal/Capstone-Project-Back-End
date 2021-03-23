const db = require("../database/models/index");
const Op = require("Sequelize").Op;
const bcryptjs = require("bcryptjs");
const { BCRYPT_WORK_FACTOR } = require("../middleware/auth");
const { createToken } = require("../middleware/auth");

module.exports = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      await db.User.findAll({
        where: {
          username: username,
        },
      }).then((user) => {
        if (user.length === 1) {
          bcryptjs.compare(password, user[0].password).then((passwordMatch) => {
            if (!passwordMatch) {
              return res.status(401).json({
                error: "Authentication failed",
              });
            } else {
              const payload = { username: user[0].username, id: user[0].id };
              let token = createToken(payload);
              res
                .cookie("token", token, { httpOnly: true })
                .cookie("user-id", user[0].id, { httpOnly: true })
                .status(200)
                .json({ token, message: "Login successful" });
            }
          });
        } else if (user.length === 0) {
          res.status(401);
          res.send({ error: `Invalid username or password` });
        } else {
          res.status(400);
          res.send({ error: "Something went wrong, try again" });
        }
      });
    } catch (error) {
      console.log(`error in login: ${error}`);
      res.status(401).send({ error: "Login failed" });
    }
  },
  async signup(req, res) {
    try {
      const { username, password, email, firstName, lastName } = req.body;
      await db.User.findAll({
        where: {
          [Op.or]: [
            {
              username: username,
            },
            {
              email: email,
            },
          ],
        },
      }).then((user) => {
        if (user.length !== 0) {
          res.status(400);
          res.send({ error: `This username or email already exists` });
        } else {
          bcryptjs.hash(password, BCRYPT_WORK_FACTOR).then((hashedPassword) => {
            db.User.create({
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
              password: hashedPassword,
              createdAt: new Date(),
              updatedAt: new Date(),
            }).then((newUser) => {
              const payload = { username: newUser.username, id: newUser.id };
              let token = createToken(payload);
              res
                .cookie("token", token, { httpOnly: true })
                .cookie("user-id", newUser.id, { httpOnly: true })
                .status(200)
                .json({ token, message: "Signup sucessful" });
            });
          });
        }
      });
    } catch (error) {
      {
        console.log(`error in creating user: ${error}`);
        res.status(400).send({ error: "User creation failed" });
      }
    }
  },
  async delete(req, res) {
    if (!req.user || req.params.id != req.user.id) {
      res.status(401).send({ error: "Unathorized to delete this user" });
    } else {
      await db.User.destroy({
        where: { id: req.params.id },
      })
        .then((result) => {
          if (result) {
            req.user = null;
            res.clearCookie("token");
            res.clearCookie("user-id");
            res.status(202).send({ message: "User deleted successfully" });
          } else
            res
              .status(404)
              .send({ error: "User deletion failed or user does not exist" });
        })
        .catch((error) =>
          res.status(404).send({ error: "Something went wrong, try again" })
        );
    }
  },
  async getUserProfile(req, res) {
    if (!req.user || req.params.id != req.user.id) {
      res.status(401).send({ error: "Unathorized to view this profile" });
    } else {
      await db.User.findAll({
        where: { id: req.params.id },
      }).then((user) => {
        if (user.length === 1) {
          const userFound = user[0];
          res.status(202).send({
            username: userFound.username,
            email: userFound.email,
            password: "This password is encrypted by Codejunxion backend",
            firstname: userFound.firstName,
            lastName: userFound.lastName,
          });
        } else {
          res.status(404).send({ error: "User does not exist" });
        }
      });
    }
  },
  async update(req, res) {
    if (!req.params.id) {
      res.status(401).send({ message: "Unathorized to update this user" });
    } else {
      await db.User.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          updatedAt: new Date(),
        },
        {
          where: { id: req.params.id },
        }
      ).then((exitingUser) => {
        res.status(201).send({
          message: `User with id ${exitingUser.id} updated successfully`,
        });
      });
    }
  },
};
