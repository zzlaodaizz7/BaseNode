const mongoose = require('mongoose');

const exampleSchema = mongoose.Schema({
    name: {
        type: String,
    }
})

module.exports = mongoose.model('example', exampleSchema);