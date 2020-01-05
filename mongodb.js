const mongoose = require('mongoose');

const DB_ADDRESS = 'mongodb://localhost:27017/nedb';

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
