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

exports.get_search = async (req, res, next) => {
    try {
        const query = req.query.q || '';
        const [personajes] = await Personaje.fetchByName(query);
        res.render('search', { personajes, query });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error searching personajes');
    }
};

exports.get_edit = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [[[personaje]], [tipos]] = await Promise.all([
            Personaje.fetchById(id),
            Tipo.fetchAll()
        ]);
        if (!personaje) return res.status(404).render('404');
        res.render('edit', { personaje, tipos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching personaje');
    }
};

exports.post_edit = async (req, res, next) => {
    console.log('post_edit hit, id:', req.params.id, 'body:', req.body);
    try {
        const id = parseInt(req.params.id);
        const personaje = new Personaje(
            req.body.nombre,
            req.body.descripcion,
            req.body.tipo,
            req.body.imagen
        );
        await personaje.update(id);
        res.redirect('/personajes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating personaje');
    }
};

exports.get_old = (req, res, next) => {
    const path = require('path');
    res.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
};


exports.get_list = async (req, res, next) => {
    try {
        const error = req.session.error || '';
        req.session.error = '';
        const [personajes] = await Personaje.fetchAll();
        res.render('personajes', { personajes, error });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching personajes');
    }
};