const express = require('express');
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const rutas_personajes = require('./routes/personajes.routes');
const rutas_quotes = require('./routes/quotes.routes');

app.use('/personajes', rutas_personajes);
app.use('/quotes', rutas_quotes);

app.get('/', (request, response, next) => {
    response.redirect('/personajes');
});

app.use((request, response, next) => {
    response.status(404).render('404');
});

app.listen(3000);