// Pixabay API
const baseURLPixabay = "https://pixabay.com/api/?"
const pixabayID = process.env.PIXABAYKEY

// GET REQUEST to get image from pixabay API
const fetchPixabay = async (URL, input) => {
    const fetchURL = `${URL}key=${pixabayID}&q=${encodeURIComponent(input)}`
    const response = await fetch(fetchURL)

    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log("An error occured while fetching image from pixabay: ", error)
    }
}

export { fetchPixabay }