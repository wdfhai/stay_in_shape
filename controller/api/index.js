const router = require('express').Router();

const workoutRoutes = require('./workout_routes');

router.use('/workouts', workoutRoutes);

module.exports = router;