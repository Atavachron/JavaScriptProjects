//Random Jokes Generator Using XHR

document.getElementById('jokes-form').addEventListener('submit', getJokes);

function getJokes(e) {
  //Get the number of jokes depending on the input value
  const numberOfJokes = document.getElementById('number').value;

  //Create a new XHR object
  const xhr = new XMLHttpRequest();

  //Open the xhr reques and pass the URL of the the jokes API
  xhr.open('GET', `http://api.icndb.com/jokes/random/${numberOfJokes}`, true);

  //What will happen when the response is received
  xhr.onload = function () {
    if (this.statusText === 'OK') {
      const jokes = JSON.parse(this.response);

      //Create an empty string where the jokes will be added
      let output = '';

      if (jokes.type === 'success') {
        jokes.value.forEach((joke) => {
          output += `
            <li>${joke.joke}</li>
          `;
        });
      } else {
        output += `<li>Ooops, something went wrong</li>`;
      }

      //Add the string with the jokes to the DOM
      document.querySelector('.output').innerHTML = output;
    } else if (this.statusText === 'Not Found') {
      console.log('Sorry, no jokes were found');
    }
  };

  //Onerror will check if there is a network error
  xhr.onerror = function () {
    console.log('Could not establish a connection.');
  };

  //Send the XHR Request
  xhr.send();

  //Prevent the form from refreshing the page when submitted
  e.preventDefault();
}
