var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    GitHubStrategy = require('passport-github').Strategy;

// load up the user model
var User = require('../models/user');

console.assert( process.env.JWT_SECRET, "JWT_SECRET environment variable has to be set." );

module.exports = function(passport) {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, function(jwt_payload, done) {
    const { username } = jwt_payload;
    User.findOne({ username }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
          // req.user is set with user
          done(null, user);
      } else {
          done(null, false);
      }
    });
  }));

/*
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));
  */
};

