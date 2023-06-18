const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  userName : {
    type : String,
    required : [true, 'User Name is required'],
    minlength : [3, 'Username must be at least 3 characters'],
    maxlength : [25, 'Username must be less than 25 characters'],
    // unique : [true, 'Username is already registered'],
    //UNIQUE NO FUNCIONA
    validate: {
      validator: async function (name) {
          const user = await this.constructor.findOne({ userName: name });
          return !user; 
      },
      message: 'Username is already registered'
    } 
  },

  email : {
      type : String,
      required : [true, 'Email is required'],
      max : [30, 'Email must be less than 30 characters'],
      unique : [true, 'Email is already registered'],
      //EMAIL VÁLIDO
      validate: {
        validator: val => !/^$|.+@.+\.com$/.test(val),
        message: 'Please enter a valid email'
      },
      //UNIQUE O VALIDATE
      validate: {
        validator: async function (mail) {
            const user = await this.constructor.findOne({ email: mail });
            return !user; 
        },
        message: 'Email is already registered'
      } 
  },

  password : {
      type : String,
      required : [true, 'Password is required'],
      minlength : [5, 'Password must be at least 5 characters'],
      maxlength : [15, 'Password must be less than 15 characters'] 
  }
      
  }, { timestamps: true });

  UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
});

const User = model('User', UserSchema);

module.exports = User;

