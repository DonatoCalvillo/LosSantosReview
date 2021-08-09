const {
    Schema,
    model
} = require('mongoose')

const RoleSchema = Schema({
    name: {
        type: String,
        require: [true, 'The name is required']
    },
    description: {
        type: String,
        require: [true, 'The description is required']
    }
});

module.exports = model('Role', RoleSchema);