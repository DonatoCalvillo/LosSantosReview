const Role = require('../models/role');
const user = require('../models/user');

const esRolValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta definido en la db`);
    }
}

const existEmail = async(email = '') =>{
    //Verificar si el correo existe
   const existeCorreo = await user.findOne({email});
   if(existeCorreo){
       throw new Error(`The email: ${email}, it's already created`);
   }
}

const usuarioPorIdExiste = async( id ) =>{
    //Verificar si el correo existe
   const existeId = await Usuario.findById(id);
   if(!existeId){
       throw new Error(`El id: ${id}, no existe`);
   }
}


const coleccionesPermitidas = async(coleccion = '', coleccionesPermitidas = []) =>{
    const incluida = coleccionesPermitidas.includes(coleccion);

    if( !incluida ){
        throw new Error(`La coleccion ${coleccion}, no es permitida, colecciones permitidas: ${coleccionesPermitidas}`)
    }   

    return true;
}

module.exports = {
    esRolValido,
    existEmail,
    usuarioPorIdExiste,
    coleccionesPermitidas
}