const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { schema: AppointmentSchema } = require('./appointmentModel');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Enter the username'
    },
    password: {
      type: String,
      minlength:8,
      required: 'Enter the password. Password must have at least 8 characters'
    },
    name:{
        type: String,
        required: 'Enter the name'
    },
    surname:{
        type:String,
        required: 'Enter the surname'
    },
    email: {
      type: String,
      required: 'Enter the actor email',
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']    
    },
    validated:{
      type: Boolean,
      default: false
    },
    active:{
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      required: 'Enter the phone number'
    },
    address:{
      type: String,
      required: 'Enter the address'
    },
    photo: {
      data: Buffer, contentType: String
    },
    role: [{
      type: String,
      required: 'Enter the user role(s)',
      enum: ['LAWYER', 'ADMIN', 'DIRECTOR']
    }],
    appointments: [AppointmentSchema]
}, { strict: false, timestamps: true });


UserSchema.pre('save', function(callback) {
    const user = this;
    if (!user.isModified('password')) return callback();

    bcrypt.genSalt(8, function(err, salt) {
        if (err) return callback(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
    console.log('verifying password in actorModel: '+ password);
    if (err) return cb(err);
    console.log('iMatch: '+isMatch);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);