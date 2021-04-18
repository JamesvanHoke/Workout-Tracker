const router = require("express").Router();
const { Workout } = require("../../models/workouts");

// Put route /api/routes:id
router.put("/workouts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const response = await Workout.updateOne(
      { _id: id },
      { $push: { exercises: body } }
    );
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

// get route /workouts
router.get("/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});

// post route /api/workouts
router.post("/workouts", async (req, res) => {
  try {
    console.log("Post /workouts");
    const body = req.body;
    const response = await Workout.create(body);
    res.json(response);
  } catch (err) {
    console.log(err);
    return;
  }
});

// get route /api/workouts/range

router.get("/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ day: -1 })
    .limit(7)
    .then((data) => res.json(data));
});

module.exports = router;
