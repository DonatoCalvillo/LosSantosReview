const {
    response,
    request
} = require('express')
const bcryptjs = require('bcryptjs')
const user = require('../models/user')

const createUser = async (req, res = response) => {
    const {
        name,
        lastName,
        username,
        email,
        password,
        role
    } = req.body;
    const newUser = new user({
        name,
        lastName,
        username,
        email,
        password,
        role
    });

    //Ecriptar contrasenia
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password, salt);

    //Guardar en db
    await newUser.save();

    res.json(newUser);
}

module.exports = {
    createUser
}