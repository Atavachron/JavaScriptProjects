function Gallery(gallery) {
  if (!gallery) {
    return;
  }

  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");
  let currentImage; //To track the currently opened image

  function openModal() {
    if (modal.matches(".open")) {
      console.info("Modal is already open");
      return;
    }
    modal.classList.add("open");

    //Event Listeners that will be bound when the model is opened
    window.addEventListener("keyup", handleKeyUp);
    nextButton.addEventListener("click", showNextImage);
    prevButton.addEventListener("click", showPreviousImage);
  }

  function closeModal() {
    modal.classList.remove("open");

    window.removeEventListener("keyup", handleKeyUp);
    nextButton.removeEventListener("click", showNextImage);
    prevButton.removeEventListener("click", showPreviousImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === "Escape") {
      return closeModal();
    }
    if (event.key === "ArrowRight") {
      return showNextImage();
    }
    if (event.key === "ArrowLeft") {
      return showPreviousImage();
    }
  }

  function showImage(el) {
    if (!el) {
      console.info("There is no image to display");
      return;
    }
    modal.querySelector("img").src = el.src;
    modal.querySelector("h2").textContent = el.title;
    modal.querySelector("figure p").textContent = el.dataset.description;
    currentImage = el;

    openModal();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPreviousImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  images.forEach(image =>
    image.addEventListener("click", event => {
      showImage(event.currentTarget);
    })
  );

  images.forEach(image => {
    image.addEventListener("keyup", e => {
      if (e.key === "Enter") {
        showImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener("click", handleClickOutside);
}

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
