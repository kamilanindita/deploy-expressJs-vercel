const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var UserSchema = new Schema({
  id_role: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }],
  id_sosmed: [{
    type: Schema.Types.ObjectId,
    ref: 'Sosmed'
  }],
  id_otherplatform: [{
    type: Schema.Types.ObjectId,
    ref: 'Otherplatform'
  }],
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verification: {
    type: Number,
    required: true
  },
  create_at: {
    type: Date
  },
  update_at: {
    type: Date
  }
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.update_at = now;
  this.create_at = now;

  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
})

UserSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

// Create model from the schema
var User = mongoose.model("User", UserSchema);

// Export model
module.exports = User;
