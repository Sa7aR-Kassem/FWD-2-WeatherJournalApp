// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 5555;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log('running')
}

// Initialize all route with a callback function
// Callback function to complete GET '/weather'
app.get('/getWeather', function (req, res) {
    res.send(projectData);
});

// Post Route
app.post('/postWeather', function (req, res) {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.res = req.body.userResponse;
    projectData.name = req.body.name;

    res.send(projectData);
});