const mongoose = require('mongoose');
const working_schemal = mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    sub_title:{
        type:String
    },
    descrption:{
        type:String
    },
    short_description:{
        qualification:String,
        college:String,
        percentage:String,
    }
})

const working_model = mongoose.model('working',working_schemal)

module.exports = working_model;