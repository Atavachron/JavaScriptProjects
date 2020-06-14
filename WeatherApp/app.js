const weather = new Weather('Dubai', 'AE');

document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
  weather
    .getWeather()
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
