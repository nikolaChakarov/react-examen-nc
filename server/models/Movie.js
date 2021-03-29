const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    director: String,
    year: Number,
    imageURL: String,
    genre: {
        type: String,
        required: true
    },
    blackAndWhite: {
        type: Boolean,
        default: false
    },
    description: String

});

const Movie = mongoose.model('movie', MovieSchema);
module.exports = Movie;