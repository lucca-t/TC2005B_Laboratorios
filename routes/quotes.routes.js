const express = require('express');
const router = express.Router();

const quotes = [
    { character: "Logan Roy", text: "I love you but you are not serious people." },
    { character: "Kendall Roy", text: "I am the eldest boy." },
    { character: "Roman Roy", text: "Everything is always about everything, all the time." },
    { character: "Siobhan Roy", text: "I don't get embarrassed." },
    { character: "Greg Hirsch", text: "You can't make a Tomelette without breaking some Greggs." },
    { character: "Logan Roy", text: "What you're feeling right now, that's the pain of losing." },
    { character: "Kendall Roy", text: "We are nothing." },
];

const html_header = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Succession - Quotes</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
</head>
<body>
<section class="section">
    <div class="container ">
        <h1 class="title ">
            <a href="/personajes" class="has-text-white">Succession</a>
        </h1>
        <p class="subtitle">Memorable Quotes</p>
`;

const html_footer = `
    </div>
</section>
</body>
</html>
`;

router.get('/', (request, response, next) => {
    let html = `<a class="button is-link" href="/personajes">Back to Characters</a><br><br>`;

    for (let q of quotes) {
        html += `
            <article class="message is-dark mb-4">
                <div class="message-body">
                    <p class="is-italic">"${q.text}"</p>
                    <p class="has-text-weight-bold mt-2">- ${q.character}</p>
                </div>
            </article>
        `;
    }

    response.send(html_header + html + html_footer);
});

router.get('/about', (request, response, next) => {
    let html = `
        <a class="button is-link" href="/personajes">Back to Characters</a>
        <div class="content mt-4">
            <p>
                <strong>Succession</strong> is an HBO drama series following the Roy family,
                owners of Waystar Royco, a global media and entertainment conglomerate.
                As patriarch Logan Roy's health deteriorates, his four children scramble
                for control of the empire in a ruthless game of power, betrayal, and dysfunction.
            </p>
            <p>
                Created by Jesse Armstrong, the show ran for four seasons (2018-2023) and
                won multiple Emmy Awards including Outstanding Drama Series.
            </p>
        </div>
    `;
    response.send(html_header + html + html_footer);
});

module.exports = router;
