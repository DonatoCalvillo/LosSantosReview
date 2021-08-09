const {
    Schema,
    model
} = require('mongoose')

const RatingSchema = Schema({
    score: {
        type: Number,
        require: [true, 'The score is required']
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
    }
})

module.exports = model('Rating', RatingSchema);