const mongoose = require('mongoose');

const { DEV_MONGOD } = require('./config');

mongoose.connect(DEV_MONGOD, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
