const {
    Schema,
    model
} = require('mongoose')

const ComentSchema = Schema({
    coment: {
        type: String,
        required: [true, 'The coment is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        require: true
    }
})

module.exports = model('Coment', ComentSchema);