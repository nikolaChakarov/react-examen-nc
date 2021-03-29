const express = require('express');
const configExpress = require('./config/express');
const configMongoose = require('./config/mongoose');

const config = require('./config/config');

const app = express();

configExpress(app);
configMongoose();



app.listen(config.PORT, () => {
    console.log(`App is listening at ${config.PORT}`);
});