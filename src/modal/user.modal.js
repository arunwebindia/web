const mongoose = require('mongoose');
const user_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    phone:{
        type:Number,
        default:null
    },
    hash_password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    info:{
        title:{
            type:String,

        },
        sub_title:{
            type:String,
        },
        position:{
            type:String,
        },
        main_description:{type:String},
        short_description:{type:String}
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user_address'
    }
},{timestamps:true});







user_schema.virtual('id').get(function(){return this._id.toHexString()});
user_schema.set('toJSON',{virtual:true});

const user_model = mongoose.model('user',user_schema);
module.exports = user_model;

