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
    return `${day} ${hours}:${minutes}`;
  }

  function displayWeatherCondition(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#cityName");
    let humidityElement = document.querySelector("#humidity");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#main-icon");
    celsiusTemp = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    humidityElement.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatData(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-text-input");
    search(cityInput.value);
  }
  function search(city) {    
    let apiKey = "390b40438b4deceb61f738117944f01e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }

  function displayFahrenTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenLink.classList.add("active");
    let fahrenTemp = (celsiusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenTemp);
  }

  function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
  }

  let celsiusTemp = null;

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  let fahrenLink = document.querySelector("#fahrenheit-toggle");
  fahrenLink.addEventListener("click", displayFahrenTemp);

  let celsiusLink = document.querySelector("#celsius-toggle");
  celsiusLink.addEventListener("click", displayCelsiusTemp);
