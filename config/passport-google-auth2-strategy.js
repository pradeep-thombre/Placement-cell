const passport = require("passport");
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;

const crypto=require('crypto');
const User=require('../models/users');

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

if (!clientID || !clientSecret || !callbackURL) {
    // Allow the app to boot locally without Google OAuth configured.
    module.exports = passport;
    return;
}

//tell passport to use new starategy
passport.use(new googleStrategy({
    // client secrets and client id 
    clientID,
    clientSecret,
    callbackURL
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy passport',err);return}

            console.log(profile);
            if(user){

                // if user founthen set this as user
                return done(null,user);
            }
            else{
                // ifuser not found creating the user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    passport:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in Creating user',err);return}
                    return done(null,user);
                });
            }
        })
    }
));

module.exports=passport;