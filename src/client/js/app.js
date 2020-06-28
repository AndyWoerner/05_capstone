// Database
const projectData = {
    checkGeo: false,
    image: "https://pixabay.com/get/57e6d4424c53a814f1dc8460da293277163fd7e25a5870_640.jpg"
};


const checkAndHandle = async (event) => {
    event.preventDefault();
    const userInput = document.getElementById("location").value

    // check if trip is in the future
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    if (new Date(document.getElementById("date").value) < d) {
        closeCard();
        alert("Trip has to be in the future!")
    }

    else if (
        (userInput != "")  // check if location input is not empty
        && (document.getElementById("date").value.length === 10) // check if start date is set
        && (document.getElementById("end").value.length === 10) // check if end date is set
        && (document.getElementById("end").value >= document.getElementById("date").value) // check if end date comes after start date
    ) {
        fetchGeoname(userInput)
            .then(function (geoData) {
                fetchWeatherbit(geoData)
                    .then(function (userInput) {
                        fetchPixabay()
                            .then(function () {
                                createCard(projectData)
                            })
                    })
            })
    } else {
        closeCard();
        alert("Please enter a Location, a start date and the end date of your trip! \nMake sure that start date is before end date!")
    }
}

// Fetch information from geonames API
const fetchGeoname = async (city) => {
    // GeoNames API Credentials
    const baseURLGeonames = "http://api.geonames.org/postalCodeSearchJSON?placename="
    const geonamesID = "andywoerner"
    const fetchURL = `${baseURLGeonames}${encodeURIComponent(city)}&maxRows=1&username=${geonamesID}`
    const response = await fetch(fetchURL)
    let geoData = "";
    try {
        geoData = await response.json()
        return geoData.postalCodes[0]
    } catch (error) {
        console.log("An error occured while fetching Data from geonames: ", error)

    }
}

// Fetch information from weatherbit API
async function fetchWeatherbit(geoData) {
    // Weatherbit API credentials
    const baseURLWeatherbitCurrent = "https://api.weatherbit.io/v2.0/current?"
    const baseURLWeatherbitForecast = "https://api.weatherbit.io/v2.0/forecast/daily?"
    const baseURLWeatherbitHistorical = "https://api.weatherbit.io/v2.0/history/daily?"
    const weatherbitID = "6186def2ac69443597dd95e7d6e0e5b2"

    // coordinates from geonames
    let lat = geoData.lat
    let lng = geoData.lng
    if (typeof(lat) === "number"){
        projectData.checkGeo = true //check if coordinates are found and a card can be rendered
    }

    //countdown for forecast
    const forecastStart = new Date(document.getElementById("date").value)
    const d = new Date()
    const countdownStart = new Date(d.toISOString().split("T")[0])
    const countdownDiff = Math.abs(forecastStart - countdownStart)
    const forecastDate = Math.abs(countdownDiff / (1000 * 60 * 60 * 24))

    //URL to fetch
    let url = ""

    if (forecastDate == 0) {
        //if trip is today show current weather
        url = `${baseURLWeatherbitCurrent}&lat=${lat}&lon=${lng}&key=${weatherbitID}`
        console.log(url);
        console.log("current weather");


        const response = await fetch(url)
        try {
            const weatherData = await response.json()
            // save data in projectData database
            projectData.currentTemp = weatherData.data[0].temp
            return weatherData
        } catch (error) {
            console.log("An error occured while fetching current Data from Weatherit API: ", error)
        }
    }
    else if (forecastDate > 0 && (forecastDate < 16)) {
        //if trip ist between 1 and 16 days in the future show weather forecast
        url = `${baseURLWeatherbitForecast}&lat=${lat}&lon=${lng}&key=${weatherbitID}`
        console.log(url);
        console.log("forecast weather");
        const response = await fetch(url)
        try {
            const weatherData = await response.json()

            // save data in projectData database
            projectData.maxTemp = weatherData.data[forecastDate].max_temp
            projectData.minTemp = weatherData.data[forecastDate].min_temp
            return weatherData
        } catch (error) {
            console.log("An error occured while fetching forecast weather Data from Weatherbit API: ", error)
        }
    }
    else if (forecastDate > 16) {
        // if trip is more than 16 days in the future show historical weather forecast from last year
        const oneYear = 1000 * 60 * 60 * 24 * 365
        const oneDay = 1000 * 60 * 60 * 24
        const date = new Date(document.getElementById("date").value)
        const startDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000) - oneYear)
            .toISOString()
            .split("T")[0];
        const endDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000) - oneYear + oneDay)
            .toISOString()
            .split("T")[0];

        url = `${baseURLWeatherbitHistorical}&lat=${lat}&lon=${lng}&start_date=${startDate}&end_date=${endDate}&key=${weatherbitID}`
        console.log(url);
        console.log("historical weather");
        const response = await fetch(url)
        try {
            const weatherData = await response.json()

            // save data in projectData database
            projectData.maxTemp = weatherData.data[0].max_temp
            projectData.minTemp = weatherData.data[0].min_temp
            return weatherData
        } catch (error) {
            console.log("An error occured while fetching Data from Weatherbit API: ", error)
        }
    }
    else alert("Please check your start and end date! Only trips in the future are supported. End date has to be later than start date.")

}

