const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cryto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID : "1076403059528-tdb7h49uc3o3bm71lrkt62r613ni2sil.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err);return;}
            console.log(accessToken,refreshToken);
            console.log(profile);

            if(user){
                //if found,set this user as req.user
                return done(null,user);
            }else{
                //if not found,create the user and set it as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in creating user google strategy-passport',err);return;}
                    return done(null,user);
                });
            }
        });
    }

)); 