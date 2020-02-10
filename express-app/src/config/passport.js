const passport = require('passport');
require('./strategies/local.strategy')();
// configuration for the passport
module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    // passport maintains the user details in session .
    // Serialize => stores user in the session
    passport.serializeUser((user, done) => {
        done(null, user);

    });
    // Retrieve the user from the session
    passport.deserializeUser((user, done) => {
        done(null, user);

    });
    // passport requires a strategy
}