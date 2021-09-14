const {
    Category,
    Subcategory,
    Country,
    Company,
    Rating,
    Content,
    User,
    Review,
    Classification
} = require("../models/index")


const existCategory = async (id) =>{
    const existeId =  await Category.findById(id)
    if(!existeId){
        throw new Error(`The id ${id}, does not exist`)
    }
}

const existClassification = async (id) => {
    const existeId = await Classification.findById(id);
    if (!existeId) {
        throw new Error(`The id ${id}, does not exist`);
    }
}

const existSubcategory = async (id) => {
    const existSubcategory = await Subcategory.findById(id)
    if(!existSubcategory){
        throw new Error(`The subcategory ${id}, does not exist`)
    }
}

const existCountry = async (id) => {
    const existCountry = await Country.findById(id)
    if(!existCountry){
        throw new Error(`The country ${id}, does not exist`)
    }
}

const existCompany = async (id) => {
    const existCompany = await Company.findById(id)
    if(!existCompany){
        throw new Error(`The company ${id}, does not exist`)
    }
}

const existRating = async (id) => {
    const existRating = await Rating.findById(id)
    if(!existRating){
        throw new Error(`The Rating ${id}, does not exist`)
    }
}

const existContent = async (id) => {
    const existContent = await Content.findById(id)
    if(!existContent){
        throw new Error(`The Content ${id}, does not exist`)
    }
}

const existUser = async (id) => {
    const existUser = await User.findById(id)
    if(!existUser){
        throw new Error(`The User ${id}, does not exist`)
    }
}

const existReview = async (id) => {
    const existReview = await Review.findById(id)
    if(!existReview){
        throw new Error(`The Review ${id}, does not exist`)
    }
}


module.exports = {
    existCategory,
    existClassification,
    existSubcategory,
    existCountry,
    existCompany,
    existRating,
    existContent,
    existUser,
    existReview
}