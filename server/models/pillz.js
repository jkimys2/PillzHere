const mongoose = require('mongoose');

const pillzSchema = new mongoose.Schema({
  
  pillz: { type: String, required: true },
  pillzCount: Number,
  dosage: Number,
  reminder: Boolean,
  // Use built in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
});


const Pillz = mongoose.model('pillz', pillzSchema);

const handleError = (err) => console.error(err);

Pillz
  .create({
    pillz: 'Aceteminophin',
    pillzCount: 2,
    dosage: 250,
    reminder: true,
  })
  .then(result => console.log('Created new pill', result))
  .catch(err => handleError(err));

module.exports = Pillz;


// MongoDB back end, a GraphQL API, and an Express.js and Node.js server 