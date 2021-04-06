const router = require('express').Router();
const { Workout } = require('../../model');

//for getLastWorkout()
router.get("/", (req,res) => {
  const result = Workout.aggregate([
    { "$addFields": {
        "totalDuration": {
          "$sum": "$exercises.duration"
        },
    }},
  ])
  .then(data => {
    res.json(data)
    console.log("getLastWorkout data shows " + JSON.stringify(data, null, 4))
  })
  .catch(err => {
    res.json(err);
    console.log("getLastWorkout error shows " + err)
  });
});

//for getWorkoutsInRange()
router.get("/range", (req,res) => {
  const result = Workout.aggregate([
    { "$addFields": {
        "totalDuration": {
          "$sum": "$exercises.duration"
        },
    }},
  ])
  .sort({ _id: -1 })
  .limit(7)
  .then(data => {
    console.log("getAllInRange data shows " + JSON.stringify(data, null, 4))
    return res.json(data)
  })
  .catch(err => {
    res.json(err);
    console.log("getAllInRange error shows " + err)
  })
});

//for createWorkout()
router.post("/", (req, res) => {
  const result = Workout.create({})
    .then(data => {
      res.json(data);
      console.log("createWorkout data is " + JSON.stringify(data, null, 4))
    })
    .catch(err => {
      res.json(err);
      console.log("createWorkout error is " + err)
    });
});

// for 'addExercise(data)'
router.put("/:id", ({ body, params }, res) => {
  const result = Workout.findByIdAndUpdate({ "_id" : params.id}, { $push: { exercises: body  }})
    .then(data => {
      res.json(data);
      console.log("addExerciseData data is " + JSON.stringify(data, null, 4))
    })
    .catch(err => {
      res.json(err);
      console.log("addExerciseData error is " + err)
    });
})


module.exports = router;