const { Router } = require('express');

const route = Router();

route.use('/users', require('./routes/users'));

module.exports = route;