const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Lấy user schema
const {User} = require('../../models/userModel');

module.exports = function(passport){
    passport.use(
        new localStrategy({usernameField: 'name', passwordField: 'password'}, (username, password, done)=>{
            // Match user
            User.findOne({userName: username})
                .then(user => {
                    if(!user){
                        return done(null, false, {message: 'User is not exists'});
                    }
                    else{
                        // Match password
                        // password lấy từ user, user.password lấy từ db
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            // console.log(user.password);
                            //console.log(password);
                            if(isMatch){
                                return done(null, user);
                            }
                            else{
                                return done(null, false, {message: 'Incorrect Password'});
                            }
                        });
                    }
                })
                .catch(err => console.log(err));
        })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
};

