const {
    Schema,
    model
} = require('mongoose')

const CompanySchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    image: {
        type: String
    },
    realiseDate: {
        type: Date,
        required: [true, 'The realise date is required']
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        require: true
    },
    status: {
        type: Boolean,
        default: 1
    }
});

CompanySchema.methods.toJSON = function () {
    const { __v, _id, status, ...newCompany } = this.toObject();
    newCompany.uid = _id;
    return newCompany;
}

module.exports = model('Company', CompanySchema);