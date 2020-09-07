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
  //Remove the visible class from the current slide
  slides[slidePosition].classList.remove('carousel-item-visible');

  //Check if the slide is the last one
  if (slidePosition === totalSlides - 1) {
    //Reset the slidePosition
    slidePosition = 0;
  } else {
    //Increment slidePosition
    slidePosition++;
  }
  //Add the visible class to the new slide
  slides[slidePosition].classList.add('carousel-item-visible');
}

//Create a function to move to the next slide
function moveToNextSlide() {
  //Remove the visible class from the current slide
  slides[slidePosition].classList.remove('carousel-item-visible');
  //Check if the slide is the first one
  if (slidePosition === 0) {
    //Reset the slide position to the last slide
    slidePosition = totalSlides - 1;
  } else {
    //Decrement slidePosition
    slidePosition--;
  }
  //Add the visible class to the new slide
  slides[slidePosition].classList.add('carousel-item-visible');
}
