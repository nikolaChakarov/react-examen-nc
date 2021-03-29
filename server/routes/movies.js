const { Router, response } = require('express');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Movie = require('../models/Movie');
const User = require('../models/User');

const auth = require('../middlewares/auth');

const route = Router();

// Create Movie
// Private

route.post('/create', auth, [
    check('title', 'Title is required.').not().isEmpty(),
    check('genre', 'Genre is required.').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ msg: errors.array() });
        return;
    }

    const { title, directro, imageURL, genre, blackAndWhite, description } = req.body;

    try {
        // create new movie
        const movie = new Movie({ creator: req.user.id, title, directro, imageURL, genre, blackAndWhite, description });
        await movie.save();

        // add new movie to the current user -> the movie's creator, to his collection of movies. Only movie's ID!
        const currentUser = await User.findById(req.user.id);
        currentUser.movies.push(movie._id);
        await currentUser.save();

        // test populate :). Getting the user with his movies. With all the information.
        //let test = await User.findById(req.user.id).populate('movies');

        res.send(movie);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// Update Movie
// Private

module.exports = route;