const { response } = require("express");
const { Content } = require('../models/index')


const getContents = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query

    const query = { status : true }

    const [total, contents] = await Promise.all([
        Content.countDocuments(query),
        Content.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({total, contents})
}

const createContent = async (req, res = response) => {
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

    const existContent = await Content.findOne({title})

    if(existContent){
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
}

const updateContent = async (req, res = response) =>{ 
    const {id} = req.params

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

    const existContent = await Content.findOne({title})

    if(existContent){
        return res.status(400).json({
            msg: `The content ${title}, already exist`
        })
    }

    const newContent = await Subcategory.findByIdAndUpdate(id,{
        title, 
        description,
        trailerLink,
        duration,
        category,
        subcategory,
        company,
        classification
    }, { new : true })

    res.json({newContent})
}

const deleteContent = async (req, res = response) => {
    const {id} = req.params 

    const deletedContent = await Subcategory.findByIdAndUpdate(id,{ status: false })

    res.json({ deletedContent })
}

module.exports = {
    getContents,
    createContent,
    updateContent,
    deleteContent
}