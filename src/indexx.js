function formatDate(currentDate) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekDay = currentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[weekDay];
  return `${day} ${hours}:${minutes} `;
}
let now = new Date();
let currentDate = document.querySelector("p");
currentDate.innerHTML = formatDate(now);

function displayForecast (){
let forecastElement = document.querySelector("#forecast");

let forecastHTML = "";
forecastHTML =
  forecastHTML +
  `<div class = "row">
<div class="col-2">
            <div class="forecast-date">Mon </div>
            <img src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="36"
            />
            <div class="forecast-temp">
              <span class="fore-temp-max">
              96°
            </span>
             <span class="fore-temp-min">
              46°
            </span>
          </div>
          </div>
            </div>`;
forecastElement.innerHTML = forecastHTML

}

function displayWeatherCondition(response) {
  let mainElement = document.querySelector("#main");
  let curTempElement = document.querySelector("#currentTemp");
  let humidElement = document.querySelector("#humid");
  let mainHighElement = document.querySelector("#mainLow");
  let mainLowElement = document.querySelector("#mainHigh");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feelsLike");
  let tempDescrElement = document.querySelector("#temp-descript");
  let tempEmojiElement = document.querySelector("#tempEmoji");

  displayForecast();

  fahrenheitTemp = response.data.main.temp;

  mainElement.innerHTML = response.data.name;
  curTempElement.innerHTML = Math.round(response.data.main.temp);
  humidElement.innerHTML = Math.round(response.data.main.humidity);
  mainHighElement.innerHTML = Math.round(response.data.main.temp_min);
  mainLowElement.innerHTML = Math.round(response.data.main.temp_max);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  tempDescrElement.innerHTML = response.data.weather[0].description;
  tempEmojiElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}


function searchCity(city) {
  let apiKey = "40ee9c494fa4d6774c1dda0bb71d8806";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "40ee9c494fa4d6774c1dda0bb71d8806";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function showCelciusTemp(event) {
  event.preventDefault();
  let curTempElement = document.querySelector("#currentTemp");

  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let celciusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  curTempElement.innerHTML = Math.round(celciusTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let curTempElement = document.querySelector("#currentTemp");

  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  curTempElement.innerHTML = Math.round(fahrenheitTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", submitSearch);

let currentLocationButton = document.querySelector("#Use-Curr");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitTemp = null;

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemp);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

searchCity("Austin");

