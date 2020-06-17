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
const port = 8081

const server = app.listen(port, listening)
function listening() {
    console.log("Server is running on localhost " + port)
}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    res.send(projectData)
})

// GeoNames API
const baseURLGeonames = "http://api.geonames.org/postalCodeSearchJSON?placename="
const geonamesID = process.env.GEOKEY

// GET REQUEST to get geoname informations
const fetchGeoname = async (URL, city) => {
    const fetchURL = `${URL}${encodeURIComponent(city)}&maxRows=10&username=${geonamesID}`
    const response = await fetch(fetchURL)

    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log("An error occured while fetching Data from geonames: ", error)
    }
}

// Weatherbit API
const baseURLWeatherbit = "http://api.weatherbit.io/v2.0/forecast/daily?&"
const weatherbitID = process.env.WEATHERKEY

// GET REQUEST to get weather information from weatherbit API
const fetchWeatherbit = async (URL, lat, lon) => {
    const fetchURL = `${URL}lat=${lat}&lon${lon}&key=${weatherbitID}`
    const response = await fetch(fetchURL)

    try {
        const data = await response.json()
        return data
    } catch (error){
        console.log("An error occured while fetching Data from geonames: ", error)
    }
}

// Pixabay API
const baseURLPixabay = "https://pixabay.com/api/?"
const pixabayID = process.env.PIXABAYKEY

// GET REQUEST to get image from pixabay API
const fetchPixabay = async (URL, input) => {
    const fetchURL = `${URL}key=${pixabayID}&q=${encodeURIComponent(input)}&image_type=photo`
    const response = await fetch(fetchURL)

    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log("An error occured while fetching image from pixabay: ", error)
    }
}

