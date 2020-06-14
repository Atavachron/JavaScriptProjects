class UI {
  constructor() {
    this.location = document.getElementById('location');
    this.description = document.getElementById('description');
    this.temperature = document.getElementById('temperature');
    this.details = document.getElementById('details');
    this.icon = document.getElementById('icon');
    this.humidity = document.getElementById('humidity');
    this.feelsLike = document.getElementById('feels-like');
    this.wind = document.getElementById('wind');
  }

  displayWeather(weatherData) {
    this.location.textContent = weatherData.name;
    this.description.textContent = weatherData.weather[0].description;
    this.temperature.innerHTML = `${weatherData.main.temp} &#8451;`;
    this.icon.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    this.humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
    this.feelsLike.innerHTML = `Feels like: ${weatherData.main.feels_like} &#8451;`;
    this.wind.textContent = `Wind speed: ${weatherData.wind.speed}`;
  }
}
