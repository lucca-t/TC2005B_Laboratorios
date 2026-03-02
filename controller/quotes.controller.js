const quotes = [
    { character: "Logan Roy", text: "I love you but you are not serious people." },
    { character: "Kendall Roy", text: "I am the eldest boy." },
    { character: "Roman Roy", text: "Everything is always about everything, all the time." },
    { character: "Siobhan Roy", text: "I don't get embarrassed." },
    { character: "Greg Hirsch", text: "You can't make a Tomelette without breaking some Greggs." },
    { character: "Logan Roy", text: "What you're feeling right now, that's the pain of losing." },
    { character: "Kendall Roy", text: "We are nothing." },
];

exports.get_quotes = (req, res, next) => {
    res.render('quotes', { quotes });
};

exports.get_about = (req, res, next) => {
    res.render('about');
};
