const {Schema, model} = require('mongoose');

const pillzSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  frequency: {
    type: String,
  },
  time: {
    type: String,
  },
  notes: {
    type: String,
  },
  paymentType: {
    type: String,
  },  
});

const Pillz = model('Pillz', pillzSchema);

module.exports = Pillz;