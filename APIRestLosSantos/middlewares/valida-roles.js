const { request, response } = require("express");
const role = require("../models/role");


const isSuperAdmin = (req = request, res= response, next) =>{

    const usuario = req.newUser;
    if(!req.newUser){
        return res.status(500).json({
            msg: 'You want to verify the role without validating the token first',
            usuario
        })
    }

    // const { name }  = req.newUser;
    const role = usuario.role.name;
    // return res.status(500).json({
    //     role
    // })
    if(role !== 'Super Admin'){
        return res.status(401).json({
            msg: `You are not an super admin, you are ${role} - You cannot do this action`
        })
    }

    next();
}

const existRole = async(_id) =>{
    const existeId = await role.findById(_id);
    if(!existeId){
        throw new Error(`El id: ${id}, no existe`);
    }
}

const tieneRol = (...roles) => {
    return (req = request, res= response, next) =>{
        const {rol} = req.usuario;

        if(!roles.includes( rol )){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        
        next();
    }
}

module.exports = {
    isSuperAdmin,
    tieneRol,
    existRole
}