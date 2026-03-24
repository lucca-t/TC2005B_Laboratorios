const express = require('express');
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const multer = require('multer');
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        callback(null, `${Date.now()}-${safeName}`);
    },
});

const fileFilter = (request, file, callback) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('archivo'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
    res.locals.username = req.session.username || '';
    res.locals.permisos = req.session.permisos || [];
    next();
});

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});


const rutas_personajes = require('./routes/personajes.routes');
const rutas_quotes = require('./routes/quotes.routes');

app.use('/personajes', rutas_personajes);
app.use('/quotes', rutas_quotes);

const rutas_usuarios = require('./routes/users.routes');
app.use('/users', rutas_usuarios);

app.get('/', (request, response, next) => {
    response.redirect('/personajes');
});

app.use((request, response, next) => {
    response.status(404).render('404');
});

app.listen(3000);