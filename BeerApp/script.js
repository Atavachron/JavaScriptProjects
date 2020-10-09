//Using the PUNK API to get beer data

const urlBase = 'https://api.punkapi.com/v2/beers';
const beersElem = document.querySelector('.beers');

async function getBeers() {
  try {
    //Fetch the data from the API
    const res = await fetch(urlBase);
    const data = await res.json();

    //Create an empty variable that will hold the beer names
    let beerHtml = '';

    data.forEach(beer => {
      beerHtml += `<h3>${beer.name}</h3>`;
    });

    //Set the inner html of the beers div to the variable holding the beer names
    beersElem.innerHTML = beerHtml;
  } catch (err) {
    console.log(err);
  }
}

getBeers();
