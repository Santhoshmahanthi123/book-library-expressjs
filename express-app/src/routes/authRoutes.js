const express = require('express');
const { MongoClient } = require('mongodb')
const authRouter = express.Router();
const passport = require('passport');
function router(nav) {
    authRouter.route('/signUp')
        .post((req, res) => {
            const { username, password } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    console.log("Connected correctly to the server");
                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = { username, password };
                    const results = await col.insertOne(user);
                    console.log(results.ops[0]);
                    // create the user
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                } catch (err) {
                    console.log(err);
                }
            }());

        });
    authRouter.route('/signin')
        .get((req, res) => {
            res.render('signin', {
                nav,
                title: 'Sign In'
            });


        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));// after post authenticate user via local strategy
    authRouter.route('/profile')
        // protecting the routes
        // passport checks the user signed in or not
        .all((req, res, next) => {
            if (req.user) {
                next();

            } else {
                res.redirect('/');
            }

        })
        .get((req, res) => {
            res.json(req.user);

        });
    authRouter.route('/logout')
        .get((req, res) => {
            req.logout();
            res.redirect('/');
        });
    return authRouter;

};
module.exports = router;
