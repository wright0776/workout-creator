const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const workoutRouter = require('./routes/workouts');
const moveRouter = require('./routes/moves');

const app = express();
const port = process.env.PORT || 8080;
const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/workoutApp';

// middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))

// routes
app.use('/api/workouts', workoutRouter);
app.use('/api/moves', moveRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

mongoose.connect(db, { useNewUrlParser: true }), (err) => {
    if(err) console.log(`Sorry, can't connect to the database right now. ${err}`);
    console.log(`Connected to MongoDB`);
};
app.listen(port, () => console.log(`server running on port ${port}`));