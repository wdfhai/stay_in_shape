const router = require('express').Router();
const { Workout, Exercise } = require('../../model');

// router.post("/", (req, res) => {

//   console.log("data coming in to create exercise is " + JSON.stringify(req))

//   // Exercise.create(body)
//   //   .then(data => {
//   //     res.json(data);
//   //     console.log("create exercise data " + data)
//   //   })
//   //   .catch(err => {
//   //     res.json(err);
//   //     console.log("create exercise error is " + err)
//   //   });
// });


module.exports = router;