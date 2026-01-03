const mongoose = require('mongoose');

async function connectDB() {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/urlShortener')
            .then(() => {
                console.log("MongoDB connected");
            })
            .catch((err) => {
                console.log("Error connecting to MongoDB", err);
            });
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }

}

module.exports = { connectDB };