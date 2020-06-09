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
            .find(req.body)
            .sort({startDate: -1})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }
};