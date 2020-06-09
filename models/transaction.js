const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
    name : {type: String, required: true},
    dollarAmt : {type: Number, required: true},
    income :{type: Boolean, required: true},
    reoccuring: {type: Boolean, required: true},
    category : {type: Number},
    startDate: {type: Date, required:true},
    endDate: {type: Date},
    frequency:{ type: Number}
});
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
    