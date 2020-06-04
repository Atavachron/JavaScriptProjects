//DOM variables
const get = (elem) => document.querySelector(elem);

const $loanForm = get('#loan-form');
const $amount = get('#amount');
const $interest = get('#interest');
const $years = get('#years');

const $monthlyPayment = get('#monthly-payment');
const $totalPayment = get('#total-payment');
const $totalInterest = get('#total-interest');

const $loading = get('#loading');
const $results = get('#results');

//Event Listeners

$loanForm.addEventListener('submit', calculateResults);

function calculateResults(e) {
  const principal = parseFloat($amount.value);
  const calculatedInterest = parseFloat($interest.value) / 100 / 12;
  const calculatedPayments = parseFloat($years.value) * 12;

  //Calculate monthly payment amount
  const a = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * a * calculatedInterest) / (a - 1);

  //Check if the number is finite
  if (isFinite(monthly)) {
    $monthlyPayment.value = monthly.toFixed(2);
    $totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    $totalInterest.value = (monthly * calculatedPayments - principal).toFixed();
  } else {
    displayError('Please check the numbers you have entered');
  }
  e.preventDefault();
}

function displayError(err) {
  //Get the card element and the heading element
  const $card = get('.card');

  //Create a div where the error will be displayed
  const errorDiv = document.createElement('div');

  //Add the Bootstrap classes of alert and alert-danger
  errorDiv.classList.add('alert', 'alert-danger');

  //Create a text node with the error message and append to the div
  errorDiv.appendChild(document.createTextNode(err));

  //Check if there is an alert already and if there isn't insert one
  if (!get('.alert')) {
    $card.insertAdjacentElement('afterbegin', errorDiv);
    //Remove the alert message after three second
    setTimeout(() => get('.alert').remove(), 3000);
  }
}
