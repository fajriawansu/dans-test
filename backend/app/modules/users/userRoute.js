const express = require('express');
const UserController = require('./userController');
const router = express.Router();


router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.post('/authenticate', UserController.authenticate);

module.exports = router;