// importing mongoose library
require('dotenv').config();
const mongoose = require('mongoose');


// connecting to mongoose db 
// mongoose.connect('mongodb://localhost/placement-cell');
const mongoUrl = (() => {
    const user = process.env.MONGO_USER;
    const password = process.env.MONGO_PASSWORD;

    // Prefer constructing Atlas URI from user/pass so the rest of the URL can stay constant.
    if (user && password) {
        const host = process.env.MONGO_HOST || 'cluster0.ov31r.mongodb.net';
        const dbName = process.env.MONGO_DB || 'myFirstDatabase';
        const params = process.env.MONGO_PARAMS || 'retryWrites=true&w=majority';
        return `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}/${dbName}?${params}`;
    }

    if (process.env.MONGODB_URI) {
        return process.env.MONGODB_URI;
    }

    const localDb = process.env.MONGO_LOCAL_DB || 'placement-cell';
    return `mongodb://127.0.0.1:27017/${localDb}`;
})();
mongoose.connect(mongoUrl);

const db = mongoose.connection;


// handling error 
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// if connection succeeded 
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

// exporting module 
db.mongoUrl = mongoUrl;
module.exports = db;