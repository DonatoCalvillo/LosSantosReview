const { response } = require("express")

const {Category} = require('../models/index')

const getCategories = async (req, res = response) => {
    const query = {status : true}
    const categories = await Promise.all([
        Category.find(query)
    ])

    res.json({
        categories
    })
}

const createCategory = async (req, res = response) => {
    const { name } = req.body

    const existName = await Category.findOne({
        'name': name
    })

    if (existName) {
        return res.status(400).json({
            msg: `The category ${ existName.name }, already exist`
        });
    }

    const newCategory = new Category({
        name
    })

    await newCategory.save()

    res.json({
        newCategory
    })
}

const updateCategory = async (req, res = response) => {
    const { id } = req.params

    const { name } = req.body

    const existName = await Category.findOne({
        'name': name
    })

    if (existName) {
        return res.status(400).json({
            msg: `The category ${ existName.name }, already exist`
        });
    }

    const newCategory = await Category.findByIdAndUpdate(id,{
        name
    },
    {
        new: true
    })

    res.json({newCategory});
}

const deleteCategory = async (req, res = response) => {
    const {id} = req.params

    const deletedCategory = await Category.findByIdAndUpdate(id,{
        status: false
    })

    res.json({
        deletedCategory
    })
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}