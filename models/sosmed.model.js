var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var SosmedSchema = new Schema({
  instagram: {
    type: String
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  line: {
    type: String
  }
});

// Create model from the schema
var Sosmed = mongoose.model("Sosmed", SosmedSchema);

// Export model
module.exports = Sosmed;