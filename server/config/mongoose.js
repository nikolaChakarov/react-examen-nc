const mongoose = require('mongoose');

const config = require('../config/config');

const configMongoose = async () => {

    try {

        await mongoose.connect(config.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, () => {
            console.log('DB connected.');
        });

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

}

module.exports = configMongoose;