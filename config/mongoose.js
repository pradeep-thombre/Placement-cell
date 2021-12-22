const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/placement-cell');
mongoose.connect('mongodb+srv://learningdemo068:HCsRDfy2vDs2KxN2@cluster0.ov31r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;