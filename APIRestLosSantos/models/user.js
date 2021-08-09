const {
    Schema,
    model
} = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    lastName: {
        type: String,
        required: [true, 'The lastName is required']
    },
    username: {
        type: String,
        required: [true, 'The username is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    image: {
        type: String,
        required: [true, 'The image is required']
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        require: true
    },
    status: {
        type: Boolean,
        default: 1
    }
})

module.exports = model('User', UserSchema);