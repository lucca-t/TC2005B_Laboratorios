const Personaje = require('../models/personaje.model');

exports.get_add = (req, res, next) => {
    res.render('new');
};

exports.post_add = (req, res, next) => {
    const personaje = new Personaje(req.body.nombre, 
        req.body.descripcion, req.body.tipo, req.body.imagen);
    personaje.save();
    res.redirect('/personajes');
};

exports.get_old = (req, res, next) => {
    const path = require('path');
    res.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
};

exports.get_list = (req, res, next) => {
    res.render('personajes', { personajes: Personaje.fetchAll() });
};