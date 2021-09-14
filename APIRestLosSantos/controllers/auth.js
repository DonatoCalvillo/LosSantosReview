const {
    response,
    request
} = require("express")
const bcryptjs = require('bcryptjs')

const {
    generarJWT
} = require("../helpers/generar-jwt")
const {
    googleVerify
} = require("../helpers/google-verify")
const user = require("../models/user")

const logger = require("../helpers/logger")

const login = async (req, res = response) => {
    const {
        email,
        password
    } = req.body

    try {
        //Verificar si email existe
        const newUser = await user.findOne({
            email
        })

        if (!newUser) {
            return res.status(400).json({
                msg: 'This email it is not register.'
            })
        }

        //Verificar si el usuario esta activo
        if (!newUser.status) {
            return res.status(400).json({
                msg: 'This user was deshabilited'
            })
        }

        //Verificar contrasenia
        const validPassword = bcryptjs.compareSync(password, newUser.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Wrong password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(newUser.id)

        res.json({
            newUser,
            token
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }

}

module.exports = {
    login
}