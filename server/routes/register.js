const { Router } = require('express');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const route = Router();

route.post('/', (req, res) => {
    res.send('Hello from express');
});

module.exports = route;