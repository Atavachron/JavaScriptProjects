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
      beerHtml += `
      <div class="beer-wrapper card">
        <div class="beer">
          <img class="beer-img" src="${beer.image_url}">
          <h3>${beer.name}</h3>
          <span class="beer-info">
            <span>ABV: ${beer.abv}</span>
            <span>IBU: ${beer.ibu}</span>
          </span>
        </div>
        <div class='beer-content'>
          <div class='beer-name'>${beer.name}</div>
          <div class='beer-tagline'>${beer.tagline}</div>
          <div class='beer-description'>${beer.description}</div>
          <div class='beer-food-pairing'>
            Pair with: ${beer.food_pairing.join(', ')}
          </div>
        </div>
      </div>
    `;
      console.log(beer);
    });

    //Set the inner html of the beers div to the variable holding the beer names
    beersElem.innerHTML = beerHtml;
  } catch (err) {
    console.log(err);
  }
}

getBeers();
