//Get Elements from the DOM
const timeEl = document.getElementById("time"); //Time
const dateEl = document.getElementById("date"); //Date
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//Update Day and Time
setInterval(() => {
  //variables inside the callback function to get the updated time values
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  const currentTime = hour + ":" + (minutes < 10 ? "0" + minutes : minutes);
  //console.log(date);
  // console.log(currentTime);
  timeEl.innerHTML = currentTime + `<span id="am-pm">${ampm}</span>`; //span to get styles
  dateEl.innerHTML = `${days[day]}, ${date}, ${months[month]}`;
}, 1000);

// Fetch the weather data from the provided endpoint
const getWeatherData = () => {
    fetch(`https://api.weather.gov/points/41.25,-77.01`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const forecastUrl = data.properties.forecast;
        // console.log(forecastUrl);
        getForecast(forecastUrl);
      })
      .catch((error) => {
        console.error("Error fetching forecast:", error);
      });
}
getWeatherData();

// Fetch the forecast data from the result of the first fetch
const getForecast = (link) => {
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const periods = data.properties.periods; // 7 days weather
        const forecast = data.properties.periods[0]; //Current weather
        const temperature = forecast.temperature; //Current temperature
        const description = forecast.shortForecast; //Current description
        const humidity = forecast.relativeHumidity.value; //Current humidity
        const windSpeed = forecast.windSpeed; //Current wind speed
        console.log(periods);
        //   console.log(description);

        // Update the DOM to display the weather information on the page
        currentWeatherItemsEl.innerHTML = `
            <div class="weather-item">
                        <p>Humidity:</p>
                        <p>${humidity} %</p>
                    </div>
                    <div class="weather-item">
                        <p>Temperature:</p>
                        <p>${temperature}&#8457;</p>
                    </div>
                    <div class="weather-item">
                        <p>Wind Speed:</p>
                        <p>${windSpeed}</p>
                    </div>
                    <div class="weather-item">
                        <p id="description">${description}</p>
                    </div>
        `;
      })
      .catch((error) => {
        console.error("Error fetching forecast:", error);
      });
}
