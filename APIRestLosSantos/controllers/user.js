const {
    response,
    request
} = require('express')
const bcryptjs = require('bcryptjs')
const user = require('../models/user')

const getUsers = async (req, res = response) => {

    const {limit = 5, from = 0} = req.query

    const query = { status: true};

    const [total, users] = await Promise.all([
        user.countDocuments(query),
        user.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({total, users})
}

const getUserById = async (req, res = response) => {
    const {id} = req.params
    
    const findUser = await user.findById(id)

    res.json({"User" : findUser})
}

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

const updateUser = async(req, res = response) => {
    const { id } = req.params
    
    const {
        _id,
        email,
        password,
        ...resto
    } = req.body

    if(password){
        //Ecriptar contrasenia
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const oldUser = await user.findByIdAndUpdate(id, resto)

    const newUser = await user.findById(id)

    res.json({newUser, oldUser})
}

const deleteUser = async (req, res = response) => {
    const {id} = req.params

    const deletedUser = await user.findByIdAndUpdate(id, {status: false});
    const loggedUser = req.newUser;

    res.json({deletedUser, loggedUser})
}

module.exports = {
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser
}