//Using the PUNK API to get beer data

const urlBase = 'https://api.punkapi.com/v2/beers';
const beersElem = document.querySelector('.beers');
const filterABV = document.getElementById('filterABV');
let optionsABV = '';

const filterIBU = document.getElementById('filterIBU');
let optionsIBU = '';

filterIBU.addEventListener('change', e => {
  const value = e.target.value;

  switch (value) {
    case 'all':
      optionsIBU = '';
      break;
    case 'weak':
      optionsIBU = 'ibu_lt=35';
      break;
    case 'medium':
      optionsIBU = 'ibu_gt=34&ibu_lt=75';
      break;
    case 'strong':
      optionsIBU = 'ibu_gt=74';
      break;
  }

  getBeers();
});

filterABV.addEventListener('change', e => {
  const value = e.target.value;

  switch (value) {
    case 'all':
      optionsABV = '';
      break;
    case 'weak':
      optionsABV = 'abv_lt=4.6';
      break;
    case 'medium':
      optionsABV = 'abv_gt=4.5&abv_lt=7.6';
      break;
    case 'strong':
      optionsABV = 'abv_gt=7.5';
      break;
  }

  getBeers();
});

async function getBeers() {
  try {
    const url = urlBase + '?' + optionsABV + '&' + optionsIBU;
    //Fetch the data from the API
    const res = await fetch(url);
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
