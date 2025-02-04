
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    // for validation property is defined here
    type: String,
    required: true,
    
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email :{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required : true,
  },
  
  isAdmin: {
    type: Boolean,
    default: false,

},
  

});

const users =  mongoose.model('users', userSchema);
module.exports = users;