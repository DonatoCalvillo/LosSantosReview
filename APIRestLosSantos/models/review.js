const {
    Schema,
    model
} = require('mongoose')

const ReviewSchema = Schema({
    title: {
        type: String,
        required: [true, 'The title is required']
    },
    subtitle: {
        type: String,
        required: [true, 'The subtitle is required'],
    },
    body: {
        type: String,
        required: [true, 'The body is required']
    },
    realiseDate: {
        type: Date,
        required: [true, 'The realise date is required']
    },
    content: {
        type: Schema.Types.ObjectId,
        ref: 'Content',
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    status: {
        type: Number,
        default: 1
    }
});

module.exports = model('Review', ReviewSchema);