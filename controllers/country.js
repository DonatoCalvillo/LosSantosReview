const {
    response
} = require("express")
const {
    Country
} = require("../models")
const subcategory = require("../models/subcategory")
const logger = require("../helpers/logger")

const getCountries = async (req, res = response) => {
    try {
        const [total, countries] = await Promise.all([
            Country.countDocuments(),
            Country.find()
        ])

        res.json({
            total,
            countries
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const createCountry = async (req, res = response) => {
    try {
        const {
            name,
            ISO2
        } = req.body

        const existCountry = await Country.findOne({
            name,
            ISO2
        })

        if (existCountry) {
            return res.status(400).json({
                msg: `The country ${name} or the ISO2 ${ISO2}, already exist`
            })
        }

        const data = {
            name,
            ISO2
        }

        const country = await Country(data)

        await country.save()

        res.status(201).json(country)
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const updateCountry = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const {
            name,
            ISO2
        } = req.body

        const existCountry = await Country.findOne({
            name,
            ISO2
        })

        if (existCountry) {
            return res.status(400).json({
                msg: `The country ${name} or the ISO2 ${ISO2}, already exist`
            })
        }

        const newCountry = await Country.findByIdAndUpdate(id, {
            name,
            ISO2
        }, {
            new: true
        })

        res.json({
            newCountry
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const deleteCountry = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const deletedCountry = await Country.findByIdAndUpdate(id, {
            status: false
        })

        res.json({
            deletedCountry
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

module.exports = {
    getCountries,
    createCountry,
    updateCountry,
    deleteCountry
}