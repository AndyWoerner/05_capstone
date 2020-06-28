// Require Express to run server and routes
const path = require("path")
const express = require("express")
const axios = require("axios")
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

console.log(__dirname)

// Setup Server
const port = 3000

const server = app.listen(port, listening)
function listening() {
    console.log("Server is running on localhost " + port)
}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


