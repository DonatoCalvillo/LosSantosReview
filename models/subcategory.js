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
    },
    status: {
        type: Boolean,
        default: 1
    }
});

SubcategorySchema.methods.toJSON = function () {
    const { __v, _id, status, ...newSubcategory } = this.toObject();
    newSubcategory.uid = _id;
    return newSubcategory;
}

module.exports = model('Subcategory', SubcategorySchema);