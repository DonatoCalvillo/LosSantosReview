const {
    response
} = require("express")
const {
    Rating
} = require("../models")
const logger = require("../helpers/logger")


const getRating = async (req, res = response) => {
    try {
        const {
            limit = 5, from = 0
        } = req.query

        const query = {
            status: true
        }

        const [total, rating] = await Promise.all([
            Rating.countDocuments(query),
            Rating.find(query)
            .skip(Number(from))
            .limit(Number(limit))
        ])

        res.json({
            total,
            rating
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const createRating = async (req, res = response) => {
    try {
        const {
            score,
            content,
            user
        } = req.body

        const existRating = await Rating.findOne({
            user
        })

        if (existRating) {
            return res.status(400).json({
                msg: `This user: ${title}, already have a rating`
            })
        }

        const data = {
            score,
            content,
            user
        }

        const rating = await Rating(data)

        await rating.save()

        res.status(201).json(rating)
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const updateRating = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const {
            score,
            content,
            user
        } = req.body

        const existRating = await Rating.findOne({
            user
        })

        if (existRating) {
            return res.status(400).json({
                msg: `This user: ${title}, already have a rating`
            })
        }

        const newRating = await Rating.findByIdAndUpdate(id, {
            score,
            content,
            user
        }, {
            new: true
        })

        res.json({
            newRating
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

const deleteRating = async (req, res = response) => {
    try {
        const {
            id
        } = req.params

        const deletedRating = await Rating.findByIdAndUpdate(id, {
            status: false
        })

        res.json({
            deletedRating
        })
    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

module.exports = {
    getRating,
    createRating,
    updateRating,
    deleteRating
}