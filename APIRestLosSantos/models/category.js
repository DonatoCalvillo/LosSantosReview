const {
    Schema,
    model
} = require('mongoose')

const CategorySchema = Schema({
    name: {
        type: String,
        require: [true, 'The name is required']
    }
})

module.exports = model('Category', CategorySchema);