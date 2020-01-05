const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/InternalServerError');
const NoAccessError = require('../errors/NoAccessError');
const ErrorMessage = require('../helpers/res-messages');

// # возвращает все сохранённые пользователем статьи

module.exports.getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .then((articles) => {
      // if (articles.length <= 0) {
      //   throw new NotFoundError(ErrorMessage.ENTITIES_EMPTY);
      // }

      res.send({ data: articles });
    })
    .catch(next);
};

// # создаёт статью с переданными в теле
// # keyword, title, text, date, source, link и image

module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => {
      if (!article) {
        throw new InternalServerError(ErrorMessage.SERVER_PROCESS_ERR);
      }
      res.status(201).send({ data: article });
    })
    .catch(next);
};

module.exports.removeArticle = (req, res, next) => {
  const { id } = req.params;

  Article.findById(id).select('+owner')
    .then((article) => {
      if (article === null) {
        throw new NotFoundError(ErrorMessage.ENTITIES_NONE);
      }

      if (article.owner === req.user._id) {
        Article.findOneAndRemove(id)
          .then((data) => {
            if (!data) {
              throw new InternalServerError(ErrorMessage.SERVER_PROCESS_ERR);
            }
            res.status(200).send({ message: `${ErrorMessage.SERVER_SUCCESS}` });
          })
          .catch(next);
      } else {
        throw new NoAccessError(ErrorMessage.SERVER_PERMISSION_ERR);
      }
    })
    .catch(next);
};
