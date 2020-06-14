class Weather {
  constructor(city, country) {
    this.appid = 'a0afa5470b059b390906dc112871f7f8';
    this.city = city;
    this.country = country;
  }

  // This is an async function because it fetches data from the API
  async getWeather() {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${this.appid}`
    );
    const weatherData = await weatherResponse.json();
    return weatherData;
  }

  changeLocation(city, country) {
    this.city = city;
    this.country = country;
  }
}
