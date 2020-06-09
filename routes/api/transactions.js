const router = require("express").Router();
const transactionsController = require("../../controllers/transactionController");

router.route("/")
    .post(transactionsController.create)
    .get(transactionsController.getAllData)

module.exports = router;
