const express = require('express');
// const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// var sassMiddleware = require('node-sass-middleware');
// const flash=require('connect-flash');
const middleware=require('./config/middleware');


app.use(express.urlencoded());


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.urlencoded());
app.use(express.static('./assets'));

app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
