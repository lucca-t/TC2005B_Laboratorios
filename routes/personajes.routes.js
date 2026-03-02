const express = require('express');
const router = express.Router();

const personajesController = require('../controller/personajes.controller');



router.get('/new', personajesController.get_add);
router.post('/new', personajesController.post_add);
router.get('/old', personajesController.get_old);
router.get('/', personajesController.get_list);


module.exports = router;
