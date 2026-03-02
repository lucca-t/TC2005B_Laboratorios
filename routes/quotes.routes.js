const express = require('express');
const router = express.Router();

const quotesController = require('../controller/quotes.controller');

// Show all quotes
router.get('/', quotesController.get_quotes);

// About page
router.get('/about', quotesController.get_about);

module.exports = router;
