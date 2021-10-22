const {
    response
} = require("express")

const {
    Category
} = require('../models/index')

const logger = require("../helpers/logger")

const getCategories = async (req, res = response) => {
    try {
        const query = {
            status: true
        }
        const categories = await Promise.all([
            Category.find(query)
        ])

        res.json({
            categories
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const createCategory = async (req, res = response) => {
    try {
        const {
            name
        } = req.body

        const existName = await Category.findOne({
            'name': name
        })

        if (existName) {
            return res.status(400).json({
                msg: `The category ${ existName.name }, already exist`
            })
        }

        const newCategory = new Category({
            name
        })

        await newCategory.save()

        res.json({
            newCategory
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const updateCategory = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const {
            name
        } = req.body

        const existName = await Category.findOne({
            'name': name
        })

        if (existName) {
            return res.status(400).json({
                msg: `The category ${ existName.name }, already exist`
            })
        }

        const newCategory = await Category.findByIdAndUpdate(id, {
            name
        }, {
            new: true
        })

        res.json({
            newCategory
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const deleteCategory = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const deletedCategory = await Category.findByIdAndUpdate(id, {
            status: false
        })

        res.json({
            deletedCategory
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}