const db = require('../database/models/index')


module.exports = {
    signup(req, res) {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then( user => res.status(201).send({message: `User with id: ${user.id} created successfully`}))
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