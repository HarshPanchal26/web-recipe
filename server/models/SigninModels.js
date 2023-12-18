const mongoose = require('mongoose');
const validator = require('validator');

// Schema is been is use for Individual account(Investor and Founder)
const SchemaForUsers = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    }
  },
  password : {
    type: String,
    required: true,
  },
  profileImage : {
    type : String,
    required : false,
    default : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'        

  },

})


module.exports = {SchemaForUsers}