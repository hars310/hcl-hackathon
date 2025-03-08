const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({ 
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
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);