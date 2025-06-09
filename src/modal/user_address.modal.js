const mongoose = require("mongoose");
const user_address = mongoose.Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
    default: "India",
  },
},{timestamps:true});

const address_model = mongoose.model('user_address',user_address);

module.exports = address_model;