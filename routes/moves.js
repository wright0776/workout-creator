const express = require('express');
const moveRouter = express.Router();

const MoveModel = require('../models/moves')

moveRouter.route('/')
    .get((req, res) => {
        MoveModel.find(req.query, (err, foundMoves) => {
            if (err) return res.send(err);
            res.status(200).send(foundMoves);
        })
    })
    .post((req, res) => {
        const newMove = new MoveModel(req.body);
        newMove.save((err, addedMove) => {
            if (err) return res.send(err);
            res.status(200).send(addedMove);
        })
    })

moveRouter.route('/:id')
    .get((req, res) => {
        MoveModel.findOne({ _id: req.params.id }, (err, foundMove) => {
            if (err) return res.send(err);
            if (!foundMove) return res.status(404).send({ message: 'move not found' });
            res.status(200).send(foundMove);
        })
    })
    .delete((req, res) => {
        MoveModel.findOneAndRemove({ _id: req.params.id }, (err, deletedMove) => {
            if (err) return res.send(err);
            if (!deletedMove) return res.status(404).send({ message: 'move not found' });
            res.status(200).send({ message: `${deletedMove} successfully deleted.`})
        })
    })
    .put((req, res) => {
        MoveModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedMove) => {
            if (err) return res.send(err);
            if (!updatedMove) return res.status(404).send({ message: 'move not found' });
            res.status(200).send(updatedMove);
        })
    })

module.exports = moveRouter;