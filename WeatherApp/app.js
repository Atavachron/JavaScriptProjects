const weather = new Weather('Dubai', 'AE');
const ui = new UI();

//Load the weather automatically when the page is loaded
document.addEventListener('DOMContentLoaded', getWeather);

//Get the values from the modal
document.getElementById('change-btn').addEventListener('click', e => {
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;

  weather.changeLocation(city, country);
  getWeather();

  //Use JQuery to hide modal
  $('#locModal').modal('hide');
});

function getWeather() {
  weather
    .getWeather()
    .then(res => ui.displayWeather(res))
    .catch(err => console.log(err));
}
