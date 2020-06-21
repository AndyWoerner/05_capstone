// GeoNames API
const baseURLGeonames = "http://api.geonames.org/postalCodeSearchJSON?placename=";
const geonamesID = process.env.GEOKEY;

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

export {fetchGeoname}