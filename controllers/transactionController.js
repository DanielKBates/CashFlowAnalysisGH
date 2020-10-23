const db = require("../models");
module.exports = {
    create: function (req, res) {
        db.Transaction
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getAllData: function (req, res) {
        db.Transaction 
            .find()
            .sort({startDate: -1})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    update: function (req, res) {
        db.Transaction
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }, 
    getOne: function(req, res) {
        db.Transaction
            .findById({_id: req.params.id})
            .then(transaction => res.json(transaction))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Transaction 
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
   

};
