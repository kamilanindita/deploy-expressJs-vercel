const mongoose = require('mongoose');


// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var ProductSchema = new Schema({
  id_user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  id_category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  img: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  sold: {
    type: Number,
    required: true
  },
  rate: {
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

ProductSchema.pre('save', function(next){
  now = new Date();
  this.update_at = now;
  if (!this.create_at){
    this.create_at = now;
  }
  next();
})

// Create model from the schema
var Product = mongoose.model("Product", ProductSchema);

// Export model
module.exports = Product;
