const mongoose = require('mongoose');
const services_schema = mongoose.Schema({
    icon:{
        type:String,
    },
    title:{
        type:String,
    },
    description:{
        type:String
    },
},{timestamps:true});

const services_model = mongoose.model('service',services_schema);

module.exports = services_model;