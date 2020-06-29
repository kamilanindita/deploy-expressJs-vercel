var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

// Create model from the schema
var Role = mongoose.model("Role", RoleSchema);

// Export model
module.exports = Role;