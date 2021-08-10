const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const user = require("../models/user");

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        //Verificar si email existe
        const newUser = await user.findOne({ email });

        if(!newUser){
            return res.status(400).json({
                msg: 'This email it is not register.'
            });
        }

        //Verificar si el usuario esta activo
        if(!newUser.status){
            return res.status(400).json({
                msg: 'This user was deshabilited'
            });
        }

        //Verificar contrasenia
        const validPassword = bcryptjs.compareSync(password, newUser.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Wrong password'
            });
        }

        //Generar el JWT
        const token = await generarJWT( newUser.id );

        res.json({
            newUser,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
 
}

// const googleSignIn = async(req = request, res = response) =>{
//     const {id_token} = req.body;

//     try {
//         const {correo, nombre, img} = await googleVerify(id_token);

//         //Agregar el usuario a la db
//         //Checar si el correo ya existe
//         let usuario = await Usuario.findOne({correo});

//         if(!usuario){
//             //Tengo que crearlo 
//             const data = {
//                 nombre,
//                 correo,
//                 contrasenia: ':p',
//                 img,
//                 google: true
//             };

//             usuario = new Usuario(data);
//             await usuario.save();
//         }
        
//         //Si el usuario en DB 
//         if(!usuario.estado){
//             return res.json(401).json({
//                 msg:'Hable con el admin, usuario bloqueado'
//             });
//         }

//         //Generar el JWT
//         const token = await generarJWT( usuario.id );

//         res.json({
//             usuario,
//             token
//         })

//     } catch (error) {
//         res.status(400).json({
//             msg : 'Token de google no es reconocido o valido'
//         })
//     }
// }

module.exports = {
    login
}