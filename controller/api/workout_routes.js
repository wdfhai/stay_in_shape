const router = require('express').Router();
const { Workout, Exercise } = require('../../model');

//for getLastWorkout()
router.get("/", async (req,res) => {
  const result = await Workout.find({})
  .then(data => {
    res.json(data)
    console.log("getLastWorkout with populate shows " + data)
  })
  .catch(err => {
    res.json(err);
    console.log("getLastWorkout error shows " + err)
  });
});

//for getWorkoutsInRange()
router.get("/range", async (req,res) => {

  const result = await Workout.aggregate([
    { "$addFields": {
        "totalDuration": {
          "$sum": "$exercises.duration"
        },
    }},
  ])
  .then(data => {
    console.log("getAllInRange data shows " + JSON.stringify(data, null, 4))
    return res.json(data)
  })
  .catch(err => {
    res.json(err);
    console.log("getAllInRange data error shows " + err)
  })
});

//for createWorkout()
router.post("/", async (req, res) => {
  const result = await Workout.create({})
    .then(data => {
      res.json(data);
      console.log("createWorkout data is " + data)
    })
    .catch(err => {
      res.json(err);
      console.log("createWorkout error is " + err)
    });
});

// for 'addExercise(data)'
router.put("/:id", async ({ body, params }, res) => {
  console.log("line 50 says exercise data is " + JSON.stringify(body))

  const result = await Workout.findByIdAndUpdate({ "_id" : params.id}, { $push: { exercises: body  }})
  .then(data => {
    res.json(data);
    console.log("addExerciseData result is " + data)
  })
  .catch(err => {
    res.json(err);
    console.log("eaddExerciseData error is " + err)
  });
})


module.exports = router;