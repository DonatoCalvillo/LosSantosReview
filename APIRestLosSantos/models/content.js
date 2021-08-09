const {
    Schema,
    model
} = require('mongoose')

const ContentSchema = Schema({
    title: {
        type: String,
        required: [true, 'The title is required']
    },
    description: {
        type: String,
        required: [true, 'The description is required'],
    },
    realiseDate: {
        type: Date,
        required: [true, 'The realise date is required']
    },
    image: {
        type: String
    },
    trailerLink: {
        type: String
    },
    duration: {
        type: Number
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory',
        require: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Comany',
        require: true
    },
    classification: {
        type: Schema.Types.ObjectId,
        ref: 'Classification',
        require: true
    }
});

module.exports = model('Content', ContentSchema);