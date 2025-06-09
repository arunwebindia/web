const mongoose = require('mongoose');
const social_schema =  mongoose.Schema({
    icon_name:{
        type:String,
    },
    url:{
        type:String,
    }

},{timestamps:true})

const social_model = mongoose.model('social',social_schema);
module.exports = social_model;