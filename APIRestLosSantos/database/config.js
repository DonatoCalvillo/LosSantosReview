const mongoose = require('mongoose')

const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Database ONLINE');
    } catch (error) {
        console.log(error)
        throw new Error('Error in the DB conection')
    }
}

module.exports = {
    dbConnection
}