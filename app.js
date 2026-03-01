const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const rutas_personajes = require('./routes/personajes.routes');
app.use('/personajes', rutas_personajes);

app.get('/', (request, response, next) => {
    response.send(`
        <html>
            <body>
                <a href="/personajes">Personajes</a>
            </body>
        </html>
    `);
    
})
app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
})

app.listen(3000);