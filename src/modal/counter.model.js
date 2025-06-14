const mongoose = require('mongoose');
const counter_schema = mongoose.Schema({
    visits:{
        type:Number,
        default:0
    }
})

const counter_model = mongoose.model('counter',counter_schema);
module.exports = counter_model;