// Fetch image that fits to destination from pixabay API
const fetchPixabay = async () => {
    // Pixabay API credentials
    const baseURLPixabay = "https://pixabay.com/api/?"
    const pixabayID = "16994804-517aef67940717fa528df4b2e"
    const searchTerm = document.getElementById("location").value
    const fetchURL = `${baseURLPixabay}key=${pixabayID}&q=${searchTerm}&image_type=photo&cat=travel`
    const response = await fetch(fetchURL)

    try {
        const data = await response.json()
        projectData.imageURL = data.hits[0].webformatURL
        return data
    } catch (error) {
        console.log("An error occured while fetching image from pixabay: ", error)
        projectData.imageURL = "https://pixabay.com/get/57e6d4424c53a814f1dc8460da293277163fd7e25a5870_640.jpg"
    }
}




// create a card with the results in projectData Object

function createCard(projectData) {
    if (projectData.checkGeo) {
        // get length of trip
        const tripStart = new Date(document.getElementById("date").value)
        const tripEnd = new Date(document.getElementById("end").value)
        const tripDiff = Math.abs(tripEnd - tripStart)
        const length = Math.ceil(tripDiff / (1000 * 60 * 60 * 24) + 1)

        // countdown to trip start
        const d = new Date()
        const countdownStart = new Date(d.toISOString().split("T")[0])
        const countdownDiff = Math.abs(tripStart - countdownStart)
        const countdown = Math.abs(countdownDiff / (1000 * 60 * 60 * 24))

        //prepare information for new card
        const location = document.getElementById("location").value
        const image = projectData.imageURL
        const currentTemp = projectData.currentTemp
        const maxTemp = projectData.maxTemp
        const minTemp = projectData.minTemp
        console.log(countdown);
        
        //create card
        if (countdown == 0) {
            document.getElementById("results").innerHTML = `<div class="card">
    <span id="close">X</span>
    <img id="result_imageURL"
      src="${image}"
      alt="Picture from ${location}">
    <h2>Your ${length} day Trip to <span id="result_trip">${location}</span>:</h2>
    <p>Your Trip starts today! Go get your bags!</p>
    <p>The current temperature in ${location} is <span id="result_maxTemp">${currentTemp}</span> °C.</p>
  </div>`
            document.getElementById("results").style.display = "flex"
            document.getElementById("close").addEventListener("click", closeCard)
        }

        else if (countdown == 1) {
            document.getElementById("results").innerHTML = `<div class="card">
    <span id="close">X</span>
    <img id="result_imageURL"
      src="${image}"
      alt="Picture from ${location}">
    <h2>Your ${length} day Trip to <span id="result_trip">${location}</span>:</h2>
    <p>Your Trip starts tomorrow.</p>
    <p>The max temperature in ${location} is <span id="result_maxTemp">${maxTemp}</span> °C.</p>
    <p>The min temperature in ${location} is <span id="result_minTemp">${minTemp}</span> °C.</p>
  </div>`
            document.getElementById("results").style.display = "flex"
            document.getElementById("close").addEventListener("click", closeCard)
        }

        else if (countdown >= 1) {
            document.getElementById("results").innerHTML = `<div class="card">
    <span id="close">X</span>
    <img id="result_imageURL"
      src="${image}"
      alt="Picture from ${location}">
    <h2>Your ${length} day Trip to <span id="result_trip">${location}</span>:</h2>
    <p>Your Trip starts in ${countdown} days.</p>
    <p>The max temperature in ${location} is expected to be <span id="result_maxTemp">${maxTemp}</span> °C.</p>
    <p>The min temperature in ${location} is expected to be <span id="result_minTemp">${minTemp}</span> °C.</p>
  </div>`
            document.getElementById("results").style.display = "flex"
            document.getElementById("close").addEventListener("click", closeCard)
        }
    } 
else {
        document.getElementById("results").innerHTML = `<div class="card">
    <span id="close">X</span>
    <img id="result_imageURL"
      src="https://pixabay.com/get/57e6d4424c53a814f1dc8460da293277163fd7e25a5870_640.jpg"
      alt="${location}">
    <h2>Sorry, we couldn´t find your location!</h2>
  </div>`
        document.getElementById("results").style.display = "flex"
        document.getElementById("close").addEventListener("click", closeCard)
    }

}

// close card
function closeCard() {
    document.getElementById("results").style.display = "none"
}

// Exports
export {
    checkAndHandle,
    fetchGeoname,
    fetchWeatherbit,
    createCard,
    fetchPixabay
}

