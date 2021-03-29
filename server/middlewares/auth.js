const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {

    const token = req.header('x-auth-token');

    if (!token) {
        res.status(400).json({ msg: 'Invalid token. Authorization denied.' });
        return;
    }

    try {
        // if token, verification
        const decoded = jwt.verify(token, config.SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = auth;