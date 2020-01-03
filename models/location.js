const mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
    name: String,
    entrances: [
        {
            lat: Number,
            long: Number
        }
    ]
});

module.exports = mongoose.model("Location", locationSchema);