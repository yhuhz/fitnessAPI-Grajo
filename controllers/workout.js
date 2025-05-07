const Workout = require('../models/Workout');
const { errorHandler } = require('../auth');

module.exports.addWorkout = (req, res) => {
  let newWorkout = new Workout({
    userId: req.user.id,
    name: req.body.name,
    duration: req.body.duration,
  });

  return newWorkout
    .save()
    .then((result) => res.status(201).send(result))
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getMyWorkouts = (req, res) => {
  return Workout.find({ userId: req.user.id })
    .then((result) =>
      res.status(200).send({
        success: true,
        workouts: result,
      })
    )
    .catch((err) => errorHandler(err, req, res));
};

module.exports.updateWorkout = (req, res) => {
  let updatedWorkout = {
    name: req.body.name,
    duration: req.body.duration,
  };

  return Workout.findByIdAndUpdate(req.params.id, updatedWorkout, { new: true })
    .then((workout) => {
      if (workout) {
        res.status(200).send({
          success: true,
          message: 'Workout updated successfully',
          updatedWorkout: workout,
        });
      } else {
        res.status(404).send({
          message: 'Workout not found',
        });
      }
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.deleteWorkout = (req, res) => {
  return Workout.findByIdAndDelete(req.params.id)
    .then((workout) => {
      if (workout) {
        res.status(200).send({
          success: true,
          message: 'Workout deleted successfully',
        });
      } else {
        res.status(404).send({
          message: 'Workout not found',
        });
      }
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.completeWorkoutStatus = (req, res) => {
  let updatedWorkout = {
    status: 'completed',
  };

  return Workout.findByIdAndUpdate(req.params.id, updatedWorkout, { new: true })
    .then((workout) => {
      if (workout) {
        res.status(200).send({
          success: true,
          message: 'Workout status updated successfully',
          updatedWorkout: workout,
        });
      } else {
        res.status(404).send({
          message: 'Workout not found',
        });
      }
    })
    .catch((err) => errorHandler(err, req, res));
};
