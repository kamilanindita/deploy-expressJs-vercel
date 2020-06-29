var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var OtherplatformSchema = new Schema({
  shopee: {
    type: String
  },
  tokopedia: {
    type: String
  },
  bukalapak: {
    type: String
  },
  olx: {
    type: String
  }
});

// Create model from the schema
var Otherplatform = mongoose.model("Otherplatform", OtherplatformSchema);

// Export model
module.exports = Otherplatform;