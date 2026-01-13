// importing libraries and files 
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
// const port = 8000;
const port = process.env.PORT||8000;
const fs = require('fs');
const path = require('path');

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passportGoogle=require('./config/passport-google-auth2-strategy');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoDbStore = require('connect-mongo');
const flash=require('connect-flash');

function compileScssToCssOnce() {
    // Avoid crashing the server if sass isn't present or compile fails.
    let sass;
    try {
        sass = require('sass');
    } catch (e) {
        console.warn('Sass compiler not available; skipping SCSS compilation.');
        return;
    }

    try {
        const srcFile = path.join(__dirname, 'assets', 'scss', 'style.scss');
        const destDir = path.join(__dirname, 'assets', 'css');
        const destFile = path.join(destDir, 'style.css');

        if (!fs.existsSync(srcFile)) {
            return;
        }

        fs.mkdirSync(destDir, { recursive: true });
        const result = sass.compile(srcFile, { style: 'expanded' });
        fs.writeFileSync(destFile, result.css, 'utf8');
    } catch (e) {
        console.warn('Failed to compile SCSS; continuing without recompiling.', e && e.message ? e.message : e);
    }
}

// middle ware for flash notifications 
const middleware=require('./config/middleware');
compileScssToCssOnce();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// setting static files 
app.use(express.static('./assets'));
// app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');



// mongo store is used to store the session cookie in the db
const mongoUrl = (db && db.mongoUrl) ? db.mongoUrl : (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/placement-cell');
let sessionStore;
try {
    sessionStore = MongoDbStore.create({
        mongoUrl,
        autoRemove: 'disabled'
    });

    // Ensure store connection errors don't crash the process.
    if (sessionStore && typeof sessionStore.on === 'function') {
        sessionStore.on('error', (err) => {
            console.warn('Mongo session store error (continuing with MemoryStore fallback behavior).', err && err.message ? err.message : err);
        });
    }
} catch (err) {
    console.warn('Mongo session store unavailable; falling back to MemoryStore.', err && err.message ? err.message : err);
}

const sessionConfig = {
    name: 'placementcell',
    // TODO change the secret before deployment in production mode
    secret: process.env.SESSION_SECRET || 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
};

if (sessionStore) {
    sessionConfig.store = sessionStore;
}

app.use(session(sessionConfig));
// initialising and creating session 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// adding flash messages
app.use(flash());
app.use(middleware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
