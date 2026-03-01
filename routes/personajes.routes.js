const express = require('express');
const router = express.Router();



// Ruta principal - usar GET en vez de USE para que no atrape todas las rutas
router.get('/', (request, response, next) => {
    console.log('Ruta principal /');
    response.send(`
        <h1>¡Hola desde Express!</h1>
        <ul>
            <li><a href="/personajes/about">About</a></li>
            <li><a href="/personajes/contact">Contact</a></li>
            <li><a href="/personajes/form">Formulario</a></li>
        </ul>
    `);
});

// Ruta /about
router.get('/about', (request, response, next) => {
    response.send('<h1>Página About</h1><a href="/personajes">Regresar</a>');
});

// Ruta /contact
router.get('/contact', (request, response, next) => {
    response.send('<h1>Página Contact</h1><a href="/personajes">Regresar</a>');
});

// Ruta /form - mostrar formulario
router.get('/form', (request, response, next) => {
    response.send(`
        <h1>Formulario de Prueba</h1>
        <form action="/submit-form" method="POST">
            <label>Nombre:</label><br>
            <input type="text" name="nombre" required><br><br>
            
            <label>Mensaje:</label><br>
            <textarea name="mensaje" required></textarea><br><br>
            
            <button type="submit">Enviar</button>
        </form>
        <a href="/personajes">Regresar</a>
    `);
});

//Middleware
router.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

router.get('/new', (request, response, next) => {
    response.send(html_header + html_form + html_footer);
});

router.post('/new', (request, response, next) => {
    console.log(request.body);
    personajes.push(request.body);
    response.send(html_header + html_form + html_footer);
})




// Ruta /submit-form - procesar POST
router.post('/submit-form', (request, response, next) => {
    console.log('Datos recibidos:', request.body);
    response.send(`
        <h1>Datos recibidos:</h1>
        <p><strong>Nombre:</strong> ${request.body.nombre}</p>
        <p><strong>Mensaje:</strong> ${request.body.mensaje}</p>
        <a href="/personajes">Regresar</a>
    `);
});

module.exports = router;
