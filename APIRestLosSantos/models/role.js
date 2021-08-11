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

RoleSchema.methods.toJSON = function () {
    const { __v, _id, ...role } = this.toObject();
    role.id = _id;
    return role;
}


module.exports = model('Role', RoleSchema);