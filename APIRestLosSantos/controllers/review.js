const { response } = require("express")
const { Review } = require("../models")

const getReviews = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query

    const query = { status : true }

    const [total, reviews] = await Promise.all([
        Review.countDocuments(query),
        Review.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({total, reviews})
}

const createReview = async (req, res = response) => {
    const {
        title, 
        subtitle,
        body,
        content,
        user
    } = req.body

    const existReview = await Content.findOne({title})

    if(existReview){
        return res.status(400).json({
            msg: `The review ${title}, already exist`
        })
    }

    const realiseDate = Date()

    const data = {
        title, 
        subtitle,
        body,
        realiseDate,
        content,
        user
    }

    const review = await Review(data)

    await review.save()

    res.status(201).json(review)
}

const updateReview = async (req, res = response) =>{ 
    const {id} = req.params

    const {
        title, 
        subtitle,
        body,
        content,
        user
    } = req.body

    const existReview = await Content.findOne({title})

    if(existReview){
        return res.status(400).json({
            msg: `The review ${title}, already exist`
        })
    }

    const newReview = await Review.findByIdAndUpdate(id,{
        title, 
        subtitle,
        body,
        content,
        user
    }, { new : true })

    res.json({newReview})
}

const deleteReview = async (req, res = response) => {
    const {id} = req.params 

    const deletedReview = await Review.findByIdAndUpdate(id,{ status: false })

    res.json({ deletedReview })
}

module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview
}