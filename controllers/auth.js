const bcrypt = require('bcryptjs')
const User = require('../models/User')

//выполнение в случае опред роутов
module.exports.login = function (req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
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

//    user.save().then(() => console.log('User created'))
//};