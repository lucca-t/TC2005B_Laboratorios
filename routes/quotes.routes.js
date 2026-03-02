const express = require('express');
const router = express.Router();

const quotesController = require('../controller/quotes.controller');

// Show all quotes
router.get('/', quotesController.get_quotes);

// About page
router.get('/about', quotesController.get_about);

// New Quote Form
router.get('/new', quotesController.get_add);

// Add new quote
router.post('/new', quotesController.post_add);


module.exports = router;
