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
    },
    status: {
        type: Boolean,
        default: 1
    }
})

RatingSchema.methods.toJSON = function () {
    const { __v, _id, status, ...newRating } = this.toObject();
    newRating.uid = _id;
    return newRating;
}

module.exports = model('Rating', RatingSchema);