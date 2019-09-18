const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isActive: {
     type:Boolean,
     default: false
    }
})


userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    //before save user hash password
    if (this.password) {
      var salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
  });

  // checking if password is valid
  userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };


  module.exports = mongoose.model('User', userSchema);
  

