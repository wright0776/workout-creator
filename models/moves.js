const mongoose = require('mongoose')
const {Schema} = mongoose;
const moveSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    target: String,
    type: String,
    description: String,
    imgUrl: String,
    videoUrl: String
})

module.exports = mongoose.model('moves', moveSchema);