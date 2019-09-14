const express = require('express')  //упрощает разработку back-end (маршруты, mvc)
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
//const cors = require('coes')    //если клиент находится на другом доменне, то мы все равно сможем отвечать нашим серверам
//const morgan = require('morgan')    //красивое логирование запросов(то что происходит с сервером в данный момент)
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/postition');
const keys = require('./config/keys')
const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected.'))
    .catch(error  => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('cors')())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('morgan')('dev'))

app.use('/api/auth/', authRoutes)
app.use('/api/analytics/', analyticsRoutes)
app.use('/api/category/', categoryRoutes)
app.use('/api/order/', orderRoutes)
app.use('/api/position/', positionRoutes)


module.exports = app;
