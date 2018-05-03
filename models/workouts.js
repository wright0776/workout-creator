const mongoose = require('mongoose');
const {Schema} = mongoose;
const workoutSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    target: String,
    type: String, 
    moves: [{
        type: Schema.Types.ObjectId,
        ref: "moves"
    }]
});

module.exports = mongoose.model('workouts', workoutSchema);