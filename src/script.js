function formatData(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0${hours}";
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0${minutes}";
  }
  return "${day} ${hour}:${minutes}";
}
function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityName");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatData(response.data.dt * 1000);
}
let apiKey = "390b40438b4deceb61f738117944f01e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeatherCondition);
