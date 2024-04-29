const {Schema, model} = require('mongoose');

const pillzSchema = new Schema({
  id: { 
    type: String,
    required: true,
  },
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
    required: true,
  },
  frequency: {
    type: String,
    required: true,
 
  },
  payment_type: {
    type: String,
    required: true,
  },  
});

const Pillz = model('Pillz', pillzSchema);

module.exports = Pillz;

// MongoDB back end, a GraphQL API, and an Express.js and Node.js server 