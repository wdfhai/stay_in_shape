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
router.get("/range", async (req,res) => {
  // const results = await Workout.find({})
  // .populate("exercises")
  // .then(data => {    
  //   console.log("getAllInRange with populate shows " + data)
  //   return data
  // })
  // .catch(err => {
  //   res.json(err);
  //   console.log("getAllInRange data error " + err)
  // });
  // console.log("results shows " + JSON.stringify(results, null, 4))

  const results2 = await Workout.aggregate([
    { $lookup: {
      from: "exercises",
      localField: "exercises",
      foreignField: "_id",
      as: "exercises_details"
    }},
    { "$addFields": {
        "totalDuration": {
          "$sum": "$exercises_details.duration"
        },
        "totalWeight": {
          "$sum": "$exercises_details.weight"
        }
    }},
  ])
  .then(data => {
    console.log("Aggregate with lookup and addFields shows " + JSON.stringify(data, null, 4))
    return res.json(data)
  })
  .catch(err => {
    res.json(err);
    console.log("getAllInRange data error " + err)
  })
  // console.log("Aggregate + addFields method shows " + JSON.stringify(results2, null, 4));

  // const results3 = await Workout.updateMany([
  //     { "$set": {
  //       "totalDuration": {
  //         "$sum": "$exercises_details.duration"
  //       }
  //     }},
  //   ]);
  // console.log("updateMany shows " + JSON.stringify(results3, null, 4));
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