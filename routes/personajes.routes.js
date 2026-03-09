const express = require('express');
const router = express.Router();

const personajesController = require('../controller/personajes.controller');



router.get('/new', personajesController.get_add);
router.post('/new', personajesController.post_add);
router.get('/search', personajesController.get_search);
router.get('/old', personajesController.get_old);
router.get('/:id/edit', personajesController.get_edit);
router.post('/:id/edit', personajesController.post_edit);
router.get('/', personajesController.get_list);


module.exports = router;
