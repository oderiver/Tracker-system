const express = require('express'); //упрощает разработку back-end (маршруты, mvc)
const authRoutes = require('./routes/auth');
const app = express();

app.use('/api/auth/', authRoutes)

module.exports = app;
