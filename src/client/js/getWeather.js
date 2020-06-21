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
    } catch (error) {
        console.log("An error occured while fetching Data from geonames: ", error)
    }
}

export { fetchWeatherbit }