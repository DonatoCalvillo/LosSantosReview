const {
    Schema,
    model
} = require('mongoose')

const SubcategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    }
});

module.exports = model('Subcategory', SubcategorySchema);