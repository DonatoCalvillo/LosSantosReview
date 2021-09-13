const { response } = require("express");
const { Country } = require("../models");
const subcategory = require("../models/subcategory");

const getCountries = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query

    const query = { status : true }

    const [total, countries] = await Promise.all([
        Country.countDocuments(query),
        Country.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({total, countries})
}

const createCountry = async (req, res = response) => {
    const {name, ISO2} = req.body

    const existCountry = await Country.findOne({name, ISO2})

    if(existCountry){
        return res.status(400).json({
            msg: `The country ${name} or the ISO2 ${ISO2}, already exist`
        })
    }

    const data = {name, ISO2}

    const country = await Country(data)

    await country.save()

    res.status(201).json(subcategory)
}

const updateCountry = async (req, res = response) => {
    const {id} = req.params

    const {name, ISO2} = req.body
 
    const existCountry = await Country.findOne({name, ISO2})

    if(existCountry){
        return res.status(400).json({
            msg: `The country ${name} or the ISO2 ${ISO2}, already exist`
        })
    }

    const newCountry = await Country.findByIdAndUpdate(id,{name, ISO2}, {new:true})

    res.json({newCountry})
}

const deleteCountry = async (req, res = response) => {
    const {id} = req.params

    const deletedCountry = await Country.findByIdAndUpdate(id, {status:false})

    res.json({deletedCountry})
}

module.exports = {
    getCountries,
    createCountry,
    updateCountry,
    deleteCountry
}