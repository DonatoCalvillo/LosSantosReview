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
    }
});

module.exports = model('Company', CompanySchema);