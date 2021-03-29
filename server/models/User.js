const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie'
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;