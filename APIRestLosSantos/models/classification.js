const {
    Schema,
    model
} = require('mongoose')

const ClassificationSchema = Schema({
    name: {
        type: String,
        require: [true, 'The name is required']
    },
    description: {
        type: String,
        require: [true, 'The description is required']
    }
})

module.exports = model('Classification', ClassificationSchema);