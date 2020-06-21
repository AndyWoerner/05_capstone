// import scripts
import { fetchGeoname } from "./js/getGeoname"
import { fetchWeatherbit } from "./js/getWeather"
import { fetchPixabay } from "./js/getPixabay"

// import styles
import "./styles/resets.scss"
import "./styles/base.scss"
import "./styles/footer.scss"
import "./styles/header.scss"
import "./styles/form.scss"

// import images
import background from "./media/background.jpg"

document.getElementById("submit").addEventListener("click", checkAndHandle)

// exports
export {
    fetchGeoname,
    fetchWeatherbit,
    fetchPixabay
}
