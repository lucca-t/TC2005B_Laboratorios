const express = require('express');
const app = express();

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
    response.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>404</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
        </head>
        <body>
        <section class="section">
            <div class="container has-text-centered">
                <h1 class="title">404 - Not Found</h1>
                <p>The route you requested does not exist.</p>
                <a class="button is-link mt-4" href="/personajes">Go Home</a>
            </div>
        </section>
        </body>
        </html>
    `);
});

app.listen(3000);