import axios from "axios";

export default {
    saveTransaction: function(data) {
        return axios.post("/api/transactions", data);
    },
    getTransactionData: function() {
        return axios.get("/api/transactions")
    }
};
