const {
    Schema,
    model
} = require('mongoose')

const CategorySchema = Schema({
    name: {
        type: String,
        require: [true, 'The name is required']
    },
    status: {
        type: Boolean,
        default: 1
    }
})

CategorySchema.methods.toJSON = function () {
    const { __v, _id, status, ...newCategory } = this.toObject();
    newCategory.uid = _id;
    return newCategory;
}

module.exports = model('Category', CategorySchema);