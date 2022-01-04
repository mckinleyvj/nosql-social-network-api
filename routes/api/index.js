const router = require('express').Router();

// Declare routes for user and thought
const userRoute = require('./user-route');
const thoughtRoute = require('./thought-route');

// Set /user to userRoutes
router.use('/users', userRoute);

// Set /thought to thoughtRoutes
router.use('/thoughts', thoughtRoute);

module.exports = router;