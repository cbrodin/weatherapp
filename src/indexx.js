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


  mainElement.innerHTML = response.data.name;
  curTempElement.innerHTML = Math.round(response.data.main.temp);
  humidElement.innerHTML = Math.round(response.data.main.humidity);
  mainHighElement.innerHTML = Math.round(response.data.main.temp_min);
  mainLowElement.innerHTML = Math.round(response.data.main.temp_max);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  tempDescrElement.innerHTML = response.data.weather[0].description;
  tempEmojiElement.setAttribute = "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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

let form = document.querySelector("form");
form.addEventListener("submit", submitSearch);

let currentLocationButton = document.querySelector("#Use-Curr");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Austin");