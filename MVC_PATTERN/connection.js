const mongoose = require('mongoose');

async function connectDB() {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/userDB')
            .then(() => console.log("Connected to MongoDB"))
            .catch((err) => console.log("Error connecting to MongoDB", err));
    }
    catch (err) {
        console.log("Error connecting to MongoDB", err);

    }
}

module.exports = {
    connectDB
};