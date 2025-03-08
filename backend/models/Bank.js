const mongoose = require('mongoose');


const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    BIC: {
        type: String,
        required: true
    }
    ,
    IFSC: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Bank', bankSchema);