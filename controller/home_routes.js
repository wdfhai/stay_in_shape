const router = require('express').Router();
const path = require('path');
const { Workout, Exercise } = require('../model');


// router.get('/exercise', (req, res) => {
//   Workout.find({})
//   .populate('exercise')
//   .then(data => {
//     console.log(data)
//     res.json(
//       data
//     );
//   })
//   .catch(err => {
//     console.log(err);
//     res.json(err);
//   });
// })

// router.get('/stats', (req, res) => {
  
//   Workout.find({})
//   .populate('exercise')
//   .then(dbStats => {
//     console.log(dbStats)
//     // res.json(
//     //   dbExercise
//     // );
//     res.sendFile(path.join(__dirname,'../public/stats.html'));
//   })
//   .catch(err => {
//     console.log(err);
//     res.json(err);
//   });
// })

module.exports = router;