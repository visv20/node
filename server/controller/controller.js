var internship = require('../model/model');

const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: " Content cannot be empty!" });
        return;
    }
    const user = new internship({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        you: req.body.you
    })

    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect("/");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occured while creating data inside database'
            });
        });
}

const find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        internship.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "ID not found" });
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retrieving data" })
            })

    } else {

        internship.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occured while retrieving data" })
            });
    }


}



const update = (req, res) => {

    if (!req.body) {
        return res
            .status(401)
            .send({ message: "Data to be updated cannot be empty" })
    }

    const id = req.params.id;

    internship.updateOne({_id: id}, req.body)
        .then(data => {
                if (!data) {
                    res.status(400).status({ message: "Cannot Update user" })
                } else {
                    res.send("User Updated")
                }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update information" })
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id;

    internship.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete" })
            } else {
                res.send({ message: "user deleted " })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete user with id=" + id });
        });

}

module.exports = {
    find,
    create,
    deleteUser,
    update
}