const {
    response
} = require("express")

const {
    Category,
    Subcategory
} = require('../models/index')
const logger = require("../helpers/logger")

const getSubcategories = async (req, res = response) => {
    try {
        const query = {
            status: true
        }
        const subcategories = await Promise.all([
            Subcategory.find(query)
        ])

        res.json({
            subcategories
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const createSubcategory = async (req, res = response) => {
    try {
        const {
            name,
            category
        } = req.body

        const existName = await Subcategory.findOne({
            name
        })

        if (existName) {
            return res.status(400).json({
                msg: `The subcategory ${name}, already exist`
            })
        }

        const existCategory = await Category.findById(category)
        if (!existCategory) {
            return res.status(400).json({
                msg: `Category ${category}, does not exist in the database`
            })
        }

        const data = {
            name,
            category
        }

        const subcategory = await Subcategory(data)

        await subcategory.save()

        res.status(201).json(subcategory)
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const updateSubcategory = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const {
            name,
            category
        } = req.body

        const existName = await Subcategory.findOne({
            name
        })

        if (existName) {
            return res.status(400).json({
                msg: `The category ${name}, already exist`
            })
        }

        const newSubcategory = await Subcategory.findByIdAndUpdate(id, {
            name,
            category
        }, {
            new: true
        })

        res.json({
            newSubcategory
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const deleteSubcategory = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const deletedSubcategory = await Subcategory.findByIdAndUpdate(id, {
            status: false
        })

        res.json({
            deletedSubcategory
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}


module.exports = {
    createSubcategory,
    getSubcategories,
    updateSubcategory,
    deleteSubcategory
}