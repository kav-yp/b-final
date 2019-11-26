const router = require('express').Router();

const articles = require('./articles');
const users = require('./users');
const emptyUrl = require('./emptyUrl');

router.use('/', articles);
router.use('/', users);
router.use('*', emptyUrl);

module.exports = router;
