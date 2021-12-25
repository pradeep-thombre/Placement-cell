// importing mongoose library
const mongoose = require('mongoose');


// connecting to mongoose db 
// mongoose.connect('mongodb://localhost/placement-cell');
mongoose.connect('mongodb+srv://learningdemo068:HCsRDfy2vDs2KxN2@cluster0.ov31r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const db = mongoose.connection;


// handling error 
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// if connection succeeded 
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

// exporting module 
module.exports = db;