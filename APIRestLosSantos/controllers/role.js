const {
    response,
    request
} = require('express');
const role = require('../models/role');

const createRole = async (req, res = response) => {
    const {
        name,
        description
    } = req.body;
    const newRole = new role({
        name,
        description
    });

    //Guardar en db
    await newRole.save();

    res.json(newRole);
}

module.exports = {
    createRole
}