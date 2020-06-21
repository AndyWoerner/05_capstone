// to hide credentials
const dotenv = require('dotenv')
dotenv.config()

// Database
projectData = {
    geoNames: [],
    weatherBit: [],
    pixabay: []
};

// Require Express to run server and routes
const express = require("express")
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors())
// Initialize the main project folder
app.use(express.static('dist'))

// Setup Server
const port = 3000

const server = app.listen(port, listening)
function listening() {
    console.log("Server is running on localhost " + port)
}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// GET routes

app.get("/all", sendData)
function sendData(request, response) {
    response.send(projectData)
}

// POST routes

app.post("/addTrip", addTrip)
function addTrip(req, res) {
    projectData.destination = req.body.destination;
    projectData.date = req.body.date;
    projectData.imageURL = req.body.imageURL;
    projectData.maxTemp = req.body.maxTemp;
    projectData.minTemp = req.body.minTemp;
    res.end();
    console.log(projectData);   
}

