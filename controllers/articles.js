const Article = require('../models/article');

const NotFoundError = require('../middlewares/NotFoundError');
const InternalServerError = require('../middlewares/InternalServerError');
const NoAccessError = require('../middlewares/NoAccessError');

// # возвращает все сохранённые пользователем статьи

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError('The list of entities is empty.');
      }

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
        throw new InternalServerError('Create process failed, try again.');
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
        throw new NotFoundError('Havent card, check id pls.');
      }

      if (article.owner === req.user._id) {
        Article.findOneAndRemove(id)
          .then((data) => {
            if (!data) {
              throw new InternalServerError('Create process failed, try again.');
            }
            res.status(200).send({ message: 'Success delete.' });
          })
          .catch(next);
      } else {
        throw new NoAccessError('No permissions, try again.');
      }
    })
    .catch(next);
};
