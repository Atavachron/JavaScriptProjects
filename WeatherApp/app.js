const weather = new Weather('Dubai', 'AE');
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
  weather
    .getWeather()
    .then(res => ui.displayWeather(res))
    .catch(err => console.log(err));
}
