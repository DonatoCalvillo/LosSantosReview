const {
    response,
    request
} = require('express')

const classification = require('../models/classification')
const logger = require("../helpers/logger")

const createClassification = async (req, res = response) => {
    try {
        // We get the object that is sent from the code.
        const {
            name,
            description
        } = req.body

        // It looks for a record with the same name that we have in the object, 
        // if there is a record with the same name the function will return true, 
        // otherwise it will return false.
        const testName = await classification.findOne({
            'name': name
        })

        if (testName) {
            return res.status(400).json({
                msg: `The classification ${ testName.name }, already exist`
            })
        }

        // Create an object with the data that was sent.
        const newClassification = new classification({
            name,
            description
        })

        // Save a new record with the object.
        await newClassification.save()

        // Shows in new record.
        res.json(newClassification)
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const getClassifications = async (req, res = response) => {
    try {
        // Gets all the records in the collection.
        const [classifications] = await Promise.all([classification.find()])

        // Returns all records in the collection.
        res.json({
            classifications
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const deleteClassification = async (req, res = response) => {
    try {
        // We obtain the parameter that is sent from the URL
        const {
            id
        } = req.params

        // Look for the record with the id that we get from the URL and delete it.
        const classificationDeleted = await classification.findByIdAndUpdate(id, {
            status: false
        })

        // We show the record that we have deleted.
        res.json({
            classificationDeleted
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const updateClassification = async (req, res = response) => {
    try {
        // We obtain the parameter that is sent from the URL
        const {
            id
        } = req.params

        // We get the object that is sent from the code.
        const {
            name,
            description
        } = req.body

        // It looks for a record with the same name that we have in the object, 
        // if there is a record with the same name the function will return true, 
        // otherwise it will return false.
        const existClassification = await classification.findOne({
            'name': name
        })

        if (existClassification) {
            return res.status(400).json({
                msg: `The classification: ${name} already exist.`
            })
        }

        // It looks for a record with the same id that we send and 
        // updates it with the parameters that we send in the object.
        const newClassification = await classification.findByIdAndUpdate(id, {
            name,
            description
        }, {
            new: true
        })

        // Returns the updated record.
        res.json({
            newClassification
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

module.exports = {
    createClassification,
    getClassifications,
    updateClassification,
    deleteClassification
}