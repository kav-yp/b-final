const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const {
  createArticle,
  getArticles,
  removeArticle,
} = require('../controllers/articles');

router.get('/articles', auth, getArticles);

router.post('/articles', auth,
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required().min(9),
      source: Joi.string().required().min(8),
      link: Joi.string().required().regex(
        // eslint-disable-next-line no-useless-escape
        /^(http:[\/][\/]|https:[\/][\/])(((\d{1,3}[\.]){3}\d{1,3}([:]\d{2,5})?)[\/]?|(w{3}[\.])?\w+([\.]\w+)?([^www][\.][a-zA-Z]{2,5})([\/]\w+)*(#)?[\/]?)/,
      ).min(8),
      image: Joi.string().required().regex(
        // eslint-disable-next-line no-useless-escape
        /^(http:[\/][\/]|https:[\/][\/])(((\d{1,3}[\.]){3}\d{1,3}([:]\d{2,5})?)[\/]?|(w{3}[\.])?\w+([\.]\w+)?([^www][\.][a-zA-Z]{2,5})([\/]\w+)*(#)?[\/]?)/,
      ).min(8),
    }),
  }),
  createArticle);

router.delete('/articles/:id', auth,
  celebrate({
    body: Joi.object().keys({
      id: Joi.string().length(24),
    }),
  }),
  removeArticle);

module.exports = router;

// keyword — ключевое слово, по которому статья нашли. Обязательное поле-строка.
// title — заголовок статьи. Обязательное поле-строка.
// text — текст статьи. Обязательное поле-строка.
// date — дата статьи. Обязательное поле-строка.
// source — источник статьи. Обязательное поле-строка.
// link — ссылка на статью. Обязательное поле-строка. Должно быть URL-адресом.
// image — ссылка на иллюстрацию к статье. Обязательное поле-строка. Должно быть URL-адресом.
// owner — _id пользователя, сохранившего статью. Нужно задать поведение по умолчанию,
//  чтобы база данных не возвращала это поле
