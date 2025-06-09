const mongoose = require('mongoose');
const work_schema = mongoose.Schema({
    image:{
        type:String,
    },
    tile:{
        type:String,
    },
    sub_title:{
        type:String,
    },
    description:{
        type:String,
    },
    start_date:{
        type:Date
    },
    end_date:{
        type:Date
    }
})

const experience_model = mongoose.model('experience',work_schema);
module.exports = experience_model;