//для обработки запрсов клиента
const express = require('express');
const controller = require('../controllers/analytics');
const router = express.Router();

//localhost:4000/api/overview/
router.get('/overview', controller.overview())
//localhost:4000/api/analytics/
router.get('/analytics', controller.analytics())

module.exports = router;