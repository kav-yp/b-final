require('dotenv').config();
require('./mongodb.js');

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500, // from single IP
});

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const ErrorMessage = require('./helpers/res-messages');

const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

const allowedCors = [
  'http://newsexplorer.tk',
  'https://newsexplorer.tk',
  'http://localhost:8080',
  'https://localhost:8080',
  'https://kav-yp.github.io/f-final/',
  'http://kav-yp.github.io/f-final/',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  if (allowedCors.includes(origin)) { // Проверяем, что значение origin есть
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
});

app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/', router);
app.use(errorLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(ErrorMessage.SERVER_CLOSE_TO_CRASH);
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
        ? ErrorMessage.SERVER_ERR
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
