const mongoose = require('mongoose');
const skill_schema = mongoose.Schema({
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

const skill_model = mongoose.model('skill',skill_schema);

module.exports = skill_model;