//constants
const constants = require('./constants');

//Express API -Duh
const express = require("express");
const app = express();
//cors for providing a Connect/Express middleware
const cors = require("cors");
//To handle HTTP POST requests in Express.js version 4 and above
const bodyParser = require("body-parser");
//on any requests being made, it generates logs automatically
const logger = require("morgan");
//Import the mongoose module
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

mongoose.connect(constants.mongo.url, constants.mongo.config);
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./routes.js')(app)

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

require('./socketHandler')(io);

server.listen(port, function () {
    console.log("Running on " + port);
});

module.exports = {server, io};
