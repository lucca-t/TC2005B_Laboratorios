const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const personajesController = require('../controller/personajes.controller');

router.get('/new', isAuth, personajesController.get_add);
router.post('/new', isAuth, personajesController.post_add);
router.get('/search', isAuth, personajesController.get_search);
router.get('/old', isAuth, personajesController.get_old);
router.get('/:id/edit', isAuth, personajesController.get_edit);
router.post('/:id/edit', isAuth, personajesController.post_edit);
router.get('/', isAuth, personajesController.get_list);


module.exports = router;
