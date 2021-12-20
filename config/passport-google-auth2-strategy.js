const passport = require("passport");
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;

const crypto=require('crypto');
const User=require('../models/users');

//tell passport to use new sta=rategy
passport.use(new googleStrategy({
    clientID:'184330036444-i88lnkdp985v6sppmhnpb21p9pnjl8ot.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:"http://localhost:8000/user/auth/google/callback"
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