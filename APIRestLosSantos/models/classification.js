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

ClassificationSchema.methods.toJSON = function () {
    const { __v, _id, ...classification } = this.toObject();
    classification.id = _id;
    return classification;
}

module.exports = model('Classification', ClassificationSchema);