const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    minlength: 9,
    required: true,
  },
  source: {
    type: String,
    minlength: 8,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: (props) => `${props.value} Invalid Link, Check link pls !`,
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: (props) => `${props.value} Invalid Image link, Check link pls !`,
    },
    required: true,
  },
  owner: {
    type: String,
    minlength: 24,
    // "_id": "5dcbb504db5eb216d8e727de"
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);

// keyword — ключевое слово, по которому статья нашли. Обязательное поле-строка.
// title — заголовок статьи. Обязательное поле-строка.
// text — текст статьи. Обязательное поле-строка.
// date — дата статьи. Обязательное поле-строка.
// source — источник статьи. Обязательное поле-строка.
// link — ссылка на статью. Обязательное поле-строка. Должно быть URL-адресом.
// image — ссылка на иллюстрацию к статье. Обязательное поле-строка. Должно быть URL-адресом.
// owner — _id пользователя, сохранившего статью. Нужно задать поведение по умолчанию,
//  чтобы база данных не возвращала это поле.
