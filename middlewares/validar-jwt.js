const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const validarJWT = async(req = request, res = response, next) =>{
    const token = req.header('x-token');

    //Ver si mando un token
    if(!token){
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    //Verificar que sea uno de nuestros tokens
    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario que corresponde al uid
        const newUser = await user.findById(uid)
                        .populate('role', 'name');

        //Verificar que exista el usuario
        if(!newUser){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existente'
            })
        }
         
        // Verificar si el UID tiene estado en TRUE
        if(!newUser.status){
            return res.status(401).json({
                msg: 'Token no valido - usuario deshabilitado'
            })
        }

        req.newUser = newUser;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido - excepcion al ver el token'
        })
        
    }

}

module.exports = {
    validarJWT
}