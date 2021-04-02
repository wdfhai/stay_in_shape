const router = require('express').Router();
const { Workout, Exercise } = require('../../model');

//for getLastWorkout()
router.get('/', (req,res) => {
  Workout.find({})
  // .populate("exercises").exec()
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err);
    console.log("getlastworkout data " + err)
  });
});

//for getWorkoutsInRange()
router.get('/range', (req,res) => {
  Workout.find({
    where: {
      range: req.params.range,
    }
  })
  // .populate("exercise")
  .then(data => {
    console.log(data)
    // res.json(data);
  })
  .catch(err => {
    res.json(err);
    console.log("get workoutsinrange data " + err)
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
      console.log(err)
    });
});

// for 'addExercise(data)'
router.put('/:id', (req,res) => {
  Exercise.create(req.body)
    .then(console.log(req.params))
    .then(({ _id }) => Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercise: _id } }, { new: true }))
    .then(data => {
      console.log(data)
      res.json(data);
    })
    .catch(err => {
      res.json(err);
      console.log("addexercise error is: " + err)
    });
})

// router.delete('/:id', async (req,res) => {
//   try {
//       const delBlog  = await Blog.destroy({
//           where: {
//           id: req.body.id
//       },
//   });
//   if (!delBlog) {
//       res.status(404).json({ message: 'No blog found with that id!' });
//       return;
//   }
//   res.status(200).json(delBlog);
//   } catch (err) {
//   res.status(500).json(err);
//   }
// });

module.exports = router;