const mongoose = require('mongoose');
const qualificatioin_schemal = mongoose.Schema({
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

const qualificatioin_modal = mongoose.model('qualification',qualificatioin_schemal)

module.exports = qualificatioin_modal;