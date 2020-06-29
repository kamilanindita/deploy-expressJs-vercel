var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  }
});

// Create model from the schema
var Category = mongoose.model("Category", CategorySchema);

// Export model
module.exports = Category;