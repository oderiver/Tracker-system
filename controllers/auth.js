const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')

//выполнение в случае опред роутов
module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate){
        //проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult){
            //Генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            //Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают, попробуйте снова'
            })
        }
    } else {
        //пользователя нет, ошибка
        req.status(404).json({
            message: 'Пользователь с таким email не задан'
        })
    }

};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})   //поиск совпадения

    if(candidate){
        res.status(409).json({
            message: 'Такой пользователь зарегистрирован'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.passwords
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {

        }
    }
}
