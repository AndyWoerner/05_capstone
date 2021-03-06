# Travel App
This is my capstone project from Udacitys Front End Web Developer Nanodegree 2020.
This web app is for travellers, who want to get some useful weather informations and a picture of the trips destination. The app also shows the length of the trip.

If the trip starts today, the app shows the current temperatures.
If the trip starts within the next 16 days, the app shows minimum and maximum temperatures from weather forecast data.
If the trip starts later than in 16 days, the app shows minimum and maximum temperatures from historical weather data (last year).


## Built With
- WeatherBit API, Pixabay API and Geonames API
- Node.js
- Jest / supertest
- Express
- Webpack
- Service Worker
- HTML, CSS/SASS, Javascript


## Prerequisites
You should have node installed on your system to run the project.

## Deployment
1) Clone or downlaod my repo.
2) CD to the directory of the new repo.
3) Install everything with `npm install`.
4) Run `npm run build-prod`in the terminal.
5) Run `npm run start`. That starts the local server on Port 3000.
6) Go to your Browser and open `http://localhost:3000`

If you want to open the app with webpacks dev-server, run `npm run build-dev`. Your standard browser will open the app immediately. 

## Testing with Jest
1) Run `npm run install` if you havent before.
2) Run `npm run test`

server.test.js tests the app endpoint "/".
app.test.js tests if the functions are defined.
