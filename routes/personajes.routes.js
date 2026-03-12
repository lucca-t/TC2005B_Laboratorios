const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/can-view');
const canCreate = require('../util/can-create');
const personajesController = require('../controller/personajes.controller');

router.get('/new', isAuth, canCreate, personajesController.get_add);
router.post('/new', isAuth, canCreate, personajesController.post_add);
router.get('/search', isAuth, canView, personajesController.get_search);
router.get('/old', isAuth, personajesController.get_old);
router.get('/:id/edit', isAuth, canCreate, personajesController.get_edit);
router.post('/:id/edit', isAuth, canCreate, personajesController.post_edit);
router.get('/', isAuth, canView, personajesController.get_list);


module.exports = router;
