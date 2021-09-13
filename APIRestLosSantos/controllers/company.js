const { response } = require("express");
const { existCategory } = require("../middlewares/validate-existence");
const { Company, Country } = require('../models');
const category = require("../models/category");


const getCompanies = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query

    const query = { status : true }

    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({total, companies})
}

const createCompany = async (req, res = response) => {
    const { name, country } = req.body

    const existCompany = await Company.findOne({name})

    if(existCompany){
        return res.status(400).json({
            msg : `The company: ${name}, already exist`
        })
    }

    const realiseDate = Date()
    const data = { name, realiseDate, country}

    const company = Company(data)

    await company.save()

    res.status(201).json(company)
}

const updateCompany = async (req, res = response) => {
    const {id} = req.params

    const { name, country} = req.body

    const existCompany = await Country.findOne({name})

    if(existCompany){
        return res.status(400).json({
            msg : `The company: ${name}, already exist`
        })
    }

    const newCompany = await Company.findByIdAndUpdate(id,{name, country}, {new:true})

    res.json(newCompany)
}

const deleteCompany = async (req, res = response) => {
    const {id} = req.params

    const deletedCompany = await Company.findByIdAndUpdate(id, {status:false})

    res.json({deleteCompany})
}

module.exports = {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany
}