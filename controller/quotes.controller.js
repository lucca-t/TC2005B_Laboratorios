const Quotes = require('../models/quotes.model');

exports.get_quotes = (req, res, next) => {
    const quotes = Quotes.fetchAll();
    res.render('quotes', { quotes });
};

exports.get_about = (req, res, next) => {
    res.render('about');
};

exports.get_add = (req, res, next) => {
    res.render('newquote');
};

exports.post_add = (req, res, next) => {
    const quote = new Quotes(req.body.character, req.body.text);
    quote.save();
    res.redirect('/quotes');
};