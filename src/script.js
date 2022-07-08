function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let changeCity = document.querySelector("#cityName");
  changeCity.innerHTML = `${searchInput.value}`;
}
function convertToFaren(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temper = tempElement.innerHTML;
  tempElement.innerHTML = Math.round((temper * 9) / 5 + 32);
}
function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = 20;
}

let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
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
let day = days[now.getDay()];

let time = document.querySelector(".time");
time.innerHTML = `Time ${hour}:${minute}`;

let dayOfWeek = document.querySelector(".dayOfWeek");
dayOfWeek.innerHTML = `${day}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahren = document.querySelector(".fahren");
fahren.addEventListener("click", convertToFaren);

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", convertToCelsius);

function displayWeatherCondition(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityName").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = "390b40438b4deceb61f738117944f01e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
