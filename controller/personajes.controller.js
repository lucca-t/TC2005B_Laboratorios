const Personaje = require('../models/personaje.model');
const Tipo = require('../models/tipo.model');


exports.get_add = async (req, res, next) => {
    try {
        const [tipos] = await Tipo.fetchAll();
        res.render('new', { tipos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching tipos');
    }
};


exports.post_add = async (req, res, next) => {
    const personaje = new Personaje(
        req.body.nombre,
        req.body.descripcion,
        req.body.tipo,
        req.body.imagen
    );
    try {
        await personaje.save();
        res.redirect('/personajes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving personaje');
    }
};

exports.get_old = (req, res, next) => {
    const path = require('path');
    res.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
};


exports.get_list = async (req, res, next) => {
    try {
        const [personajes] = await Personaje.fetchAll();
        res.render('personajes', { personajes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching personajes');
    }
};