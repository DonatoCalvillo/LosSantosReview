const mongoose = require('mongoose')
const logger = require('../helpers/logger')

const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        logger.info('Database ONLINE');
    } catch (error) {
        logger.error('Error in the DB conection')
    }
}

module.exports = {
    dbConnection
}