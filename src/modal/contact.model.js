const mongoose = require('mongoose');
const contact_schema = mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true});

const contact_model = mongoose.model('contact',contact_schema);
module.exports =contact_model;