const express = require('express');
const router = express.Router();

//Middleware - se ejecuta en cada petición
app.use((request, response, next) => {
    console.log('Middleware! Petición recibida');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

// Body parser - para procesar datos de formularios
app.use(bodyParser.urlencoded({extended: false}));

// Ruta principal
app.use('/', (request, response, next) => {
    console.log('Ruta principal /');
    response.send(`
        <h1>¡Hola desde Express!</h1>
        <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/form">Formulario</a></li>
        </ul>
    `);
});

// Ruta /about
app.use('/about', (request, response, next) => {
    response.send('<h1>Página About</h1><a href="/">Regresar</a>');
});

// Ruta /contact
app.use('/contact', (request, response, next) => {
    response.send('<h1>Página Contact</h1><a href="/">Regresar</a>');
});

// Ruta /form - mostrar formulario
app.get('/form', (request, response, next) => {
    response.send(`
        <h1>Formulario de Prueba</h1>
        <form action="/submit-form" method="POST">
            <label>Nombre:</label><br>
            <input type="text" name="nombre" required><br><br>
            
            <label>Mensaje:</label><br>
            <textarea name="mensaje" required></textarea><br><br>
            
            <button type="submit">Enviar</button>
        </form>
        <a href="/">Regresar</a>
    `);
});

// Ruta /submit-form - procesar POST
app.post('/submit-form', (request, response, next) => {
    console.log('Datos recibidos:', request.body);
    response.send(`
        <h1>Datos recibidos:</h1>
        <p><strong>Nombre:</strong> ${request.body.nombre}</p>
        <p><strong>Mensaje:</strong> ${request.body.mensaje}</p>
        <a href="/">Regresar</a>
    `);
});

module.exports = router;
