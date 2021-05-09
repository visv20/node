const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : Number,
        required : true
    },
    address : {
        type : String
    },
    you : {
        type : String
    }
})
const internship = mongoose.model('internship',schema);
module.exports = internship;