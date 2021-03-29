const { Router, response } = require('express');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const configMongoose = require('../config/mongoose');

const route = Router();

//@ POST register user
// public
route.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Please, provide 3 character password or long.').isLength({ min: 3 }),
    check('repeatPassword').custom((repeatPass, { req }) => {
        if (repeatPass !== req.body.password) {
            throw new Error('Password is not the same');
        }
        return true
    })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }

    const { username, password } = req.body;

    try {

        let user = await User.findOne({ username });

        if (user) {
            res.status(400).json({ msg: 'User already exists' });
            return;
        }

        user = new User({ username, password });

        const hashed = await bcrypt.hash(password, config.SALT);
        user.password = hashed;

        await user.save();

        // save the user in DB
        const payload = {
            user: {
                id: user.id // id from DB
            }
        }

        const token = jwt.sign(
            payload,
            config.SECRET,
            { expiresIn: 3600 }
        );

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    res.send('register')
});

//@ POST login user
// public
route.post('/login', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Please, provide a 3 characters password or more').exists()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { username, password } = req.body;

    try {
        // check if user exists
        let user = await User.findOne({ username });

        if (!user) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
        }

        const isPassOk = await bcrypt.compare(password, user.password);

        if (!isPassOk) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(
            payload,
            config.SECRET,
            { expiresIn: 36000 }
        );

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = route;