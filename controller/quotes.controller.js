const Quotes = require('../models/quotes.model');

exports.get_quotes = async (req, res, next) => {
  try {
    const [quotes] = await Quotes.fetchAll();
    res.render('quotes', {quotes});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching quotes');
  }
};

exports.get_about = (req, res, next) => {
  res.render('about');
};

exports.get_add = (req, res, next) => {
  res.render('newquote');
};

exports.post_add = async (req, res, next) => {
  try {
    const quote = new Quotes(req.body.character, req.body.text);
    await quote.save();
    res.redirect('/quotes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving quote');
  }
};
