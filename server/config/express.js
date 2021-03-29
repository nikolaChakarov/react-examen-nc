const express = require('express');

const router = require('../router');

const configExpress = (app) => {
    app.use(express.json({ extended: false }));

    app.use(router);
}

module.exports = configExpress;