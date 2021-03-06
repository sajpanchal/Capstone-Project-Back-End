const db = require('../database/models/index')
const Op = require('Sequelize').Op


module.exports = {
    login(req,res) {
        db.User.findAll({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        .then((user) => {
            if(user.length === 1) {
                res.status(201).send({message: `User with id: ${user[0].id} loggedin successfully`})
            }
            else if(user.length === 0){
                res.status(401)
                res.send({error: `Invalid username or password`})
            }
            else {
                res.status(400)
                res.send({error: "Something went wrong, try again"})
            }   
        })
        .catch((error)=>{
            console.log(`error in login: ${error}`)
            res.status(401).send({error: "Login failed"})
        })
    },
    signup(req, res) {
        db.User.findAll({
            where: {
                [Op.or] : [
                    {
                        username: req.body.username 
                    },
                    {
                        email: req.body.email 
                    }
                ]               
            }
        }).then((user)=> {
            if (user.length !== 0) {
                res.status(400)
                res.send({error: `This username or email already exists`})
            }
            else {
                return db.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }).then( newUser => res.status(201).send({message: `User with id ${newUser.id} created successfully`}))
            }
        })
        .catch((error) => {
            console.log(`error in creating user: ${error}`)
            res.status(400).send({error: "User creation failed"})
        })
    },
    delete(req,res) {
         db.User.destroy({
            where: {id: req.params.id}
        })
        .then((result) => {
            if (result)
                res.status(202).send({ "message": "User deleted successfully"})
            else
                res.status(404).send({ "message": "User not found"})

        }) 
        .catch(error => res.status(404).send({ "error": "User deletion failed"}))
    }
}