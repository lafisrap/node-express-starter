var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
  carbohydrate_g: {
    type: Number,
    required: true
  },
  protein_g: {
    type: Number,
    required: true
  },
  fat_g: {
    type: String,
    required: true
  },
  kcal: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Food', FoodSchema);  