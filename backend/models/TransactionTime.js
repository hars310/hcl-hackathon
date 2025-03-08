const mongoose = require('mongoose');

const TransactionTime = mongoose.Schema({
    FromBIC: {
        type: String,
        required: true,
        ref: 'Bank' 
    },
    ToBIC: {
        type: String,
        required: true,
        ref: 'Bank' 
    },
    TimeTakenInMinutes: {
        type: Number
    }
})

module.exports = mongoose.model("TransactionTime", TransactionTime)