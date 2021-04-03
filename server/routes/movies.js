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

    const { title, director, imageURL, genre, blackAndWhite, description, year } = req.body;

    try {
        // create new movie
        const movie = new Movie({ creator: req.user.id, title, director, imageURL, genre, blackAndWhite, description, year });
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

// Get All Movie
// Private

route.get('/all', auth, async (req, res) => {

    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        console.log(err.message);
        res.statys(500).send('Server Error');
    }

});

// Get Movie By ID
// Private

route.get('/:movie_id', auth, async (req, res) => {

    try {
        const movie_id = req.params.movie_id;
        const movie = await Movie.findOne({ _id: movie_id });
        res.json(movie);
    } catch (err) {
        console.log(err.message);
        res.statys(500).send('Server Error');
    }

});

// Update Movie By ID
// Private

route.put('/edit/:movie_id', auth, async (req, res) => {

    try {
        //const { title, director, imageURL, genre, blackAndWhite, description, likes } = req.body; // ERROR!!!!!
        const newData = { ...req.body };

        const updated = await Movie.findOneAndUpdate({ _id: req.params.movie_id }, { ...newData }, { new: true });

        res.json(updated);

    } catch (err) {
        console.log(err.message);
        res.statys(500).send('Server Error');
    }

});

// Update Movie Likes
// Private

route.put('/edit/likes/:movie_id', auth, async (req, res) => {

    try {
        const currentMovie = await Movie.findById(req.params.movie_id);
        let likes = currentMovie.likes;
        likes++;
        const updated = await Movie.findOneAndUpdate({ _id: req.params.movie_id }, { likes }, { new: true });

        res.json(updated);

    } catch (err) {
        console.log(err.message);
        res.statys(500).send('Server Error');
    }

});

// Delete Movie By ID
// Private

route.delete('/delete/:movie_id', auth, async (req, res) => {

    const movie_id = req.params.movie_id;
    const user_id = req.user.id;

    try {
        const currentUser = await User.findById(user_id);

        //const index = currentUser.movies.findIndex(el => el == movie_id) // !!! typeof el == object  typeof movie_id == string за това == 2 часа

        const updatedList = currentUser.movies.filter(el => el != movie_id);  // !!! typeof el == object  typeof movie_id == string за това == 2 часа


        const updatedUser = await User.findOneAndUpdate({ _id: user_id }, { movies: updatedList }, { new: true });

        const delResult = await Movie.findOneAndRemove({ _id: movie_id });

        res.json({ msg: `${delResult.title}, has been erased!` });

    } catch (err) {
        console.log(err.message);
        res.statys(500).send('Server Error');
    }
});

module.exports = route;