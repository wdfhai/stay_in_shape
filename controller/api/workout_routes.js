const router = require('express').Router();
const { Workout, Exercise } = require('../../model');

//for getLastWorkout()
router.get('/', (req,res) => {
  Workout.find({})
  .populate('exercises')
  .then(data => {
    res.json(data)
    console.log('getAll with populate shows ' + data)
  })
  .catch(err => {
    res.json(err);
    console.log("getlastworkout data error " + err)
  });
});

//for getWorkoutsInRange()
router.get('/range', (req,res) => {
  Workout.find({})
  .populate('exercises')
  .then(data => {
    res.json(data)
    console.log('getAllInRange with populate shows ' + data)
  })
  .catch(err => {
    res.json(err);
    console.log("getAllInRange data error " + err)
  });
});

//for createWorkout()
router.post("/", ({ body }, res) => {
  Workout.create(body)
    .then(data => {
      res.json(data);
      console.log("create workout data " + data)
    })
    .catch(err => {
      res.json(err);
      console.log("create workout error is " + err)
    });
});

// for 'addExercise(data)'
router.put('/:id', ({ body, params }, res) => {
  console.log('line 50 says exercise data is ' + body)

  Exercise.create(body)
  .then(({ _id }) => Workout.findOneAndUpdate({_id: params.id}, { $push: { exercises: _id } }, { new: true }))
  .then(data => {
    res.json(data);
    console.log('line 56 says data is ' + data)
  })
  .catch(err => {
    res.json(err);
    console.log('error on line 60 says ' + err)
  });
})


module.exports = router;