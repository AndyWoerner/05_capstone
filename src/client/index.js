// import scripts
import { checkAndHandle, fetchGeoname, fetchWeatherbit, createCard } from "./js/app"

// import styles
import "./styles/resets.scss"
import "./styles/base.scss"
import "./styles/footer.scss"
import "./styles/header.scss"
import "./styles/form.scss"

// import images
import background from "./media/background.jpg"

// exports
export {
    checkAndHandle,
    fetchGeoname,
    fetchWeatherbit,
    createCard
}

// eventListener 
document.getElementById("submit").addEventListener("click", checkAndHandle)