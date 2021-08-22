const {
    request,
    response
} = require("express");

const role = require("../models/role");
const classification = require("../models/classification");


const isSuperAdmin = (req = request, res = response, next) => {

    const usuario = req.newUser;
    if (!req.newUser) {
        return res.status(500).json({
            msg: 'You want to verify the classification without validating the token first',
            usuario
        })
    }

    const role = usuario.role.name;

    if (role !== 'Super Admin') {
        return res.status(401).json({
            msg: `You are not an Super Admin, you are ${role} - You cannot do this action`
        })
    }

    next();
}

const existClassification = async (_id) => {
    const existeId = await classification.findById(_id);
    if (!existeId) {
        throw new Error(`The id ${_id}, does not exist`);
    }
}

const haveRole = (...roles) => {
    return (req = request, res = response, next) => {
        const {
            rol
        } = req.usuario;

        if (!roles.includes(rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    isSuperAdmin,
    haveRole,
    existClassification
}