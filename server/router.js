const { Router } = require('express');

const route = Router();

route.use('/users', require('./routes/users'));
route.use('/movies', require('./routes/movies'));

module.exports = route;