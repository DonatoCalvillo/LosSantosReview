const {
    response
} = require("express")
const {
    Content
} = require('../models/index')
const logger = require("../helpers/logger")


const getContents = async (req, res = response) => {
    try {
        const {
            limit = 5, from = 0
        } = req.query

        const query = {
            status: true
        }

        const [total, contents] = await Promise.all([
            Content.countDocuments(query),
            Content.find(query)
            .skip(Number(from))
            .limit(Number(limit))
        ])

        res.json({
            total,
            contents
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const createContent = async (req, res = response) => {
    try {
        const {
            title,
            description,
            trailerLink,
            duration,
            category,
            subcategory,
            company,
            classification
        } = req.body

        const existContent = await Content.findOne({
            title
        })

        if (existContent) {
            return res.status(400).json({
                msg: `The content ${title}, already exist`
            })
        }

        const realiseDate = Date()

        const data = {
            title,
            description,
            realiseDate,
            trailerLink,
            duration,
            category,
            subcategory,
            company,
            classification
        }

        const content = await Content(data)

        await content.save()

        res.status(201).json(content)
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const updateContent = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const {
            title,
            description,
            trailerLink,
            duration,
            category,
            subcategory,
            company,
            classification
        } = req.body

        const existContent = await Content.findOne({
            title
        })

        if (existContent) {
            return res.status(400).json({
                msg: `The content ${title}, already exist`
            })
        }

        const newContent = await Subcategory.findByIdAndUpdate(id, {
            title,
            description,
            trailerLink,
            duration,
            category,
            subcategory,
            company,
            classification
        }, {
            new: true
        })

        res.json({
            newContent
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const deleteContent = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const deletedContent = await Subcategory.findByIdAndUpdate(id, {
            status: false
        })

        res.json({
            deletedContent
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

module.exports = {
    getContents,
    createContent,
    updateContent,
    deleteContent
}