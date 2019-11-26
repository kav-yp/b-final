require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
// });

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

/* eslint-disable quotes */
mongoose.connect('mongodb://localhost:27017/nedb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/', router);
app.use(errorLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("The server will crash soon !");
  }, 0);
});

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Global err: An error has occurred on the server.'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
