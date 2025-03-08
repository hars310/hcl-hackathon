const mongoose  = require("mongoose")

const BankCharges  = mongoose.Schema({
    BIC: { 
        type: String,
        required: true,
        ref: 'Bank' 
    },
    Charge: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("BankCharges", BankCharges)