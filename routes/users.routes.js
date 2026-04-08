const express = require('express');
const router = express.Router();

const usersController = require('../controller/users.controller');

router.get('/login', usersController.get_login);
router.post('/login', usersController.post_login);
router.get('/logout', usersController.get_logout);

router.get('/signup', usersController.get_signup);
router.post('/signup', usersController.post_signup);

module.exports = router;
