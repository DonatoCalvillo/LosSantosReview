const {
    Schema,
    model
} = require('mongoose')

const CountrySchema = Schema({
    ISO2: {
        type: String,
        required: [true, 'The ISO2 is required']
    },
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    status: {
        type: Boolean,
        default: 1
    }
});

CountrySchema.methods.toJSON = function () {
    const { __v, _id, status, ...newCountry } = this.toObject();
    newCountry.uid = _id;
    return newCountry;
}

module.exports = model('Country', CountrySchema);