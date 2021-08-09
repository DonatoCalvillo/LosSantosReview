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
    }
});

module.exports = model('Country', CountrySchema);