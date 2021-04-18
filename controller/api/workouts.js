const router = require("express").Router();
const { Workout } = require("../../models/workouts");

// Put route /api/routes:id
router.put("/workouts/:id", async (req, res) => {
  try {
    console.log("Put /workouts/:id");
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
router.get("/workouts", async (req, res) => {
  try {
    const response = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ]);
    res.json(response);

    const resp = await Workout.find({})
    res.json(resp)
  } catch (err) {
    console.log(err);
    return;
  }
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

router.get("/workouts/range", async (req, res) => {
  try {
    console.log("get /workouts/range");
    const response = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ]);
    res.json(response);
    const resp = await Workout.find({}).sort({ day: -1 }).limit(7);
    res.json(resp);
  } catch (err) {
    console.log(err);
    return;
  }
});

module.exports = router;
