const mongoose = require('mongoose');

async function mongooseConnect() {
    const uri = process.env.MONGODB_URL
    mongoose.connect(uri, {useNewUrlParser: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Mongoose connected")
    });
}

module.exports = {
    mongooseConnect
}