const router = require('express').Router();

const workoutRoutes = require('./workout_routes');
const exerciseRoutes = require('./exercise_routes');

router.use('/workouts', workoutRoutes);
router.use('/exercises', exerciseRoutes);

module.exports = router;