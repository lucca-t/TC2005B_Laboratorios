const express = require('express');
const router = express.Router();

const quotesController = require('../controller/quotes.controller');
const isAuth = require('../util/is-auth');


router.get('/', isAuth, quotesController.get_quotes);
router.get('/about', isAuth, quotesController.get_about);
router.get('/new', isAuth, quotesController.get_add);
router.post('/new', isAuth, quotesController.post_add);


module.exports = router;
