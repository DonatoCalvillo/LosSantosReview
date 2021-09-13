const { response } = require("express")
const { Rating } = require("../models")


const getRating = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query

    const query = { status : true }

    const [total, rating] = await Promise.all([
        Rating.countDocuments(query),
        Rating.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({total, rating})
}

const createRating = async (req, res = response) => {
    const {
        score, 
        content,
        user
    } = req.body

    const existRating = await Rating.findOne({user})

    if(existRating){
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
}

const updateRating = async (req, res = response) =>{ 
    const {id} = req.params

    const {
        score, 
        content,
        user
    } = req.body

    const existRating = await Rating.findOne({user})

    if(existRating){
        return res.status(400).json({
            msg: `This user: ${title}, already have a rating`
        })
    }

    const newRating = await Rating.findByIdAndUpdate(id,{
        score, 
        content,
        user
    }, { new : true })

    res.json({newRating})
}

const deleteRating = async (req, res = response) => {
    const {id} = req.params 

    const deletedRating = await Rating.findByIdAndUpdate(id,{ status: false })

    res.json({ deletedRating })
}

module.exports = {
    getRating,
    createRating,
    updateRating,
    deleteRating
}
