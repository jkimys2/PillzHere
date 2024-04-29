// const mongoose = require('mongoose');

// const pillzSchema = new mongoose.Schema({
  
//   pillz: { type: String, required: true },
//   pillzCount: Number,
//   dosage: Number,
//   reminder: Boolean,
//   // Use built in date method to get current date
//   lastAccessed: { type: Date, default: Date.now },
// });


// const Pillz = mongoose.model('pillz', pillzSchema);

// const handleError = (err) => console.error(err);

// Pillz
//   .create({
//     pillz: 'Aceteminophin',
//     pillzCount: 2,
//     dosage: 250,
//     reminder: true,
//   })
//   .then(result => console.log('Created new pill', result))
//   .catch(err => handleError(err));

// module.exports = Pillz;

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