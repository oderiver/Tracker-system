//для обработки запрсов клиента
const express = require('express');
const controller = require('../controllers/analytics');
const router = express.Router();

//localhost:4000/api/auth/login
router.post('/login', controller.login)
//localhost:4000/api/auth/register
router.post('/register', controller.register)

module.exports = router;