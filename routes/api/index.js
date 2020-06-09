const router = require("express").Router();
const transactionRoutes = require("./transactions");

router.use("/transactions", transactionRoutes);

module.exports = router;
