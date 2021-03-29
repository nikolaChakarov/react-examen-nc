const { Router } = require('express');

const route = Router();

route.use('/register', require('./routes/register'));

module.exports = route;