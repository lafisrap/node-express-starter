var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BarSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  barid: {
    type: String,
    required: true
  },
  bookedby: {
    type: [String],
    required: true
  },
});

module.exports = mongoose.model('Bar', BarSchema);