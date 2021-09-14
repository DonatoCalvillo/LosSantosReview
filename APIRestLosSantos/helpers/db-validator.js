const role = require('../models/role');
const user = require('../models/user');

const isValidRole = async (roleParam = '') =>{
    const existRole = await role.findOne({roleParam});
    if(!existRole){
        throw new Error(`The role ${roleParam} is not defined in the db`);
    }
}

const existEmail = async(email = '') =>{
    //Verificar si el correo existe
   const existeCorreo = await user.findOne({email});
   if(existeCorreo){
       throw new Error(`The email: ${email}, it's already created`);
   }
}

const userByIdExist = async( id ) =>{
    //Verificar si el usuario existe
   const existId = await user.findById(id);
   if(!existId){
       throw new Error(`The id: ${id}, doesn't exist`);
   }
}

const userActive = async(id) =>{
    const userTemp = await user.findById(id)
    if(!userTemp.status){
        throw new Error(`The id: ${id}, it's deactivated`);
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
    isValidRole,
    existEmail,
    userByIdExist,
    coleccionesPermitidas,
    userActive
}