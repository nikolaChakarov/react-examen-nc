const express = require('express');
const cors = require('cors');

const router = require('../router');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

const configExpress = (app) => {
    app.use(express.json({ extended: false }));

    // cros-origin problem fix!!!
    app.use(cors(corsOptions));

    app.use(router);
}

module.exports = configExpress;