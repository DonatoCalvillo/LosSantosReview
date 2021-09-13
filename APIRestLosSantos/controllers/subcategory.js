const { response } = require("express");

const {
    Category,
    Subcategory
} = require('../models/index')

const getSubcategories = async (req, res = response) =>{
    const query = {status : true}
    const subcategories = await Promise.all([
        Subcategory.find(query)
    ])

    res.json({
        subcategories
    })
}

const createSubcategory = async (req, res = response) =>{
    const {name, category} = req.body

    const existName = await Subcategory.findOne({name})

    if( existName){
        return res.status(400).json({
            msg: `The subcategory ${name}, already exist`
        })
    }

    const existCategory = await Category.findById(category)
    if(!existCategory){
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
}

const updateSubcategory = async (req, res = response) =>{ 
    const {id} = req.params

    const {name, category} = req.body

    const existName = await Subcategory.findOne({ name })

    if(existName){
        return res.status(400).json({
            msg: `The category ${name}, already exist`
        })
    }

    const newSubcategory = await Subcategory.findByIdAndUpdate(id,{
        name,
        category
    }, { new : true })

    res.json({newSubcategory})
}

const deleteSubcategory = async (req, res = response) => {
    const {id} = req.params 

    const deletedSubcategory = await Subcategory.findByIdAndUpdate(id,{ status: false })

    res.json({ deletedSubcategory })
}


module.exports = {
    createSubcategory,
    getSubcategories,
    updateSubcategory,
    deleteSubcategory
}