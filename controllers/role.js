const {
    response,
    request
} = require('express')
const role = require('../models/role')
const logger = require("../helpers/logger")

const createRole = async (req, res = response) => {
    try {
        const {
            name,
            description
        } = req.body

        const tempName = req.body.name.toUpperCase()

        const testName = await role.findOne({
            'name': tempName
        })

        if (testName) {
            return res.status(400).json({
                msg: `The role ${ testName.name }, already exist`
            })
        }

        const newRole = new role({
            name,
            description
        })

        //Guardar en db
        await newRole.save()

        res.json(newRole)
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const getRoles = async (req, res = response) => {
    try {
        const [roles] = await Promise.all([role.find()])

        res.json({
            roles
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const deleteRole = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const roleDeleted = await role.findByIdAndDelete(id)

        res.json({
            roleDeleted
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const updateRole = async (req, res = response) => {
    try {
        const {
            id
        } = req.params
        const {
            name,
            description
        } = req.body

        const existRole = await role.findOne({
            name
        })

        if (existRole) {
            return res.status(400).json({
                msg: `The role: ${name} already exist.`
            })
        }

        const newRole = await role.findByIdAndUpdate(id, {
            name,
            description
        }, {
            new: true
        })
        res.json({
            newRole
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

module.exports = {
    createRole,
    deleteRole,
    getRoles,
    updateRole
}