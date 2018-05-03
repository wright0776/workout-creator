const express = require('express');
const workoutRouter = express.Router();

const WorkoutModel = require('../models/workouts');

workoutRouter.route('/')
    .get((req, res) => {
        WorkoutModel.find(req.query, (err, foundWorkouts) => {
            if(err) return res.send(err);
            WorkoutModel.populate(foundWorkouts, {path: 'moves'}, (err, popWorkouts) => {
                res.status(200).send(foundWorkouts);
            })
        })
    })
    .post((req, res) => {
        const newWorkout = new WorkoutModel(req.body);
        newWorkout.save((err, addedWorkout) => {
            if(err) return res.send(err);
            WorkoutModel.populate(addedWorkout, {path: 'moves'}, (err, popWorkout) => {
                res.status(200).send(popWorkout);
            })
        })
    })

workoutRouter.route('/:id')
    .get((req,res) => {
        WorkoutModel.findOne({ _id: req.params.id }, (err, foundWorkout) => {
            if (err) return res.send(err);
            if (!foundWorkout) return res.status(404).send({ message: 'workout not found'});
            WorkoutModel.populate(foundWorkout, {path: 'moves'}, (err, popWorkout)=>{
                res.status(200).send(popWorkout);
            })
        })
    })
    .delete((req,res) => {
        WorkoutModel.findOneAndRemove({ _id: req.params.id }, (err, deletedWorkout) => {
            if (err) return res.send(err);
            if (!deletedWorkout) return res.status(404).send({ message: 'workout not found'});
            res.status(200).send({ message: `${deletedWorkout.name} was successfully deleted.`});
        })
    })
    .put((req,res) => {
        WorkoutModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedWorkout) => {
            if (err) return res.send(err);
            if (!updatedWorkout) return res.status(404).send({ message: 'workout not found'});
            WorkoutModel.populate(updatedWorkout, {path: 'moves'}, (err, popWorkout)=>{
                res.status(200).send(popWorkout);
            })
        })
    })

    module.exports = workoutRouter;