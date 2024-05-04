// const { connect, connection } = require('mongoose');

// const connectionString = 'mongodb://127.0.0.1:27017/pillzhereDB';

// connect(connectionString);

// module.exports = connection;


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pillzhereDB');

module.exports = mongoose.connection;
