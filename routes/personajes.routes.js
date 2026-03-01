const express = require('express');
const router = express.Router();

const personajes = [
    {
        nombre: "Logan Roy",
        descripcion: "Founder and CEO of Waystar Royco, a ruthless media mogul who rules his family and empire with an iron fist. His manipulative nature and refusal to cede control drive the central conflict of the series.",
        tipo: "Patriarch",
        imagen: "https://static.wikia.nocookie.net/succession/images/f/f2/LoganRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230613094149",
    },
    {
        nombre: "Kendall Roy",
        descripcion: "Logan's eldest son and perpetual heir apparent, caught between ambition and insecurity. He oscillates between attempting hostile takeovers of Waystar and crawling back to his father's approval.",
        tipo: "Heir",
        imagen: "https://static.wikia.nocookie.net/succession/images/0/09/KendallRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230613093831",
    },
    {
        nombre: "Roman Roy",
        descripcion: "The youngest Roy son, hiding sharp instincts behind a wall of irreverent humor and self-sabotage. He craves his father's love more than the throne but would never admit it.",
        tipo: "Wildcard",
        imagen: "https://static.wikia.nocookie.net/succession/images/e/e8/RomanRoyCharacterInfobox.png/revision/latest/scale-to-width-down/1000?cb=20230617051956",
    },
    {
        nombre: "Siobhan 'Shiv' Roy",
        descripcion: "Logan's only daughter, a political operative who pivots to the family business believing she can outmaneuver her brothers. Her confidence often blinds her to how little power she actually holds.",
        tipo: "Strategist",
        imagen: "https://static.wikia.nocookie.net/succession/images/8/85/SiobhanRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230614211118",
    },
    {
        nombre: "Greg Hirsch",
        descripcion: "Logan's grand-nephew, a bumbling outsider who stumbles into the Roy orbit and quietly accumulates leverage. His apparent naivete masks a surprising talent for self-preservation.",
        tipo: "Wildcard",
        imagen: "https://static.wikia.nocookie.net/succession/images/5/5e/GregHirschCharacterInfobox.png/revision/latest/scale-to-width-down/1000?cb=20230622215700",
    },
];

const html_header = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="referrer" content="no-referrer">
    <title>Succession</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
</head>
<body>
<section class="section">
    <div class="container">
        <h1 class="title">
            <a href="/personajes" class="has-text-white">Succession</a>
        </h1>
        <p class="subtitle">HBO's Roy family drama</p>
`;

const html_footer = `
    </div>
</section>
</body>
</html>
`;

const html_form = `
    <form action="/personajes/new" method="POST">
        <div class="field">
            <label for="nombre" class="label">Name</label>
            <div class="control">
                <input id="nombre" name="nombre" class="input" type="text" placeholder="e.g. Tom Wambsgans">
            </div>
        </div>
        <div class="field">
            <label for="descripcion" class="label">Description</label>
            <div class="control">
                <input id="descripcion" name="descripcion" class="input" type="text" placeholder="e.g. Shiv's husband and Waystar executive...">
            </div>
        </div>
        <div class="field">
            <label for="tipo" class="label">Role</label>
            <div class="control">
                <input id="tipo" name="tipo" class="input" type="text" placeholder="e.g. Executive">
            </div>
        </div>
        <div class="field">
            <label for="imagen" class="label">Image URL</label>
            <div class="control">
                <input id="imagen" name="imagen" class="input" type="text" placeholder="https://...">
            </div>
        </div>
        <input class="button is-primary" type="submit" value="Save Character">
    </form>
`;

router.get('/new', (request, response, next) => {
    response.send(html_header + html_form + html_footer);
});

router.post('/new', (request, response, next) => {
    console.log(request.body);
    personajes.push(request.body);
    response.send(html_header + html_form + html_footer);
});

// Index
router.use((request, response, next) => {
    let html_index = `
        <a class="button is-primary" href="/personajes/new">New Character</a>
        <a class="button is-link" href="/quotes">Quotes</a>
        <div class="columns is-multiline mt-3">
    `;

    for (let personaje of personajes) {
        html_index += `
            <div class="column is-one-third">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img src="${personaje.imagen}" alt="${personaje.nombre}">
                        </figure>
                    </div>
                    <div class="card-content">
                        <p class="title is-5">${personaje.nombre}</p>
                        <p class="subtitle is-6">${personaje.tipo}</p>
                        <p>${personaje.descripcion}</p>
                    </div>
                </div>
            </div>
        `;
    }

    html_index += `</div>`;
    response.send(html_header + html_index + html_footer);
});

module.exports = router;
