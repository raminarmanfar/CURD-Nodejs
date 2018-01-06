const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    })
});

//Update user data
router.put('/updateUser', (req, res) => {
    // Check if id was provided
    if (!req.body.id) {
        res.json({ success: false, message: 'No user id provided' });
    } else {
        // Check if id exists in database
        User.findById(req.body.id, (err, user) => {
            // Check if id is a valid ID
            if (err) {
                res.json({ success: false, message: 'Not a valid user id' });
            } else {
                // Check if id was found in the database
                if (!user) {
                    res.json({ success: false, message: 'User id was not found.' });
                } else {
                    user.name = req.body.name;
                    user.email = req.body.email;
                    user.username = req.body.username;
                    user.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'User data Updated!' });
                        }
                    });
                }
            }
        });
    }
});

//Delete User by Id
router.delete('/deleteUser/:id', (req, res) => {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' });
    } else {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.json({ success: false, message: 'Invalid id' });
            } else {
                if (!user) {
                    res.json({ success: false, messasge: 'User was not found' });
                } else {
                    user.remove((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'User deleted!' });
                        }
                    });
                }
            }
        });
    }
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }

            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // one week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

//Get User Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user })
});

//Get User by Id
router.get('/getSingleUser/:id', (req, res) => {
    if (!req.params.id) {
        res.json({ success: false, message: 'No user ID was provided.' });
    } else {
        User.findById(req.params.id, (err, user) => {
            //User.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'User not found.' });
                } else {
                    res.json({ success: true, user: user });
                }
            }
        });
    }
});

//Get All Users
router.get('/getAllUsers', (req, res) => {
    User.find({}, (err, users) => {
        // Check if error was found or not
        if (err) {
            res.json({ success: false, message: err }); // Return error message
        } else {
            // Check if users were found in database
            if (!users) {
                res.json({ success: false, message: 'No users found.' }); // Return error of no blogs found
            } else {
                res.json({ success: true, users: users }); // Return success and users array
            }
        }
    }).sort({ '_id': -1 }); // Sort users from newest to oldest
});

module.exports = router;