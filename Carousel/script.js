//Get all the carousel items
const slides = document.querySelectorAll('.carousel-item');

//Calculate the total number of carousel items
const totalSlides = slides.length;

//Create a variable that will hold the position of the current slide in the slides array.
let slidePosition = 0;

//Attach event listeners to the two buttons, that will run a function when clicked
document
  .getElementById('carousel-button-prev')
  .addEventListener('click', moveToPrevSlide);
document
  .getElementById('carousel-button-next')
  .addEventListener('click', moveToNextSlide);

//Create a function to move to the previous slide
function moveToPrevSlide() {
  slides[slidePosition].classList.remove('carousel-item-visible');
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  slides[slidePosition].classList.add('carousel-item-visible');
}

//Create a function to move to the next slide
function moveToNextSlide() {
  slides[slidePosition].classList.remove('carousel-item-visible');
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  slides[slidePosition].classList.add('carousel-item-visible');
}
